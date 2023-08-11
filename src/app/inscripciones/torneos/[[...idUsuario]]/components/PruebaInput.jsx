import { Input, Option, Select, Typography } from "@/app/utils/materialTailwind"
import { setFormatoMarca } from "@/app/utils/utils"
import { InformationCircleIcon, TrashIcon } from "@heroicons/react/24/outline"


const PruebaInput = ({pruebas, pruebaAgregada, setPruebasSelected}) => {

    const handleSelect = (value) => {
        const pruebaSelected = pruebas.find(p => p._id === value)
        setPruebasSelected(prevState => prevState.map(p => {
            // Change only pruebaAgregada input
            if(p.id === pruebaAgregada.id){
                return {
                    ...p,
                    prueba: value,
                    formato: setFormatoMarca(pruebaSelected)
                }
            }else{
                return p
            }
        }))
    }

    const handleInputMarca = (event) => {
        setPruebasSelected(prevState => prevState.map(p => {
            // Change only pruebaAgregada input
            if(p.id === pruebaAgregada.id){
                return {
                    ...p,
                    marca: event.target.value.trim()
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
                value={pruebaAgregada.prueba} 
                onChange={handleSelect} 
                color="gray" 
                label="Seleccionar Prueba*"
                aria-labelledby="prueba"
                labelProps={{id: 'prueba'}}
                >
                    
                {pruebas.map(p => 
                    <Option key={p._id} value={p._id}>{p.nombre}</Option>
                )}
            </Select>
            {pruebaAgregada.formato && 
                <div className="w-full">
                    <Input 
                        defaultValue={''}
                        value={pruebaAgregada.marca} 
                        onChange={handleInputMarca} 
                        color="gray" 
                        label="Mejor Marca de Prueba*"
                        aria-labelledby="marca-prueba"
                        labelProps={{id: 'marca-prueba'}} 
                        />
                    <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal mt-2">
                        <InformationCircleIcon className="w-4 h-4 -mt-px" />
                        El formato de la marca debe ser {pruebaAgregada.formato}
                    </Typography>
                </div>
            }

            <button 
                type="button"
                aria-label='delete prueba'
                className={`absolute -right-6 top-[42%] md:-right-10 md:top-2 rounded cursor-pointer`}
                onClick={deletePrueba}
            >
                <TrashIcon strokeWidth={1} className="h-5 w-5 md:h-7 md:w-7 text-gray-700" />
            </button>
        </div>
    )
}

export default PruebaInput