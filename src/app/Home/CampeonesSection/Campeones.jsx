"use client"
import { sliceIntoChunks} from "@/app/utils/utils"
import { Carousel, Typography} from "@/app/utils/materialTailwind"
import ContainerCards from "./ContainerCards"
import useWindowSize from "@/app/utils/hooks/useWindowSize"
import useFetch from "@/app/utils/hooks/useFetch"


const Campeones = () => {

    const windowSize = useWindowSize()
    const {data} = useFetch('campeones')

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
                        data &&
                        sliceIntoChunks(data.campeones, 
                            isMobile ? 1 : (isDesktop ? 3 : 2))
                            .map((chunk, i) => <ContainerCards campeones={chunk} key={i}/>)
                    }
                    
                </Carousel>
            </div>
        </section>
    )
}

export default Campeones