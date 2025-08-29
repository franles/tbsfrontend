import type { ReactNode } from "react";
import { modalStore } from "../store/modalStore";
import { tripsStore } from "../store/tripsStore";

export const Modal = ({ children }: { children: ReactNode }) => {
  const { setIsOpen } = modalStore();
  const { setTripId } = tripsStore();
  const handleBackgroundClick = () => {
    setTripId(null);
    setIsOpen(false);
  };
  return (
    <section
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleBackgroundClick}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </section>
  );
};
