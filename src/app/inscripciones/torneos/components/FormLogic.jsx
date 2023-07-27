
import { Spinner} from "@/app/utils/materialTailwind";
import PruebasLogic from "./PruebasLogic";
import { useEffect,  useState } from "react";
import { useRegistroList } from "@/app/utils/hooks/useRegistroList";
import FormErrorMsg from "@/app/components/form/FormErrorMsg";
import FormInputs from "./FormInputs";


// The prop error in each input is to make borders red in case that input returns error

const FormLogicTorneo = ({data, setData, handleSubmit, formErrors, usuario}) => {

    // Which pruebas user added
    const [pruebasSelected, setPruebasSelected] = useState([])
    // status variable to update data before is send
    const [shouldSubmit, setShouldSubmit] = useState(false)

    //Get pruebas favoritas
    const {entityData, loading, error} = useRegistroList(['torneo/activos', `usuarios/${usuario.uid}`])
            
    useEffect(() => {
        //Set pruebas that user has saved as favourites
        if(Object.keys(entityData).length !== 0){
            setPruebasSelected(prevState => [
                ...prevState, 
                ...entityData[`usuarios/${usuario.uid}`].usuario.pruebasFavoritas
            ])
        }
        
        return () => {
            setPruebasSelected([])
        }
    }, [entityData])    
    
    useEffect(() => {
        if (shouldSubmit) {
            handleSubmit()
            setShouldSubmit(false);
        }
    }, [shouldSubmit]);
    
    if (loading) {
        return <div className="mt-6"><Spinner color="amber" /></div>;
    }
    if (error) {
        return <h3 className="text-text font-text">Error al cargar el formulario</h3>
    }

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
            <FormInputs 
                data={data} 
                entityData={entityData} 
                formErrors={formErrors} 
                handleChange={handleChange}
                pruebasSelected={pruebasSelected}
                setPruebasSelected={setPruebasSelected} 
                usuario={entityData[`usuarios/${usuario.uid}`].usuario}
                />

            <div>
                <button type="submit" className="btn-primary">Inscribirse</button>
                <FormErrorMsg formErrors={formErrors} />
            </div>
            
        </form>
    )
}

export default FormLogicTorneo