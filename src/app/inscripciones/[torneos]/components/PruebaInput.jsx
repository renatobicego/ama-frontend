import { Input, Option, Select } from "@/app/utils/materialTailwind"
import { TrashIcon } from "@heroicons/react/24/outline"

const PruebaInput = ({pruebas, pruebaAgregada, setPruebasSelected}) => {


    const handleSelect = (value) => {
        setPruebasSelected(prevState => prevState.map(p => {
            if(p.id === pruebaAgregada.id){
                return {
                    ...p,
                    prueba: value
                }
            }else{
                return p
            }
        }))
    }

    const handleInputMarca = (event) => {
        setPruebasSelected(prevState => prevState.map(p => {
            if(p.id === pruebaAgregada.id){
                return {
                    ...p,
                    marca: event.target.value
                }
            }else{
                return p
            }
        }))
    }

    const deletePrueba = () => {
        setPruebasSelected(prevState => prevState.filter(p => p.id !== pruebaAgregada.id))
    }

    return (
        <div className="flex w-full justify-between gap-6 flex-wrap md:flex-nowrap relative">
            <Select 
                value={pruebaAgregada.value} 
                onChange={handleSelect} 
                color="gray" 
                label="Seleccionar Prueba*">
                    
                {pruebas.map((p, i) => 
                    <Option key={i} value={p.value}>{p.name}</Option>
                )}
            </Select>
            <Input value={pruebaAgregada.marca} onChange={handleInputMarca} color="gray" label="Mejor Marca de Prueba*" />

            <button 
                className={`absolute -right-6 top-[42%] md:-right-10 md:top-2 rounded cursor-pointer`}
                onClick={deletePrueba}
            >
                <TrashIcon strokeWidth={1} className="h-5 w-5 md:h-7 md:w-7 text-gray-700" />
            </button>
        </div>
    )
}

export default PruebaInput