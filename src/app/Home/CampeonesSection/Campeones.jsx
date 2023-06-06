"use client"
import { sliceIntoChunks} from "@/app/utils/utils"
import { Carousel, Typography} from "../../utils/materialTailwind"
import ContainerCards from "./ContainerCards"
import useWindowSize from "@/app/utils/hooks/useWindowSize"

const mockedCampeones = [
    {
        name: 'Renzo Cremaschi',
        imgHref: 'https://drive.google.com/uc?export=view&id=1YOdatDa6js9FBrHEI2OzayEnNrpKlKNd',
        pruebas: ['110 C/V', '200m']
    },
    {
        name: 'Renata Zanata',
        imgHref: 'https://drive.google.com/uc?export=view&id=15u5o7UWZZVvhZlo1WK9EwO79LvMvH7JJ',
        pruebas: ['5000m Marcha']
    },
    {
        name: 'Ignacio Erario',
        imgHref: 'https://drive.google.com/uc?export=view&id=1htqEd8nLLnnrUY-5Ig08lh9eF-eeYjPf',
        pruebas: ['5000m', '10000m']
    },
    {
        name: 'Alma Marcha',
        imgHref: 'https://drive.google.com/uc?export=view&id=1cRC83Ka3zIXNKTxcr1_cXXWBtEYzMdUa',
        pruebas: ['5000m Marcha']
    },
]

const Campeones = () => {

    const windowSize = useWindowSize()

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
                    {
                        sliceIntoChunks(mockedCampeones, isMobile ? 1 : (isDesktop ? 3 : 2)).map((chunk, i) => <ContainerCards campeones={chunk} key={i}/>)
                    }
                    
                </Carousel>
            </div>
        </section>
    )
}

export default Campeones