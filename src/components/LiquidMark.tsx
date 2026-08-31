/**
 * Hero artwork: the Zero Less mark blown up into a liquid-metal object.
 * Pure SVG + CSS so it costs nothing to load and can be swapped for a
 * rendered video later without touching the layout.
 */
export function LiquidMark() {
  return (
    <div className="liquid" aria-hidden="true">
      <svg viewBox="0 0 400 400" fill="none">
        <defs>
          <linearGradient id="lm-body" x1="80" y1="40" x2="330" y2="370" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8fbaff" />
            <stop offset="38%" stopColor="#2a6bff" />
            <stop offset="72%" stopColor="#1249e6" />
            <stop offset="100%" stopColor="#0a2f9e" />
          </linearGradient>
          <linearGradient id="lm-gloss" x1="110" y1="60" x2="220" y2="220" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.92" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="lm-halo" cx="50%" cy="50%" r="50%">
            <stop offset="55%" stopColor="#57a8ff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#57a8ff" stopOpacity="0" />
          </radialGradient>
          <filter id="lm-soft" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
          <filter id="lm-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="16" stdDeviation="22" floodColor="#0a2f9e" floodOpacity="0.28" />
          </filter>
        </defs>

        <circle cx="200" cy="200" r="185" fill="url(#lm-halo)" filter="url(#lm-soft)" />

        <g filter="url(#lm-shadow)">
          <circle cx="200" cy="200" r="128" stroke="url(#lm-body)" strokeWidth="74" />
          <rect
            x="167"
            y="14"
            width="66"
            height="372"
            rx="33"
            fill="url(#lm-body)"
            transform="rotate(38 200 200)"
          />
        </g>

        <circle cx="200" cy="200" r="128" stroke="url(#lm-gloss)" strokeWidth="22" />
        <ellipse cx="150" cy="112" rx="34" ry="17" fill="#ffffff" opacity="0.55" transform="rotate(-38 150 112)" filter="url(#lm-soft)" />
        <ellipse cx="262" cy="286" rx="26" ry="12" fill="#ffffff" opacity="0.25" transform="rotate(-38 262 286)" filter="url(#lm-soft)" />
      </svg>
    </div>
  );
}
