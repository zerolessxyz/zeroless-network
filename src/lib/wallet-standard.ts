/**
 * Finding wallets, without an adapter per wallet.
 *
 * This speaks the Wallet Standard handshake that current Solana wallets all
 * implement: the page announces itself, installed wallets register themselves
 * back, and each arrives carrying its own name, icon and feature list. So
 * whatever the visitor has installed turns up in the picker, and the bundle
 * carries no wallet SDKs at all.
 *
 * Spec: https://github.com/wallet-standard/wallet-standard
 */

export interface StandardAccount {
  address: string;
  publicKey: Uint8Array;
}

interface ConnectFeature {
  connect: (input?: { silent?: boolean }) => Promise<{
    accounts: readonly StandardAccount[];
  }>;
}

interface DisconnectFeature {
  disconnect: () => Promise<void>;
}

interface SignMessageFeature {
  signMessage: (input: {
    account: StandardAccount;
    message: Uint8Array;
  }) => Promise<readonly { signature: Uint8Array }[]>;
}

interface EventsFeature {
  on: (event: "change", listener: (props: unknown) => void) => () => void;
}

export interface StandardWallet {
  name: string;
  icon: string;
  chains: readonly string[];
  accounts: readonly StandardAccount[];
  features: Record<string, unknown>;
}

const CONNECT = "standard:connect";
const DISCONNECT = "standard:disconnect";
const SIGN_MESSAGE = "solana:signMessage";
const EVENTS = "standard:events";

/** Only a wallet that can sign a Solana message is any use here. */
function usable(wallet: StandardWallet): boolean {
  return (
    Array.isArray(wallet.chains) &&
    wallet.chains.some((c) => c.startsWith("solana:")) &&
    typeof wallet.features?.[CONNECT] === "object" &&
    typeof wallet.features?.[SIGN_MESSAGE] === "object"
  );
}

const registry = new Map<string, StandardWallet>();

type RegisterApi = { register: (...wallets: StandardWallet[]) => () => void };
type RegisterCallback = (api: RegisterApi) => void;

function api(onChange: () => void): RegisterApi {
  return {
    register: (...wallets) => {
      let added = false;
      for (const w of wallets) {
        if (usable(w) && !registry.has(w.name)) {
          registry.set(w.name, w);
          added = true;
        }
      }
      if (added) onChange();
      return () => {};
    },
  };
}

/**
 * Start listening, and ask anything already loaded to announce itself.
 * Returns a teardown function.
 */
export function discoverWallets(onChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  const handler = (event: Event) => {
    const detail = (event as CustomEvent<RegisterCallback>).detail;
    if (typeof detail === "function") detail(api(onChange));
  };

  window.addEventListener("wallet-standard:register-wallet", handler);
  window.dispatchEvent(
    new CustomEvent("wallet-standard:app-ready", { detail: api(onChange) }),
  );

  return () =>
    window.removeEventListener("wallet-standard:register-wallet", handler);
}

export function knownWallets(): StandardWallet[] {
  return [...registry.values()];
}

export function findWallet(name: string): StandardWallet | undefined {
  const wanted = name.toLowerCase();
  for (const w of registry.values()) {
    const found = w.name.toLowerCase();
    if (found === wanted || found.startsWith(wanted) || wanted.startsWith(found))
      return w;
  }
  return undefined;
}

/**
 * Connect, then sign whatever the callback returns for the account offered.
 *
 * The bytes are built from the address rather than handed in ready-made: the
 * protocol issues its challenge only once the wallet has said which account it is
 * offering, so the statement shown in the wallet is the one that will be
 * checked.
 */
export async function connectAndSign(
  wallet: StandardWallet,
  message: (address: string) => Promise<Uint8Array>,
): Promise<{ address: string; signature: Uint8Array }> {
  const connect = wallet.features[CONNECT] as ConnectFeature;
  const { accounts } = await connect.connect();
  const account = accounts[0] ?? wallet.accounts[0];
  if (!account) throw new Error("The wallet returned no account.");

  return {
    address: account.address,
    signature: await signWith(wallet, account, await message(account.address)),
  };
}

/**
 * Sign with a wallet that is already connected.
 *
 * Used for every action taken after sign-in: the wallet is asked again, per
 * action, so nothing is ever authorised on the strength of an old signature.
 */
export async function signAs(
  wallet: StandardWallet,
  address: string,
  bytes: Uint8Array,
): Promise<Uint8Array> {
  const account =
    wallet.accounts.find((a) => a.address === address) ?? wallet.accounts[0];
  if (account) return signWith(wallet, account, bytes);

  // The extension dropped the account — reconnect and check it is still the
  // same one before asking for a signature.
  const connect = wallet.features[CONNECT] as ConnectFeature;
  const { accounts } = await connect.connect();
  const reconnected = accounts.find((a) => a.address === address);
  if (!reconnected) {
    throw new Error("That wallet is no longer offering the signed-in account.");
  }
  return signWith(wallet, reconnected, bytes);
}

async function signWith(
  wallet: StandardWallet,
  account: StandardAccount,
  message: Uint8Array,
): Promise<Uint8Array> {
  const sign = wallet.features[SIGN_MESSAGE] as SignMessageFeature;
  const [result] = await sign.signMessage({ account, message });
  if (!result?.signature) throw new Error("The wallet returned no signature.");
  return result.signature;
}

/** Tell the wallet we are done, if it offers a way to be told. */
export async function releaseWallet(name: string): Promise<void> {
  const wallet = findWallet(name);
  const feature = wallet?.features[DISCONNECT] as DisconnectFeature | undefined;
  if (feature?.disconnect) {
    await feature.disconnect().catch(() => {
      // Wallet declined to let go. The page forgets it either way.
    });
  }
}

/**
 * Follow the wallet's own account switch, so changing accounts in the
 * extension is reflected here instead of leaving a stale address on screen.
 */
export function watchAccounts(
  wallet: StandardWallet,
  onAccounts: (address: string | null) => void,
): () => void {
  const events = wallet.features[EVENTS] as EventsFeature | undefined;
  if (!events?.on) return () => {};
  try {
    return events.on("change", () => {
      onAccounts(wallet.accounts[0]?.address ?? null);
    });
  } catch {
    return () => {};
  }
}
