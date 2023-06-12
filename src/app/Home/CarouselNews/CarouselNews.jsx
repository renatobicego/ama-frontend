"use client"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline"
import News from "./News";
import { Carousel, IconButton } from "@/app/utils/materialTailwind";


const news = [
    {
        tag: 'Últimas Noticias',
        title: 'Borem ipsum dolor sit amet, consectetur adipiscing elit.',
        subtitle: 'Morem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class ',
        imgHref: '/imgs/carrousel.jpg',
        href: '/noticias/titulo/id',
        category: 'Torneos'
    },
    {
        tag: 'Últimas Noticias',
        title: 'Borem ipsum dolor sit amet, consectetur adipiscing elit.',
        subtitle: 'Morem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class ',
        imgHref: '/imgs/renzo.jpg',
        href: '/noticias/titulo/id',
        category: 'Torneos'
    },
]

 
const CarouselNews = () => {
  return (
    <Carousel
      className="pt-[10vh] h-[65vh] lg:h-[80vh]"
      autoplay={true}
      loop={true}
      //Navigation lines bottom
      navigation={({ setActiveIndex, activeIndex, length }) => (
        
        <div className="absolute bottom-4 left-2/4 flex -translate-x-2/4 gap-2 p-6 z-10">
          {new Array(length).fill("-").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] w-12 lg:w-16 ${
                activeIndex === i ? "bg-white" : "bg-white/50 "
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}

      //Arows to navigate
      prevArrow={({ handlePrev }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handlePrev}
          className="!absolute top-[55%] left-1 md:left-8"
        >
          <ArrowLeftIcon strokeWidth={2} className="w-6 h-6 md:w-10 md:h-10" />
        </IconButton>
      )}
      nextArrow={({ handleNext }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handleNext}
          className="!absolute top-[55%] right-1 md:right-8"
        >
          <ArrowRightIcon strokeWidth={2} className="w-6 h-6 md:w-10 md:h-10" />
        </IconButton>
        )}
    >
        {news.map((n, i) => <News news={n} key={i} />)}
      
    </Carousel>
  );
}

export default CarouselNews

