"use client"

import { useState } from "react";
import CategorySelect from "./CategorySelect";
import SearchBar from "./SearchBar";

const SearchSection = () => {
    const [category, setCategory] = useState(undefined)
    const [searchTerm, setSearchTerm] = useState('')

    return(
        <div className="flex w-full gap-4 items-end !font-text flex-wrap">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            <CategorySelect category={category} setCategory={setCategory}/>
        </div>
    )
}

export default SearchSection