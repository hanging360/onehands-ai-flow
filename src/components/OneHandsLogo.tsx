interface OneHandsLogoProps {
  className?: string;
}

export const OneHandsLogo = ({ className = "h-20" }: OneHandsLogoProps) => {
  return (
    <svg
      viewBox="0 0 500 120"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* AI Hand Icon */}
      <g transform="translate(10, 20)">
        {/* Palm */}
        <path
          d="M 30 80 L 30 50 Q 30 40 35 35 L 40 30 L 40 60 L 45 60 L 45 20 Q 45 15 48 12 L 52 8 L 52 60 L 57 60 L 57 15 Q 57 10 60 7 L 64 3 L 64 60 L 69 60 L 69 20 Q 69 15 72 12 L 76 15 L 76 70 Q 76 75 73 78 L 30 80 Z"
          fill="hsl(214 100% 50%)"
          stroke="hsl(214 100% 60%)"
          strokeWidth="2"
        />
        {/* Circuit patterns */}
        <circle cx="52" cy="45" r="8" fill="none" stroke="hsl(214 100% 60%)" strokeWidth="1.5" />
        <line x1="52" y1="37" x2="52" y2="30" stroke="hsl(214 100% 60%)" strokeWidth="1.5" />
        <line x1="52" y1="53" x2="52" y2="60" stroke="hsl(214 100% 60%)" strokeWidth="1.5" />
        <line x1="44" y1="45" x2="37" y2="45" stroke="hsl(214 100% 60%)" strokeWidth="1.5" />
        <line x1="60" y1="45" x2="67" y2="45" stroke="hsl(214 100% 60%)" strokeWidth="1.5" />
        {/* Tech details */}
        <circle cx="40" cy="55" r="2" fill="hsl(214 100% 60%)" />
        <circle cx="64" cy="55" r="2" fill="hsl(214 100% 60%)" />
        <rect x="35" y="68" width="3" height="8" fill="hsl(214 100% 60%)" />
        <rect x="48" y="70" width="3" height="6" fill="hsl(214 100% 60%)" />
        <rect x="61" y="68" width="3" height="8" fill="hsl(214 100% 60%)" />
      </g>

      {/* OneHands Text */}
      <text
        x="110"
        y="75"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="48"
        fontWeight="700"
        fill="hsl(214 100% 50%)"
      >
        OneHands
      </text>
    </svg>
  );
};
