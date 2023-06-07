import Image from "next/image";


const NewsCard = () => {
    return (
        <div className="flex justify-between items-center w-4/5 font-title text-title gap-8 py-6 border-y-2">
            <Image src={"/imgs/news.png"} width={250} height={250}/>
            <div className="flex flex-col items-center justify-center h-40 border-r-2 pr-8">
                <Image src={"/icons/Calendar.svg"} width={50} height={50}/>
                <h5 className="font-semibold text-3xl">08</h5>
                <h6 className="font-medium">Mayo</h6>
            </div>
            <h4 id="news-title" className="font-semibold text-2xl">Borem ipsum dolor sit amet, consectetur adipiscing elit. </h4>
        </div>
    )
}

export default NewsCard