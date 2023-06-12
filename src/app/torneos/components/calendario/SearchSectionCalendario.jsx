"use client"
import SearchBar from "@/app/components/SearchBar"
import { useState } from "react"

const SearchSectionCalendario = () => {
    const [searchTerm, setSearchTerm] = useState('')

    return(
        <div className="flex w-full gap-4 items-end !font-text flex-wrap">
            <SearchBar 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
                placeholder={'Próximos Torneos'}/>
        </div>
    )
}

export default SearchSectionCalendario