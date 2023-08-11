import { Input} from "@/app/utils/materialTailwind.js";
import { MagnifyingGlassIcon} from "@heroicons/react/24/outline";

const SearchBar = ({searchTerm, setSearchTerm, placeholder, searchFunction}) => {
    const onChangeSearchInput = (e) => {
        setSearchTerm(e.target.value)
    }
    return(
        <form className="flex relative w-full max-w-[24rem]" onSubmit={(e) => {e.preventDefault(); searchFunction()}}>
            <Input 
                variant="standard" 
                label={`Buscar ${placeholder}`} 
                value={searchTerm}
                onChange={onChangeSearchInput}
                size="lg"
                color="gray"
                className=" text-text"
                />  
            <button className="!absolute right-0 top-4 rounded" type="submit">
                <MagnifyingGlassIcon strokeWidth={2} className="h-5 w-5 md:h-7 md:w-7 text-primary2"/>
            </button>
         </form>
    )
}

export default SearchBar