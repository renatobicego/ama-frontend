
import { Typography } from "@/app/utils/materialTailwind";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import PruebasLogic from "./PruebasLogic";
import CategoriaTorneo from "./CategoriaTorneo";
import DatosPersonales from "./DatosPersonales";
import Federacion from "./Federacion";
import { useEffect,  useState } from "react";


// The prop error in each input is to make borders red in case that input returns error

const FormLogicTorneo = ({data, setData, handleSubmit, formErrors}) => {

    // Which pruebas user added
    const [pruebasSelected, setPruebasSelected] = useState([])
    // status variable to update data before is send
    const [shouldSubmit, setShouldSubmit] = useState(false)


    useEffect(() => {
        // Set pruebas that user has saved as favourites
        if(data.pruebasInscripto.length > 0){
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
            pruebasInscripto: pruebasSelected
        }))

        setShouldSubmit(true)
    }

    return(
        <form className="w-full lg:w-2/3 mt-10 flex flex-col items-start gap-6" onSubmit={saveDataOnSubmit}>
            {/* // Categoria and Torneo input */}
            <CategoriaTorneo 
                formErrors={formErrors} 
                data={data} 
                handleChange={handleChange} />

            {/* Name, DNI, Sexo and Fecha de Nacimiento input */}
            <DatosPersonales 
                data={data} 
                handleChange={handleChange} 
                formErrors={formErrors}
                />

            {/* Asociación, Federación, Club and Pais input */}
            <Federacion 
                data={data} 
                handleChange={handleChange} 
                formErrors={formErrors}
                />

            {/* Button to add prueba, Prueba and Marca input */}
            <PruebasLogic 
                pruebasSelected={pruebasSelected}
                setPruebasSelected={setPruebasSelected}
                formErrors={formErrors}
            />

            <div>
                <button type="submit" className="btn-primary">Inscribirse</button>

                <div>
                    {/* Error message shows if is returned */}
                    {formErrors.length > 0 && 

                        formErrors.map((error, i) => 
                            <Typography  
                                variant="small" 
                                color="gray" 
                                className="flex items-center gap-1 font-normal mt-2"
                                key={i}
                                >
                                <InformationCircleIcon className="w-4 h-4 -mt-px" />
                                {error.msg}
                            </Typography>
                            
                        )}
                </div>

            </div>
            
        </form>
    )
}

export default FormLogicTorneo