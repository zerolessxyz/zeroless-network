import { brand } from "@/config/brand";

type MarkProps = { size?: number; idPrefix?: string; className?: string };

/**
 * The Zero Less mark: a ring cut by a diagonal bar — a zero with the
 * remainder struck out. Rendered as glossy liquid metal in blue.
 */
export function ZeroMark({ size = 26, idPrefix = "zm", className }: MarkProps) {
  const body = `${idPrefix}-body`;
  const gloss = `${idPrefix}-gloss`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={body} x1="6" y1="3" x2="27" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6ea6ff" />
          <stop offset="45%" stopColor="#1e63ff" />
          <stop offset="100%" stopColor="#0a34c2" />
        </linearGradient>
        <linearGradient id={gloss} x1="9" y1="5" x2="18" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="11.2" stroke={`url(#${body})`} strokeWidth="6.4" />
      <rect
        x="13.2"
        y="1.4"
        width="5.6"
        height="29.2"
        rx="2.8"
        fill={`url(#${body})`}
        transform="rotate(38 16 16)"
      />
      <circle cx="16" cy="16" r="11.2" stroke={`url(#${gloss})`} strokeWidth="2.2" />
    </svg>
  );
}

export function Logo({ size = 22 }: { size?: number }) {
  return (
    <span className="logo">
      <span>{brand.wordmark}</span>
      <ZeroMark size={size + 4} idPrefix="logo" className="logo-mark" />
    </span>
  );
}
