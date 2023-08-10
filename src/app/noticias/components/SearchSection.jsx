"use client"

import { useState } from "react";
import CategorySelect from "@/app/components/search/CategorySelect";
import SearchBar from "@/app/components/search/SearchBar";
import useFetch from "@/app/utils/hooks/useFetch";

const categories = [
    {
        index: 0,
        value: 'uno',
        text: 'Categoria Uno'
    },
    {
        index: 1,
        value: 'dos',
        text: 'Categoria Dos'
    },
    {
        index: 2,
        value: 'tres',
        text: 'Categoria Tres'
    },
    {
        index: 3,
        value: 'cuatro',
        text: 'Categoria Cuatro'
    },

]

const SearchSection = ({setNoticias, category, setCategory, searchTerm, setSearchTerm}) => {
    const {data} = useFetch('noticia/categorias')
    if(data){
        return(
            <div className="flex w-full gap-4 items-end !font-text flex-wrap">
                <SearchBar 
                    searchTerm={searchTerm} 
                    setSearchTerm={setSearchTerm} 
                    placeholder={'Noticias'}/>
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