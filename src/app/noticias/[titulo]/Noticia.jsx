import useFetch from "@/app/utils/hooks/useFetch"
import NewsBody from "./NewsBody"
import NewsRecommendend from "./NewsRecommended"
import NewsTitle from "./NewsTitle"
import LoadingError from "@/app/components/LoadingError"


const Noticia = ({titulo}) => {
    const {data, loading, error} = useFetch('noticia/titulo/' + titulo)
    if(loading || error) return <LoadingError loading={loading} error={error} />
    const {noticia} = data
    return (
        <>
            <NewsTitle noticia={noticia} />

            <section className="flex flex-col w-full lg:w-4/5 gap-8 mt-8">

                {noticia.cuerpo.map(parrafo => <NewsBody key={parrafo._id} parrafo={parrafo} />)}

                <h5 className="paragraph-news">
                    Escrita por <i>{noticia.autor.nombre_apellido}</i>
                </h5>
            </section>

            <NewsRecommendend categoriaId={noticia.categoria._id} idNoticia={noticia._id}/>
        </>
    )
}

export default Noticia