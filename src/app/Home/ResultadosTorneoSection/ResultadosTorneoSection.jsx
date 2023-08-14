import Image from "next/image"
import Link from "next/link"

const ResultadosTorneoSection = () => {
    return(
        <section className="size-section flex gap-8 md:gap-14 lg:gap-20 my-20 lg:my-32 items-center h-[200px] lg:h-auto">
            <div className="relative w-1/2 h-full">
                <Image 
                    src='/imgs/cavem.jpg' 
                    width={1000} 
                    height={1000} 
                    alt="Imagen decorativa de torneos" 
                    className="w-full h-full object-cover max-h-[360px]"
                />
                <Image 
                    width={500} 
                    height={500} 
                    className="absolute w-3/4 md:w-[45%] h-1/2 -bottom-4 -right-4 p-2 bg-white object-cover" 
                    src='/imgs/murialdo.jpg' 
                    alt="Imagen decorativa de torneos" 
                />
            </div>
            <div className="flex flex-col gap-4 items-start justify-evenly w-1/2 h-full">
                <h3 className="font-title md:!leading-relaxed font-semibold text-title w-full md:w-60 lg:w-80 text-xl lg:text-3xl">
                    Resultados de Torneos y Calendario
                </h3>

                <Link href={"/torneos"}>
                    <button className="btn-primary">Consultar Torneos</button>
                </Link>
            </div>
        </section>
    )
}

export default ResultadosTorneoSection