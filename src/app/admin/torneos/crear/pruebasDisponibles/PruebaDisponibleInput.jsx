import { Option, Select } from "@/app/utils/materialTailwind"
import { TrashIcon } from "@heroicons/react/24/outline"

const PruebaDisponibleInput = ({pruebas, prueba, handlePruebaChange, handleEliminarPrueba}) => {


    return (
        <div className="flex w-full justify-between gap-6 flex-wrap md:flex-nowrap relative">
            <Select 
                value={prueba} 
                onChange={(newValue) => handlePruebaChange(prueba, newValue)} 
                color="gray" 
                label="Seleccionar Prueba*"
                aria-labelledby="prueba"
                labelProps={{id: 'prueba'}}
                >
                    
                {pruebas.map(p => 
                    <Option key={p._id} value={p._id}>{p.nombre}</Option>
                )}
            </Select>

            <button 
                aria-label='delete prueba'
                className={`absolute w-6 -right-6 top-[30%] md:-left-10 md:top-2 rounded cursor-pointer`}
                onClick={() => handleEliminarPrueba(prueba)}
            >
                <TrashIcon strokeWidth={1} className="h-5 w-5 md:h-7 md:w-7 text-gray-700" />
            </button>
        </div>
    )
}

export default PruebaDisponibleInput