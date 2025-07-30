import type { ReactNode } from "react";

export const Modal = ({ children }: { children: ReactNode }) => {
  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {children}
    </section>
  );
};
