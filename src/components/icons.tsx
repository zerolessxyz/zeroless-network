type IconProps = { size?: number; className?: string };

export function ArrowRight({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function CheckCircle({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.4 2.4 4.6-4.8" />
    </svg>
  );
}

export function Copy({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V6a1 1 0 0 1 1-1h9" />
    </svg>
  );
}

export function Wallet({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18" />
      <circle cx="17" cy="14.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Swap({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 9h13l-3.2-3.2" />
      <path d="M20 15H7l3.2 3.2" />
    </svg>
  );
}

export function Shield({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 3.5 5 6.2v5.1c0 4.3 2.9 8.1 7 9.2 4.1-1.1 7-4.9 7-9.2V6.2Z" />
      <path d="m9.2 12 2 2 3.6-3.8" />
    </svg>
  );
}

export function XLogo({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.53 3h3.19l-6.97 7.97L22 21h-6.4l-5.01-6.55L4.85 21H1.66l7.45-8.52L1.5 3h6.56l4.53 5.99Zm-1.12 16.1h1.77L7.67 4.8H5.77Z" />
    </svg>
  );
}

export function TelegramLogo({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="m21 4.5-3 15-6-4.2-3 3v-4.3l9-7.8-11 6.6-4-1.4Z" />
    </svg>
  );
}

export function DiscordLogo({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M8.5 6.5C6.6 6.9 4.9 7.9 4 9c-1 2.6-1.3 5.3-1 8 1.4 1 3 1.7 4.7 2l.9-1.5" />
      <path d="M15.5 6.5c1.9.4 3.6 1.4 4.5 2.5 1 2.6 1.3 5.3 1 8-1.4 1-3 1.7-4.7 2l-.9-1.5" />
      <path d="M8.5 6.5 9.2 5c1.9-.4 3.7-.4 5.6 0l.7 1.5" />
      <path d="M8.5 15c2.3.9 4.7.9 7 0" />
      <circle cx="9.3" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="14.7" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * Streamflow mark: three offset bars that read as an S.
 * Do not redraw this by hand — it is the official glyph shape.
 */
export function StreamflowLogo({ size = 16, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path
        d="M 6.027 0 C 2.698 0 0 2.687 0 6 L 18 6 C 21.314 6 24 3.314 24 0 Z"
        transform="translate(0 1.75)"
      />
      <path
        d="M 18.175 0 L 0 0 C 0 3.259 2.608 6 5.825 6 L 24 6 C 24 2.742 21.392 0 18.175 0 Z"
        transform="translate(0 9)"
      />
      <path
        d="M 6.027 0 C 2.698 0 0 2.687 0 6 L 6 6 C 9.314 6 12 3.314 12 0 Z"
        transform="translate(0 16.25)"
      />
    </svg>
  );
}
