"use client"
import { months } from "@/app/utils/utils"
import Image from "next/image"

const NewsTitle = ({noticia}) => {
    const fecha = new Date(noticia.fecha)
    return (
        <section className="flex flex-col w-full lg:w-4/5 gap-3">
            <h3 className="title-section text-left 2xl:text-4xl">
                {noticia.titulo}
            </h3>
            <i className="text-right text-xs lg:text-sm">
                {fecha.getDate()} de {months[fecha.getMonth()]} de {fecha.getFullYear()}
            </i>
            <h4 className="font-medium md:text-base lg:text-lg">
                {noticia.subtitulo}
            </h4>
            <h5 className="text-xs text-white md:text-base bg-tag-bg py-1 px-2 max-w-fit border-l-2 border-l-primary1 mb-2 font-title">
                {noticia.categoria.nombre}
            </h5>
            <Image 
                src={noticia.imgPortada.url} 
                width={1000} 
                height={1000}
                className="mt-4"
                alt={`Imagen ${noticia.imgPortada.epigrafe}`}
                />
            <i className="paragraph-news">{noticia.imgPortada.epigrafe}</i>
        </section>
    )
}

export default NewsTitle