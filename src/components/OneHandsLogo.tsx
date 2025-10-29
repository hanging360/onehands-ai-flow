interface OneHandsLogoProps {
  className?: string;
}

export const OneHandsLogo = ({ className = "h-20" }: OneHandsLogoProps) => {
  return (
    <svg
      viewBox="0 0 400 120"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* OneHands Text */}
      <text
        x="20"
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
