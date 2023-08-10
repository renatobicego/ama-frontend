import { Select, Option} from "@/app/utils/materialTailwind.js";
import { XMarkIcon } from "@heroicons/react/24/outline";


// Ctaegory select input for news or torneos filter
// Category is state variable that is selected. Categories are all the options available
const CategorySelect = ({category, setCategory, categories, placeholder}) => {
    const onChangeCategory = (e) => {
        setCategory(e)
    }

    const onClickDeleteCategory = () => {
        setCategory(undefined)
    }

    return(
        <div className="flex relative">
                <Select
                    label={`${placeholder}`}
                    color="amber"
                    value={category}
                    onChange={onChangeCategory}
                    animate={{
                    mount: { y: 0 },
                    unmount: { y: 25 },
                    }}
                    
                >
                    {categories.map(c => 
                        <Option 
                            key={c._id}  
                            value={c._id}>
                                {c.nombre}
                        </Option> 
                    )}
                    
                </Select>
                <button 
                    className={`!absolute -right-8 top-2 rounded ${category ? "visible": "invisible"}`}
                    onClick={onClickDeleteCategory}
                    >
                    <XMarkIcon strokeWidth={1} className="h-5 w-5 md:h-7 md:w-7 text-gray-700" />
                </button>
            </div>
    )
}

export default CategorySelect