import Navbar from "./components/Navbar"
import fondoAnual from "./components/img/anual.jpg"

function Annual() {
    return (
        <>
            <Navbar />
            <div className="relative h-[400px] bg-cover bg-[center_top_60%]" style={{ backgroundImage: `url(${fondoAnual})` }}>

                <div className="absolute inset-0 bg-black opacity-30 z-0"></div>

                <div className="absolute inset-0 z-10" style={{background: "linear-gradient(to bottom, rgba(255,255,255,0) 66%, rgba(255,255,255,1) 100%)",}}>

                </div>
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