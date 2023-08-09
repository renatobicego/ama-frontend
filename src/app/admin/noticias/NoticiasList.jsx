"use client"
import LoadingError from "@/app/components/LoadingError"
import NewsCard from "@/app/noticias/components/NewsCard"
import useFetch from "@/app/utils/hooks/useFetch"

const NoticiasList = () => {
    const {data, loading, error} = useFetch('noticia')
    if(loading || error) return <LoadingError loading={loading} error={error} />

    if(data.noticias.length > 0){
        return (
            <>
                {data.noticias.map(noticia => {
                    noticia.href = '/admin/noticias/editar/' + noticia._id
                    noticia.fecha = new Date(noticia.fecha)
                    return <NewsCard key={noticia._id} noticia={noticia} />
                })}
            
            </>
        )
    }else {
        return <h4 className="text-title text-left">No hay noticias disponibles</h4>
    }

}

export default NoticiasList