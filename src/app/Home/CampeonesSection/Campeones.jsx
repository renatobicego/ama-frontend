"use client"
import { sliceIntoChunks} from "@/app/utils/utils"
import { Carousel, Typography} from "@/app/utils/materialTailwind"
import ContainerCards from "./ContainerCards"
import useWindowSize from "@/app/utils/hooks/useWindowSize"
import { useEffect, useState } from "react"
import axios from "axios"

const mockedCampeones = [
    {
        name: 'Renzo Cremaschi',
        imgHref: '/imgs/renzo.jpg',
        pruebas: ['110 C/V', '200m']
    },
    {
        name: 'Renata Zanata',
        imgHref: '/imgs/renata.jpeg',
        pruebas: ['5000m Marcha']
    },
    {
        name: 'Ignacio Erario',
        imgHref: '/imgs/erario.jpeg',
        pruebas: ['5000m', '10000m']
    },
    {
        name: 'Alma Marcha',
        imgHref: '/imgs/almaMarcha.jpeg',
        pruebas: ['5000m Marcha']
    },
]

const Campeones = () => {

    const windowSize = useWindowSize()
    const [campeones, setCampeones] = useState([])

    useEffect(async() => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/campeones`)
        console.log(res.data)
    }, [])

    // Check for how many cards to render in div
    const isMobile = windowSize.width < 768 
    const isDesktop = windowSize.width > 1280

    return(
        <section className="w-full bg-hamburguer-menu-bg py-14">
            <div className="size-section flex justify-between flex-col items-center">
                <Typography
                  className='font-title font-semibold text-white text-2xl lg:text-3xl text-center'
                >
                    Nuestros Campeones Nacionales
                </Typography>
                <Carousel
                    autoplay={true}
                    loop={true}
                    className="md:mt-2 lg:mt-4"
                    navigation={({ setActiveIndex, activeIndex, length }) => (
                        <div className="absolute bottom-0 left-2/4 z-10 flex -translate-x-2/4 gap-2">
                          {new Array(length).fill("").map((_, i) => (
                            <span
                              key={i}
                              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] w-12 lg:w-16 ${
                                activeIndex === i ? "bg-white " : "bg-white/50 "
                              }`}
                              onClick={() => setActiveIndex(i)}
                            />
                          ))}
                        </div>
                      )}
                >
                    {/* Render 1 card if mobile, 2 if tablet and 3 if desktop */}
                    {
                        sliceIntoChunks(mockedCampeones, 
                            isMobile ? 1 : (isDesktop ? 3 : 2))
                            .map((chunk, i) => <ContainerCards campeones={chunk} key={i}/>)
                    }
                    
                </Carousel>
            </div>
        </section>
    )
}

export default Campeones