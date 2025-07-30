import { modalStore } from "../store/modalStore";
import { tripsStore } from "../store/tripsStore";
import { CgClose } from "react-icons/cg";

export const TripEditModal = () => {
  const { setIsEditOpen } = modalStore();
  const { setTripId } = tripsStore();
  return (
    <div className="bg-slate-800 rounded-2xl shadow-lg w-full max-w-3xl  p-6 relative animate-fadeIn text-white">
      <button
        onClick={() => {
          setTripId(null);
          setIsEditOpen(false);
        }}
        className="absolute top-3 right-3 text-gray-300 transition"
      >
        <CgClose size={30} />
      </button>
      TripEditModal
    </div>
  );
};
