import { ClipLoader } from "react-spinners";

export const Spinner = ({ text, size }: { text?: string; size?: number }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div>
        <ClipLoader size={size} />;
      </div>
      <p className="font-semibold">{text}</p>
    </div>
  );
};
