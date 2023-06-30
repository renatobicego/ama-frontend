import { Button, Typography } from "@/app/utils/materialTailwind"
import { InformationCircleIcon, PlusIcon } from "@heroicons/react/24/outline"
import PruebaInput from "./PruebaInput"
import { v4 as uuidv4 } from 'uuid'

const pruebas = [
    {
        value: '100',
        name: '100m',
    },
    {
        value: '200',
        name: '200m',
    },
    {
        value: 'jabalina',
        name: 'Jabalina',
    },

]

const PruebasLogic = ({pruebasSelected, setPruebasSelected, errorInput}) => {

    // Create prueba added
    const handleAdd = () => {
        setPruebasSelected(prevState => [...prevState, {
            id: uuidv4(),
            prueba: '',
            marca: ''
        }])
    }

    return(
        <>
            {/* For each prueba added, render Prueba chosen and Marca input */}
            {pruebasSelected.map(pruebaAgregada =>
                <PruebaInput
                    key={pruebaAgregada.id}
                    pruebas={pruebas}
                    pruebaAgregada={pruebaAgregada}
                    setPruebasSelected={setPruebasSelected}
                    />)}
            <div>
                <Button
                    className="flex items-center gap-3 text-primary2 bg-secondary1 rounded-3xl"
                    color="white"
                    onClick={handleAdd}
                    >
                        <PlusIcon strokeWidth={2} className="h-5 w-5" />
                        Agregar Prueba
                </Button>
                
                {/* If user doesn't add pruebas, show error */}
                {errorInput === 'pruebas' &&
                    <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal mt-2">
                        <InformationCircleIcon className="w-4 h-4 -mt-px" />
                        Por favor, seleccione las pruebas en las que quiere competir
                    </Typography>
                }
            </div>
        </>
    )
}

export default PruebasLogic
