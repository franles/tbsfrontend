import { Spinner } from "./widget/Spinner";

export const Loader = ({ text }: { text?: string }) => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50/50 backdrop-blur-sm z-50 fixed inset-0">
      <Spinner size={60} text={text} />
    </div>
  );
};
