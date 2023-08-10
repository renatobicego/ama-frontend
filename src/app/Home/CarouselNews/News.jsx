/* eslint-disable react/prop-types */
import Image from "next/image";
import Link from "next/link";

const News = ({noticia}) => {
    const href = 'noticias/' + noticia.titulo
    return(
        <Link href={href} role="link">
            <div className="relative h-full w-full">
                
                <Image
                    src={noticia.imgPortada.url}
                    width={1500}
                    height={1500}
                    alt={`Imagen de noticia con título ${noticia.title}`}
                    className="h-full w-full object-cover"
                    priority={true}
                />
                <div className="absolute pl-2 inset-0 flex justify-center items-end h-full w-full bg-gradient-to-t from-title to-70%">
                    <div className="size-section text-left mb-[5%] lg:mb-[1%] ">
                        <h5 className="text-xs text-white md:text-base bg-tag-bg py-1 px-2 max-w-fit border-l-2 border-l-primary1 mb-2 font-title">
                            {noticia.categoria.nombre}
                        </h5>
                        <h2 className="mb-4 text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-title font-semibold text-white">
                            {noticia.titulo}
                        </h2>
                        <h4 className="line-clamp-2 mb-12 text-sm md:text-lg lg:text-xl xl:text-2xl opacity-80 font-title text-white">
                            {noticia.subtitulo}
                        </h4>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default News