import { monthsAbbreviated } from "@/app/utils/utils";
import Image from "next/image";
import Link from "next/link";

const NewsCard = ({noticia}) => {
    return (
        <Link href={noticia.href}>
            <div className="flex justify-between items-center w-full xl:w-4/5 font-title text-title gap-2 md:gap-5 lg:gap-8 py-3 xl:py-6 border-y-2">
                <div className="w-3/5 md:w-1/3 h-[10vh] lg:h-32 xl:h-40">
                    <Image src={noticia.imgPortada.url} 
                        alt={`Imagen de noticia con título: ${noticia.titulo}`} 
                        width={300} 
                        height={300} 
                        className="h-full object-cover object-center"/>
                </div>
                <div className="flex flex-col items-center justify-center h-[10vh] lg:h-32 xl:h-40 border-r-2 pr-2 md:pr-5 lg:pr-8">
                    <Image src={"/icons/Calendar.svg"} alt={`Calendario icono`} width={50} height={50} className="w-6 md:w-8 lg:w-12 xl:w-auto"/>
                    <h5 className="font-semibold text-base md:text-xl lg:text-3xl">{noticia.fecha.getDate()}</h5>
                    <h6 className="font-medium text-xs md:text-base">{monthsAbbreviated[noticia.fecha.getMonth()]}</h6>
                </div>
                <h4 className="font-semibold text-xs md:text-sm lg:text-lg xl:text-xl">
                    {noticia.titulo}
                </h4>
            </div>
        </Link>
    )
}

export default NewsCard