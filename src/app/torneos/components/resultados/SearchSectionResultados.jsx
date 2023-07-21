"use client"
import CategorySelect from "@/app/components/search/CategorySelect"
import SearchBar from "@/app/components/search/SearchBar"
import { useState } from "react"

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

const SearchSectionResultados = () => {
    const [category, setCategory] = useState(undefined)
    const [searchTerm, setSearchTerm] = useState('')

    return(
        <div className="flex w-full gap-4 items-end !font-text flex-wrap">
            <SearchBar 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
                placeholder={'Resultados de Torneos'}/>
            <CategorySelect 
                category={category} 
                setCategory={setCategory} 
                categories={categories} 
                placeholder={'Año'}/>
        </div>
    )
}

export default SearchSectionResultados