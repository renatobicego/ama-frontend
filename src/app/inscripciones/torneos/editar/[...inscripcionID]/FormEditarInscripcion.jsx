import useFetch from "@/app/utils/hooks/useFetch";
import { Select, Spinner } from "@/app/utils/materialTailwind";
import { useEffect, useState } from "react";
import { setFormatoMarca } from "@/app/utils/utils";
import inscripcionValidate from "@/app/utils/formValidation/inscripcionValidation";
import axios, { AxiosError } from "axios";
import PruebasLogic from "../../[[...idUsuario]]/components/PruebasLogic";
import LoadingError from "@/app/components/LoadingError";


const FormEditarInscripcion = ({formErrors, usuario, setFormErrors, inscripcionData, handleSubmit, setData}) => {

    const { data: torneoData, loading, error} = useFetch(
        `torneo/${inscripcionData.inscripcion.torneo._id}`
    )
    const [shouldSubmit, setShouldSubmit] = useState(false)
    const [pruebasSelected, setPruebasSelected] = useState([])

    useEffect(() => {
        setPruebasSelected(inscripcionData.inscripcion.pruebasInscripto.map(pruebaInscripto => {
            return {
                id: pruebaInscripto._id,
                formato: setFormatoMarca(pruebaInscripto.prueba),
                marca: pruebaInscripto.marca,
                prueba: pruebaInscripto.prueba._id,
                atleta: usuario.uid
            }
        }))
    }, [])

    useEffect(() => {
        if(shouldSubmit){
            handleSubmit()
        }
        setShouldSubmit(false)
    }, [shouldSubmit])

    const saveDataOnSubmit = async(e) => {
        e.preventDefault()
        
        const {valid, errors} = inscripcionValidate({}, pruebasSelected)
        
        if(valid){
            try {
                const requests = pruebasSelected.map(async (prueba) => {
                    if(inscripcionData.inscripcion.pruebasInscripto.some(p => p._id === prueba.id)){
                        const {data} = await axios.put(`${process.env.NEXT_PUBLIC_URL_API}/pruebas_atleta/${prueba.id}`, prueba)
                        
                        return data.pruebaAtleta._id
                    }
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


    if (loading || error) return <LoadingError loading={loading} error={error} />


    return (
        <form className="w-full lg:w-2/3 mt-10 flex flex-col items-start gap-6" onSubmit={saveDataOnSubmit}>
            <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">
                <Select 
                    value={inscripcionData.inscripcion.torneo.nombre}
                    aria-labelledby="torneo"
                    tabIndex={1}
                    color="gray" 
                    label="Torneo a Inscribirse*"
                    labelProps={{id: 'torneo'}}
                    disabled
                    >
                </Select>
                <Select 
                    tabIndex={2}
                    aria-labelledby="categoria"
                    labelProps={{id: 'categoria'}}
                    color="gray" 
                    label="Categoría*"
                    value={inscripcionData.inscripcion.categoria.nombre}
                    disabled
                    > 
                </Select>
            </div>
            <PruebasLogic 
                // Filter for categoriasDisponibles. If prueba.categorias includes categoria
                // selected, show prueba, else don't show 
                pruebas={torneoData.torneo.pruebasDisponibles.filter( p => {
                    if(!p.categorias) {
                        return p
                    }else if (p.categorias.some(c => c._id === inscripcionData.inscripcion.categoria._id)) {
                        return p
                    }})
                }
                pruebasSelected={pruebasSelected}
                setPruebasSelected={setPruebasSelected}
                formErrors={formErrors}
                usuario={usuario}
            /> 
            <button type="submit" className="btn-primary">Editar Inscripción</button>
        </form>
    )
}

export default FormEditarInscripcion