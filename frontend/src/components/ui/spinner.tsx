interface SpinnerProps {
  size?: number;
  strokeWidth?: number;
  color?: string;
}

function Spinner({ size = 64, strokeWidth = 3, color = "var(--primary)" }: SpinnerProps) {
  return (
    <svg viewBox="25 25 50 50" className="origin-center animate-spin" style={{ width: size }}>
      <circle
        r="20"
        cy="50"
        cx="50"
        className="stroke-primary animate-dash4 fill-none"
        style={{
          stroke: color,
          strokeWidth,
          strokeDasharray: "1, 200",
          strokeDashoffset: 0,
          strokeLinecap: "round",
        }}
      />
    </svg>
  );
}

export default Spinner;
