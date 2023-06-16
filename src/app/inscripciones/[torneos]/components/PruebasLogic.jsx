import { Button } from "@/app/utils/materialTailwind"
import { PlusIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"
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

const PruebasLogic = ({pruebasSelected, setPruebasSelected}) => {

    const handleAdd = () => {
        setPruebasSelected(prevState => [...prevState, {
            id: uuidv4(),
            prueba: '',
            marca: ''
        }])
    }

    return(
        <>

            {pruebasSelected.map(pruebaAgregada =>
                <PruebaInput
                    key={pruebaAgregada.id}
                    pruebas={pruebas}
                    pruebaAgregada={pruebaAgregada}
                    setPruebasSelected={setPruebasSelected}
                    />)}
            <Button
                className="flex items-center gap-3 text-primary2 bg-secondary1 rounded-3xl"
                color="white"
                onClick={handleAdd}
                >
                    <PlusIcon strokeWidth={2} className="h-5 w-5" />
                    Agregar Prueba
            </Button>
        </>
    )
}

export default PruebasLogic
