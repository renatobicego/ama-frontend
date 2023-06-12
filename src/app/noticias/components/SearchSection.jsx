"use client"

import { useState } from "react";
import CategorySelect from "@/app/components/CategorySelect";
import SearchBar from "@/app/components/SearchBar";

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

const SearchSection = () => {
    const [category, setCategory] = useState(undefined)
    const [searchTerm, setSearchTerm] = useState('')

    return(
        <div className="flex w-full gap-4 items-end !font-text flex-wrap">
            <SearchBar 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
                placeholder={'Noticias'}/>
            <CategorySelect 
                category={category} 
                setCategory={setCategory} 
                categories={categories}
                placeholder={'Categorías'}
                />
        </div>
    )
}

export default SearchSection