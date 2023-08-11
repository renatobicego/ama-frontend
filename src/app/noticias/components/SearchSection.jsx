"use client"

import { useEffect, useState } from "react";
import CategorySelect from "@/app/components/search/CategorySelect";
import SearchBar from "@/app/components/search/SearchBar";
import useFetch from "@/app/utils/hooks/useFetch";
import axios from "axios";


const SearchSection = ({setNoticias, category, setCategory, searchTerm, setSearchTerm}) => {
    const {data} = useFetch('noticia/categorias')

    useEffect(() => {
        const fetchNoticiasPorCategoria = async() => {
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/noticia/noticias_recomendadas/${category}`)
            setNoticias(data.noticias)
        }
        if(category !== ''){
            fetchNoticiasPorCategoria()
        }
    }, [category])

    const searchNoticia = async() => {
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/noticia/busqueda`, {searchTerm: searchTerm})
        setNoticias(data.noticias)
    }


    if(data){
        return(
            <div className="flex w-full gap-4 items-end !font-text flex-wrap">
                <SearchBar 
                    searchTerm={searchTerm} 
                    setSearchTerm={setSearchTerm} 
                    placeholder={'Noticias'}
                    searchFunction={searchNoticia}
                    />
                <CategorySelect 
                    category={category} 
                    setCategory={setCategory} 
                    categories={data.categorias}
                    placeholder={'Categorías'}
                    />
            </div>
        )
    }
}

export default SearchSection