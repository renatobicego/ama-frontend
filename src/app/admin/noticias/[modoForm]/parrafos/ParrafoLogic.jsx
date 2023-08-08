import { InformationCircleIcon, PlusIcon } from "@heroicons/react/24/outline"
import { Button, Typography } from "@/MT"
import { v4 } from "uuid"
import ParrafoInput from "./ParrafoInput"

const ParrafoLogic = ({parrafos, setParrafos, formErrors}) => {

    const handleAddParrafo = () => {
        setParrafos([
            ...parrafos, 
            {
                id: v4(),
                texto: ''
            }])
    }

    const deleteParrafo = (id) => {
        setParrafos(prevState => prevState.filter(parrafo => parrafo.id !== id))
    }

    const handleInputChange = (property, value, id) => {
        setParrafos(prevState => prevState.map(parrafo => {
            if(parrafo.id === id){
                return {
                    ...parrafo,
                    [property]: value
                }
            }
            return parrafo
        }))
    }

    return (
        <>
            {parrafos.map(parrafo => 
                <ParrafoInput 
                    key={parrafo.id}
                    deleteParrafo={deleteParrafo}
                    handleInputChange={handleInputChange}
                    parrafoAgregado={parrafo}
                    />
            )}
            <div>
                <Button
                    className="flex items-center gap-3 text-primary2 bg-secondary1 rounded-3xl"
                    color="white"
                    onClick={handleAddParrafo}
                    >
                        <PlusIcon strokeWidth={2} className="h-5 w-5" />
                        Agregar Párrafo
                </Button>
                
                {/* If user doesn't add pruebas, show error */}
                {formErrors.some(error => error.path === 'cuerpo') &&
                    <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal mt-2">
                        <InformationCircleIcon className="w-4 h-4 -mt-px" />
                        Por favor, corrija los párrafos de la noticia
                    </Typography>
                }
            </div>
            <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal mt-2">
                <InformationCircleIcon className="w-4 h-4 -mt-px" />
                El único campo obligatorio en los párrafos es el texto
            </Typography>
        </>
    )
}

export default ParrafoLogic