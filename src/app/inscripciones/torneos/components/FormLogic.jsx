
import { Typography } from "@/app/utils/materialTailwind";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import PruebasLogic from "./PruebasLogic";
import { Wallet, initMercadoPago } from "@mercadopago/sdk-react"
import CategoriaTorneo from "./CategoriaTorneo";
import DatosPersonales from "./DatosPersonales";
import Federacion from "./Federacion";
import { useEffect, useMemo, useState } from "react";

initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY)

// The prop error in each input is to make borders red in case that input returns error

const FormLogicTorneo = ({data, setData, handleSubmit, errorInput, errorMsg}) => {

    // Which pruebas user added
    const [pruebasSelected, setPruebasSelected] = useState([])
    // status variable to update data before is send
    const [shouldSubmit, setShouldSubmit] = useState(false)

    // To not render MP button in each render (when data is changed)
    const initializationMP = useMemo(() => { preferenceId: '<PREFERENCE_ID>' })

    useEffect(() => {
        // Set pruebas that user has saved as favourites
        if(data.pruebas.length > 0){
            setPruebasSelected(prevState => [...prevState, ...data.pruebas])
        }

        return () => {
            setPruebasSelected([])
        }
    }, [])    

    useEffect(() => {
        if (shouldSubmit) {
            handleSubmit()
            setShouldSubmit(false);
        }
      }, [shouldSubmit]);

    const handleChange = (property, value) => {
        setData({...data, [property]: value})
    }

    // Save pruebasSelecte to data before submiting
    const saveDataOnSubmit = (e) => {
        e.preventDefault()

        setData((prevData) => ({
            ...prevData,
            pruebas: pruebasSelected
        }))

        setShouldSubmit(true)
    }

    return(
        <form className="w-full lg:w-2/3 mt-10 flex flex-col items-start gap-6" onSubmit={saveDataOnSubmit}>
            {/* // Categoria and Torneo input */}
            <CategoriaTorneo 
                errorInput={errorInput} 
                data={data} 
                handleChange={handleChange} />

            {/* Name, DNI, Sexo and Fecha de Nacimiento input */}
            <DatosPersonales 
                data={data} 
                handleChange={handleChange} 
                errorInput={errorInput}
                />

            {/* Asociación, Federación, Club and Pais input */}
            <Federacion 
                data={data} 
                handleChange={handleChange} 
                errorInput={errorInput}
                />

            {/* Button to add prueba, Prueba and Marca input */}
            <PruebasLogic 
                pruebasSelected={pruebasSelected}
                setPruebasSelected={setPruebasSelected}
                errorInput={errorInput}
            />

            <div>
                {/* Checkout button */}
                <Wallet initialization={initializationMP} />    
                <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal mt-2">
                    <InformationCircleIcon className="w-4 h-4 -mt-px" />
                    Para inscribirse debe abonar la inscripción
                </Typography>
            </div>

            <div>
                <button type="submit" className="btn-primary">Inscribirse</button>

                {/* Error message shows if is returned */}
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