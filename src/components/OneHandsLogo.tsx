interface OneHandsLogoProps {
  className?: string;
}

export const OneHandsLogo = ({ className = "h-20" }: OneHandsLogoProps) => {
  return (
    <svg
      viewBox="0 0 320 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* OneHands Text */}
      <text
        x="160"
        y="65"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="48"
        fontWeight="700"
        fill="hsl(214 100% 50%)"
        textAnchor="middle"
      >
        OneHands
      </text>
    </svg>
  );
};
