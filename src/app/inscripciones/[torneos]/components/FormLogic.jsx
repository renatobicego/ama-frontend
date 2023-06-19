
import { Typography } from "@/app/utils/materialTailwind";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import PruebasLogic from "./PruebasLogic";
import { Wallet } from "@mercadopago/sdk-react"
import CategoriaTorneo from "./CategoriaTorneo";
import DatosPersonales from "./DatosPersonales";
import Federacion from "./Federacion";
import { useEffect, useMemo, useState } from "react";
import inscripcionValidate from "../inscripcionValidation";

const FormLogicTorneo = ({data, setData, handleSubmit}) => {

    const [pruebasSelected, setPruebasSelected] = useState([])
    const [shouldSubmit, setShouldSubmit] = useState(false)
    const [errorInput, setErrorInput] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    const initializationMP = useMemo(() => { preferenceId: '<PREFERENCE_ID>' })

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

    const saveDataOnSubmit = (e) => {
        e.preventDefault()

        setData((prevData) => ({
            ...prevData,
            pruebas: pruebasSelected
        }))

        setShouldSubmit(true)
    }

    useEffect(() => {
        if (shouldSubmit) {

            const {inscripcion, errorKey, error} = inscripcionValidate(data)

            if(inscripcion){
                handleSubmit();
            }else{
                setErrorInput(errorKey)
                setErrorMsg(error)
                console.log(errorKey)
            }
            
            setShouldSubmit(false);
        }
      }, [shouldSubmit]);
    

    //TODO validation
    return(
        <form className="w-full lg:w-2/3 mt-10 flex flex-col items-start gap-6" onSubmit={saveDataOnSubmit}>
            <CategoriaTorneo 
                errorInput={errorInput} 
                data={data} 
                handleChange={handleChange} />

            <DatosPersonales 
                data={data} 
                handleChange={handleChange} 
                errorInput={errorInput}
                />
            
            <Federacion 
                data={data} 
                handleChange={handleChange} 
                errorInput={errorInput}
                />

            <PruebasLogic 
                pruebasSelected={pruebasSelected}
                setPruebasSelected={setPruebasSelected}
                errorInput={errorInput}
            />

            <div>
                <Wallet initialization={initializationMP} />    
                <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal mt-2">
                    <InformationCircleIcon className="w-4 h-4 -mt-px" />
                    Para inscribirse debe abonar la inscripción
                </Typography>
            </div>

            <div>
                <button type="submit" className="btn-primary">Inscribirse</button>

                {errorMsg && 
                    <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal mt-2">
                        <InformationCircleIcon className="w-4 h-4 -mt-px" />
                        {errorMsg}
                    </Typography>
                }
            </div>
            
        </form>
    )
}

export default FormLogicTorneo