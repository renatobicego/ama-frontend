
import { Typography } from "@/app/utils/materialTailwind";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import PruebasLogic from "./PruebasLogic";
import { Wallet } from "@mercadopago/sdk-react"
import CategoriaTorneo from "./CategoriaTorneo";
import DatosPersonales from "./DatosPersonales";
import Federacion from "./Federacion";
import { useEffect, useMemo, useState } from "react";

const FormLogicTorneo = ({data, setData, handleSubmit}) => {

    const [fechaNacimiento, setFechaNacimiento] = useState('')
    const [pruebasSelected, setPruebasSelected] = useState([])

    useEffect(() => {
        if(data.pruebas.length > 0){
            setPruebasSelected(prevState => [...prevState, ...data.pruebas])
        }

        return () => {
            setPruebasSelected([])
        }
    }, [])

    const handleChange = (property, value) => {
        setData({...data, [property]: value})
    }

    const initializationMP = useMemo(() => { preferenceId: '<PREFERENCE_ID>' })

    //TODO validation
    return(
        <form className="w-2/3 mt-10 flex flex-col items-start gap-6" onSubmit={handleSubmit}>
            <CategoriaTorneo data={data} handleChange={handleChange} />

            <DatosPersonales 
                data={data} 
                handleChange={handleChange} 
                fechaNacimiento={fechaNacimiento} 
                setFechaNacimiento={setFechaNacimiento}/>
            
            <Federacion data={data} handleChange={handleChange} />

            <PruebasLogic 
                data={data}
                pruebasSelected={pruebasSelected}
                setPruebasSelected={setPruebasSelected}
            />

            <Wallet initialization={initializationMP} />

            <div>
                <button type="submit" className="btn-primary opacity-50">Inscribirse</button>
                <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal mt-2">
                    <InformationCircleIcon className="w-4 h-4 -mt-px" />
                    Para inscribirse debe abonar la inscripción
                </Typography>
            </div>
            
        </form>
    )
}

export default FormLogicTorneo