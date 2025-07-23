import { useUser } from "../hooks/useUser";

function Annual() {
  const { user } = useUser();
  console.log(user);
  return (
    <>
      <div className="relative h-[400px] bg-cover bg-[center_top_60%] bg-[url('https://res.cloudinary.com/dttpgbmdx/image/upload/v1753274364/anual_ffm5o0.jpg')]">
        <div className="absolute inset-0 bg-black opacity-30 z-0"></div>

        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0) 66%, rgba(255,255,255,1) 100%)",
          }}
        ></div>
        <div className="relative z-20 h-full flex items-center justify-center">
          <h1 className="text-7xl font-bold text-white drop-shadow-lg text-center">
            Resumen Anual
          </h1>
        </div>
      </div>
    </>
  );
}

export default Annual;
