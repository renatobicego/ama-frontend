"use client"
import Image from "next/image"
import NewsBody from "./NewsBody"
import NewsTitle from "./NewsTitle"
import NewsRecommendend from "./NewsRecommended"
import Noticia from "./Noticia"
import VolverButton from "@/app/components/button/VolverButton"

export default function News ({params}){
    const {titulo} = params
    return(
        <main className="pt-[17vh] md:pt-[14vh] lg:pt-44 2xl:pt-52 pb-20 size-section">
            <VolverButton />
            <Noticia titulo={titulo} />
        </main>
    )
}
