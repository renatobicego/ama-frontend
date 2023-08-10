import useFetch from "@/app/utils/hooks/useFetch"
import NewsCard from "../components/NewsCard"
import LoadingError from "@/app/components/LoadingError"

const NewsRecommendend = ({categoriaId, idNoticia}) => {
    const {data, loading, error} = useFetch('noticia/noticias_recomendadas/' + categoriaId)
    if(loading || error) return <LoadingError loading={loading} error={error} />

    const noticiasRecomendadas = data.noticias.filter(n => n._id !== idNoticia)

    if(noticiasRecomendadas.length > 0){
        return (
            <section className="md:w-4/5 my-16 flex flex-col gap-2">
                <h4 className="subtitle-news">
                    Noticias Recomendadas
                </h4>
                {noticiasRecomendadas.map(n => {
                    n.href = '/noticias/' + n.titulo
                    n.fecha = new Date(n.fecha)
                    return <NewsCard key={n._id} noticia={n}/>
                })}
            </section>
        )
    }
}

export default NewsRecommendend