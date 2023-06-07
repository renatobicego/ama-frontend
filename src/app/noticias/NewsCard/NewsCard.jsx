import Image from "next/image";


const NewsCard = ({news, months}) => {
    return (
        <div className="flex justify-between items-center w-full xl:w-4/5 font-title text-title gap-2 md:gap-5 lg:gap-8 py-3 xl:py-6 border-y-2">
            <Image src={news.imgHref} width={250} height={250} className="w-1/4 md:w-1/2 2xl:w-1/3 h-[10vh] lg:h-32 xl:h-40 object-cover object-center"/>
            <div className="flex flex-col items-center justify-center h-[10vh] lg:h-32 xl:h-40 border-r-2 pr-2 md:pr-5 lg:pr-8">
                <Image src={"/icons/Calendar.svg"} width={50} height={50} className="w-6 md:w-8 lg:w-12"/>
                <h5 className="font-semibold text-base md:text-xl lg:text-3xl">{news.date.getDay()}</h5>
                <h6 className="font-medium text-xs md:text-base">{months[news.date.getMonth()]}</h6>
            </div>
            <h4 id="news-title" className="font-semibold text-xs md:text-sm lg:text-lg xl:text-xl">
                {news.title}
            </h4>
        </div>
    )
}

export default NewsCard