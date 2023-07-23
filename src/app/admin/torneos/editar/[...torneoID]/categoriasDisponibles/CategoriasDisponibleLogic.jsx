import { Button, Typography } from "@/app/utils/materialTailwind"
import CategoriaDisponibleInput from "./CategoriaDisponibleInput"
import { InformationCircleIcon, PlusIcon } from "@heroicons/react/24/outline"

const CategoriasDisponiblesLogic = ({setData, categorias, formErrors, data}) => {

    const handleCategoriaChange = (prevValue, newValue) => {
        setData({
            ...data,
            categoriasDisponibles: data.categoriasDisponibles.map(categoria => {
                if(categoria._id === prevValue){
                    return newValue
                }else{
                    return categoria
                }
            })
        })
    }

    const handleAgregarCategoria = () => {
        setData({
            ...data,
            categoriasDisponibles: [...data.categoriasDisponibles, 'a'],
        })
    }

    const handleEliminarCategoria = (value) => {
        setData({
            ...data,
            categoriasDisponibles: data.categoriasDisponibles.filter(categoria => categoria._id !== value._id)
        })
    }

    return(
        <div className="flex flex-col w-full gap-4">
            {/* For each Categoria added, render Categoria chosen */}
            {data.categoriasDisponibles.map((categoria, i) =>
                <CategoriaDisponibleInput
                    key={i}
                    categorias={categorias}
                    categoria={categoria}
                    handleCategoriaChange={handleCategoriaChange}
                    handleEliminarCategoria={handleEliminarCategoria}
                    />)
            }
            <div>
                <Button
                    className="flex items-center gap-3 text-primary2 bg-secondary1 rounded-3xl"
                    color="white"
                    onClick={handleAgregarCategoria}
                    >
                        <PlusIcon strokeWidth={2} className="h-5 w-5" />
                        Agregar Categoria
                </Button>
                
                {/* If user doesn't add categorias, show error */}
                {formErrors.some(error => error.path === 'categoriasDisponibles') &&
                    <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal mt-2">
                        <InformationCircleIcon className="w-4 h-4 -mt-px" />
                        Por favor, seleccione las categorias disponibles del torneo
                    </Typography>
                }
            </div>
        </div>
    )
}

export default CategoriasDisponiblesLogic