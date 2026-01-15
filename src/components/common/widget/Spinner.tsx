import { ClipLoader } from "react-spinners";

interface SpinnerProps {
  text?: string;
  size?: number;
  color?: string;
  className?: string; // Allow custom classes
}

export const Spinner = ({
  text = "Cargando...",
  size = 50,
  color = "#2563eb", // Default blue-600, adjustable
  className = "",
}: SpinnerProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 ${className}`}
    >
      <div className="relative flex items-center justify-center">
        {/* Shadow/Backdrop effect for depth if needed, or just the clear spinner */}
        <ClipLoader size={size} color={color} speedMultiplier={0.8} />
      </div>
      {text && (
        <p className="font-medium text-gray-600 animate-pulse text-lg tracking-wide">
          {text}
        </p>
      )}
    </div>
  );
};
