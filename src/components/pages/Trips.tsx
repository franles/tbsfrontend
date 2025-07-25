import Table from "../layout/Table";

function Trips() {
  return (
    <>
      <div className="relative h-[400px] bg-cover bg-[center_top_0%] bg-[url('https://res.cloudinary.com/dttpgbmdx/image/upload/v1753274365/maletas_jzcjf2.webp')]">
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
            Paquetes Turísticos
          </h1>
        </div>
      </div>

      <Table></Table>
    </>
  );
}

export default Trips;
