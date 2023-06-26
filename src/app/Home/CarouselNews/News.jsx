/* eslint-disable react/prop-types */
import Image from "next/image";
import Link from "next/link";

const News = ({news}) => {
    return(
        <Link href={news.href} role="link">
            <div className="relative h-full w-full">
                
                <Image
                    src={news.imgHref}
                    width={1500}
                    height={1500}
                    alt={`Imagen de noticia con título ${news.title}`}
                    className="h-full w-full object-cover"
                    priority={true}
                />
                <div className="absolute inset-0 flex justify-center items-end h-full w-full bg-gradient-to-t from-title to-70%">
                    <div className="size-section text-left mb-[5%] lg:mb-[1%] ">
                        <h5 className="text-xs text-white md:text-base bg-tag-bg py-1 px-2 max-w-fit border-l-2 border-l-primary1 mb-2 font-title">
                            {news.category}
                        </h5>
                        <h2 className="mb-4 text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-title font-semibold text-white">
                            {news.title}
                        </h2>
                        <h4 className="mb-12 text-sm md:text-lg lg:text-xl xl:text-2xl opacity-80 font-title text-white">
                            {news.subtitle}
                        </h4>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default News