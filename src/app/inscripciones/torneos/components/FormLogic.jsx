
import { Spinner} from "@/app/utils/materialTailwind";
import PruebasLogic from "./PruebasLogic";
import { useEffect,  useState } from "react";
import { useRegistroList } from "@/app/utils/hooks/useRegistroList";
import FormErrorMsg from "@/app/components/form/FormErrorMsg";
import FormInputs from "./FormInputs";
import axios, { AxiosError } from "axios";
import inscripcionValidate from "@/app/utils/formValidation/inscripcionValidation";


// The prop error in each input is to make borders red in case that input returns error

const FormLogicTorneo = ({data, setData, handleSubmit, usuario, formErrors, setFormErrors}) => {

    // Which pruebas user added
    const [pruebasSelected, setPruebasSelected] = useState([])
    const [shouldSubmit, setShouldSubmit] = useState(false)
    //Get pruebas favoritas
    const {entityData, loading, error} = useRegistroList(['torneo/activos', `usuarios/${usuario.uid}`]) 

    useEffect(() => {
        if(shouldSubmit){
            handleSubmit()
        }
        setShouldSubmit(false)
    }, [shouldSubmit])
    
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
    const saveDataOnSubmit = async(e) => {
        e.preventDefault()
        const {valid, errors} = inscripcionValidate(data, pruebasSelected)
        if(valid){
            try {
                const requests = pruebasSelected.map(async (prueba) => {
                    const {data} = await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/pruebas_atleta`, prueba)
                    return data.pruebaAtleta._id
                })
                const pruebasInscripto = await Promise.all(requests)
                setData(data => {
                    return {
                        ...data,
                        pruebasInscripto
                    }
                })
                setShouldSubmit(true)

            } catch (error) {
                if(error instanceof AxiosError){
                    const axiosErrors = error.response.data
                    if(axiosErrors.errors){
                        setFormErrors(axiosErrors.errors)
                    }else{
                        setFormErrors([axiosErrors])
                    }
                }else{
                    setFormErrors([{
                        msg: 'Error en el servidor'
                    }])
                }
            }
            
            
        }else{
            setFormErrors(errors)
        }
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