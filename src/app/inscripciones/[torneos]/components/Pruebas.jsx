import { Button, Input, Option, Select } from "@/app/utils/materialTailwind"
import { PlusIcon } from "@heroicons/react/24/outline"


const Pruebas = ({data, setData}) => {
    return(
        <>
            <div className="flex w-full justify-between gap-6">
                <Select color="gray" label="Seleccionar Prueba*">
                    <Option>100m</Option>
                    <Option>200m</Option>
                    <Option>Jabalina</Option>
                </Select>
                <Input color="gray" label="Mejor Marca de Prueba*" />
            </div>
            <Button 
                className="flex items-center gap-3 text-primary2 bg-secondary1 rounded-3xl"
                color="white"
                >
                    <PlusIcon strokeWidth={2} className="h-5 w-5" />
                    Agregar Prueba
            </Button>
        </>
    )
}

export default Pruebas