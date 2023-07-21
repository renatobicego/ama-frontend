import Image from "next/image"
import Link from "next/link"

const TorneoCard = ({torneo, months, calendar}) => {
    const fecha = new Date(torneo.fecha)
    return(
        <div className="flex items-center w-full h-20 gap-5 md:gap-8">
            <div className="flex items-center gap-3 md:gap-6 h-full w-2/3 md:w-1/2">
                <div className="flex flex-col items-center h-full pr-3 md:pr-6 border-r-2 md:flex-row md:gap-6">
                    <Image 
                        src={"/icons/Calendar.svg"} 
                        width={50} 
                        height={50}
                        alt={`Calendario icono`} 
                        className="w-6 md:w-8 lg:w-12 xl:w-auto"/>
                    <div className="flex flex-col items-center justify-evenly">
                        <h5 className="font-semibold text-base md:text-xl lg:text-3xl">
                            {fecha.getDate()}
                        </h5>
                        <h6 className="font-medium text-xs md:text-base">
                            {months[fecha.getMonth()]}
                        </h6>
                        <h6 className="font-medium text-xs md:text-base">
                            {fecha.getFullYear()}
                        </h6>
                    </div>
                </div>
                <h4 className="text-left font-medium text-sm md:text-lg">
                    {torneo.nombre}
                </h4>
            </div>
            <Link 
                className="border-l-2 pl-3 md:pl-6 h-full flex justify-center items-center"
                href={calendar ? torneo.programaHorario : torneo.fileHref}
            >
                <button className="btn-primary hidden md:block">
                    {calendar ? 'Descargar Programa Horario' : 'Descargar Resultados'}
                </button>
                <button className="block md:hidden">
                    <img src="/icons/download.svg" alt="" />
                </button>   
            </Link>
            
            
        </div>
    )
}

export default TorneoCard