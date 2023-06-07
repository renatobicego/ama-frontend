import { Select, Option} from "@/app/utils/materialTailwind.js";
import { XMarkIcon } from "@heroicons/react/24/outline";

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

const CategorySelect = ({category, setCategory}) => {
    const onChangeCategory = (e) => {
        setCategory(e)
    }

    const onClickDeleteCategory = () => {
        setCategory(undefined)
    }

    return(
        <div className="flex relative">
                <Select
                    label="Categorías"
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
                            key={c.index} 
                            index={c.index} 
                            value={c.value}>
                                {c.text}
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