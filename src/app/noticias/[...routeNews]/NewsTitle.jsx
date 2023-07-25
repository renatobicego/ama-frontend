"use client"
import { Button } from "@/app/utils/materialTailwind"
import { months } from "@/app/utils/utils"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import { useRouter } from "next/navigation"


const NewsTitle = ({newsMocked}) => {
    const router = useRouter()
    return (
        <section className="flex flex-col w-full lg:w-4/5 gap-3">
            <Button 
                variant="text" 
                onClick={() => router.back()}
                size="sm"
                color="red"
                className="w-32 pl-2 flex justify-start items-center gap-3 text-title"
                >
                <ArrowLeftIcon strokeWidth={2} className="w-5"/>
                Volver
            </Button>
            <h3 className="title-section text-left 2xl:text-4xl">
                {newsMocked.title}
            </h3>
            <i className="text-right text-xs lg:text-sm">
                {newsMocked.date.getDate()} de {months[newsMocked.date.getMonth()]} de {newsMocked.date.getFullYear()}
            </i>
            <h4 className="font-medium md:text-base lg:text-lg">
                {newsMocked.subtitle}
            </h4>
            <h5 className="text-xs text-white md:text-base bg-tag-bg py-1 px-2 max-w-fit border-l-2 border-l-primary1 mb-2 font-title">
                {newsMocked.category}
            </h5>
            <Image 
                src={newsMocked.imageCover.imgHref} 
                width={1000} 
                height={1000}
                className="mt-4"
                alt={`Imagen ${newsMocked.imageCover.epigraph}`}
                />
            <i className="paragraph-news">{newsMocked.imageCover.epigraph}</i>
        </section>
    )
}

export default NewsTitle