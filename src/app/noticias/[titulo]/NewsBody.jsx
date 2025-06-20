import Image from "next/image"


const NewsBody = ({parrafo}) => {
    return(
        <>
            {parrafo.titulo && <h4 className="subtitle-news md:px-4">{parrafo.titulo}</h4>}
            <p className="paragraph-news">
                {parrafo.texto}
            </p>
            {parrafo.imagenes !== null && 
                <div className="flex flex-col gap-3">
                    <Image 
                        src={parrafo.imagenes.url} 
                        width={1000} 
                        height={1000}
                        className="mt-4"
                        alt={`Imagen ${parrafo.imagenes.epigrafe}`}
                        />  
                    {parrafo.imagenes.epigrafe !== null &&
                        <i className="paragraph-news">{parrafo.imagenes.epigrafe}</i>
                    }                                            
                </div>
            }
        </>
    )
}

export default NewsBody