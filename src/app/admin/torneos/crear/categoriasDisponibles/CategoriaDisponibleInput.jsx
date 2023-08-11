import { Option, Select } from "@/app/utils/materialTailwind"
import { TrashIcon } from "@heroicons/react/24/outline"

const CategoriaDisponibleInput = ({categorias, categoria, handleCategoriaChange, handleEliminarCategoria}) => {


    return (
        <div className="flex w-full justify-between gap-6 flex-wrap md:flex-nowrap relative">
            <Select 
                value={categoria} 
                onChange={(newValue) => handleCategoriaChange(categoria, newValue)} 
                color="gray" 
                label="Seleccionar Categoria*"
                aria-labelledby="categoria"
                labelProps={{id: 'categoria'}}
                
                >
                    
                {categorias.map(c => 
                    <Option key={c._id} value={c._id}>{c.nombre}</Option>
                )}
            </Select>

            <button 
                type="button"
                aria-label='delete categoria'
                className={`absolute -right-6 w-6 top-[30%] md:-right-10 md:top-2 rounded cursor-pointer`}
                onClick={() => handleEliminarCategoria(categoria)}
            >
                <TrashIcon strokeWidth={1} className="h-5 w-5 md:h-7 md:w-7 text-gray-700" />
            </button>
        </div>
    )
}

export default CategoriaDisponibleInput