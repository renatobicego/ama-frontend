import { Select, Option, Input, Button } from "@/app/utils/materialTailwind.js";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

const SearchSection = () => {
    return(
        <div className="flex justify-between gap-4 items-end !font-text">
            <div className="flex relative w-full max-w-[24rem]">
                <Input 
                    variant="standard" 
                    label="Buscar Noticias" 
                    size="lg"
                    color="gray"
                    className="indent-10 pr-96 text-text"
                    />  
                <button className="!absolute right-0 top-4 rounded">
                    <MagnifyingGlassIcon strokeWidth={2} className="h-5 w-5 md:h-7 md:w-7 text-primary2"/>
                </button>
            </div>
            <div className="flex relative">
                <Select
                    label="Categorías"
                    color="amber"
                    animate={{
                    mount: { y: 0 },
                    unmount: { y: 25 },
                    }}
                >
                    <Option>Material Tailwind HTML</Option>
                    <Option>Material Tailwind React</Option>
                </Select>
                <button className="!absolute -right-8 top-2 rounded">
                    <XMarkIcon strokeWidth={1} className="h-5 w-5 md:h-7 md:w-7 text-gray-700" />
                </button>
            </div>
        </div>
    )
}

export default SearchSection