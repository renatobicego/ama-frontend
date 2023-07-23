import { Button, Typography } from "@/app/utils/materialTailwind"
import PruebaDisponibleInput from "./PruebaDisponibleInput"
import { InformationCircleIcon, PlusIcon } from "@heroicons/react/24/outline"

const PruebasDisponiblesLogic = ({setData, pruebas, formErrors, data}) => {

    const handlePruebaChange = (prevValue, newValue) => {
        setData({
            ...data,
            pruebasDisponibles: data.pruebasDisponibles.map(prueba => {
                if(prueba._id === prevValue){
                    return newValue
                }else{
                    return prueba
                }
            })
        })
    }

    const handleAgregarPrueba = () => {
        setData({
            ...data,
            pruebasDisponibles: [...data.pruebasDisponibles, 'a'],
        })
    }

    const handleEliminarPrueba = (value) => {
        setData({
            ...data,
            pruebasDisponibles: data.pruebasDisponibles.filter(prueba => prueba._id !== value)
        })
    }


    return(
        <div className="flex flex-col w-full gap-4">
            {/* For each prueba added, render Prueba chosen */}
            {data.pruebasDisponibles.map((prueba, i) =>
                <PruebaDisponibleInput
                    key={i}
                    pruebas={pruebas}
                    prueba={prueba}
                    handlePruebaChange={handlePruebaChange}
                    handleEliminarPrueba={handleEliminarPrueba}
                    />)
            }
            <div>
                <Button
                    className="flex items-center gap-3 text-primary2 bg-secondary1 rounded-3xl"
                    color="white"
                    onClick={handleAgregarPrueba}
                    >
                        <PlusIcon strokeWidth={2} className="h-5 w-5" />
                        Agregar Prueba
                </Button>
                
                {/* If user doesn't add pruebas, show error */}
                {formErrors.some(error => error.path === 'pruebasDisponibles') &&
                    <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal mt-2">
                        <InformationCircleIcon className="w-4 h-4 -mt-px" />
                        Por favor, seleccione las pruebas disponibles del torneo
                    </Typography>
                }
            </div>
        </div>
    )
}

export default PruebasDisponiblesLogic