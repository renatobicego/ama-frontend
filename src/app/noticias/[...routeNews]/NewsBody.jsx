import Image from "next/image"


const NewsBody = ({paragraph}) => {
    return(
        <>
            {paragraph.subtitle && <h4 className="subtitle-news md:px-4">{paragraph.subtitle}</h4>}
            <p className="paragraph-news">
                {paragraph.text}
            </p>
            {paragraph.img && 
                <div className="flex flex-col gap-3">
                    <Image 
                        src={paragraph.img.imgHref} 
                        width={1000} 
                        height={1000}
                        className="mt-4"
                        alt={`Imagen ${paragraph.img.epigraph}`}
                        />                                              
                    <i className="paragraph-news">{paragraph.img.epigraph}</i>
                </div>
            }
        </>
    )
}

export default NewsBody