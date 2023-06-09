import { Input} from "@/app/utils/materialTailwind.js";
import { MagnifyingGlassIcon} from "@heroicons/react/24/outline";

const SearchBar = ({searchTerm, setSearchTerm}) => {
    const onChangeSearchInput = (e) => {
        setSearchTerm(e.target.value)
    }
    return(
        <div className="flex relative w-full max-w-[24rem]">
            <Input 
                variant="standard" 
                label="Buscar" 
                value={searchTerm}
                onChange={onChangeSearchInput}
                size="lg"
                color="gray"
                className=" text-text"
                />  
            <button className="!absolute right-0 top-4 rounded">
                <MagnifyingGlassIcon strokeWidth={2} className="h-5 w-5 md:h-7 md:w-7 text-primary2"/>
            </button>
         </div>
    )
}

export default SearchBar