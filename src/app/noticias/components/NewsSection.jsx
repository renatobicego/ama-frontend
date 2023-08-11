"use client"
import useFetch from "@/app/utils/hooks/useFetch"
import NewsCard from "./NewsCard"
import LoadingError from "@/app/components/LoadingError"
import { useEffect, useState } from "react"
import Paginador from "@/app/components/Paginador"
import { Card } from "@/MT"
import SearchSection from "./SearchSection"
import axios from "axios"

const NewsSection = () => {
    const [pagina, setPagina] = useState(1)
    const division = 10
    const [noticias, setNoticias] = useState()
    const [category, setCategory] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    
    useEffect(() => {
        const fetchNoticias = async() => {
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/noticia/?desde=${(pagina - 1) * division}&limite=${division}`)
            setNoticias(data.noticias)
        }
        if(category === '' && searchTerm === ''){
            fetchNoticias()
        }
    }, [category, searchTerm])

    if(!noticias) return <LoadingError loading={true}/>

    return (
        <>
            <SearchSection 
                category={category} 
                searchTerm={searchTerm} 
                setCategory={setCategory} 
                setNoticias={setNoticias} 
                setSearchTerm={setSearchTerm}/>
        {noticias.length > 0 ? 
            <>
                {noticias.map(noticia => {
                    noticia.href = '/noticias/' + noticia.titulo
                    noticia.fecha = new Date(noticia.fecha)
                    return <NewsCard key={noticia._id} noticia={noticia} />
                })}  
                <Card className="w-full md:w-2/3 lg:w-1/2">
                    <Paginador 
                    pagina={pagina} 
                    setPagina={setPagina} 
                    total={noticias.length} 
                    division={division}/>
                </Card>
            </>
            :
            <h4 className="text-title text-left">No hay noticias disponibles</h4>
        }
        </>
    )
}

export default NewsSection