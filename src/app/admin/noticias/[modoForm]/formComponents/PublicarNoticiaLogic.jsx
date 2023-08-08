import { useEffect, useState } from "react"
import PublicarNoticiaInputs from "./PublicarNoticiaInputs"
import ParrafoLogic from "../parrafos/ParrafoLogic"
import noticiaValidate from "@/app/utils/formValidation/noticiaValidation"
import axios, { AxiosError } from "axios"
import { subirArchivoFirebase } from "@/app/utils/files/archivosFirebase"
import comprimirArchivos from "@/app/utils/files/comprimirArchivos"

const PublicarNoticiaLogic = ({data, setData, formErrors, setFormErrors, handleSubmit, user}) => {
    const [parrafos, setParrafos] = useState([])
    const [shouldSubmit, setShouldSubmit] = useState(false)

    useEffect(() => {
        if(shouldSubmit){
            handleSubmit()
        }
        setShouldSubmit(false)
    }, [shouldSubmit])

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('borradorNoticia'))
        const savedParrafos = JSON.parse(localStorage.getItem('borradorParrafos'))

        if (savedData) {
            setData(savedData)
        }
        if(savedParrafos){
            setParrafos(savedParrafos)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('borradorNoticia', JSON.stringify(data))
        localStorage.setItem('borradorParrafos', JSON.stringify(parrafos))
    }, [data, parrafos])

    const handleChange = (property, value) => {
        setData({...data, [property]: value})
    }

    const saveParrafosValidateOnSubmit = async(e) => {
        e.preventDefault()
        const {valid, errors} = noticiaValidate(data, parrafos)
        if(valid){
            try {
                const requests = parrafos.map(async parrafo => {
                    if(parrafo.imagenes){
                        // Subir imagen del parrafo si tiene
                        const imagen = {
                            url: await subirArchivoFirebase(await comprimirArchivos(parrafo.imagenes), 'images/noticias/'),
                            epigrafe: parrafo.epigrafe ? parrafo.epigrafe : null
                        }

                        //Guardar el id de la imagenNoticia en parrafo
                        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/imagen_noticia`, imagen, {
                            headers: {
                                'x-token': user.token
                            },
                        })
                        parrafo.imagenes = data.imgPortada._id
                    }
                    // Publicar párrafo
                    const {data} = await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/parrafo_noticia`, parrafo, {
                        headers: {
                            'x-token': user.token
                        },
                    })
                    return data.parrafo._id
                })

                // Guardar id de párrafos en noticia
                const cuerpo = await Promise.all(requests)
                
                setData(data => {
                    return {
                    ...data,
                    cuerpo
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
                        msg: error.message
                    }])
                }
            }
            
        }else{
            setFormErrors(errors)
        }
    }

    return (
        <form className="w-full lg:w-2/3 mt-10 flex flex-col items-start gap-6" onSubmit={saveParrafosValidateOnSubmit}>
            <PublicarNoticiaInputs 
                data={data} 
                formErrors={formErrors} 
                handleChange={handleChange} 
                />
            <ParrafoLogic parrafos={parrafos} setParrafos={setParrafos} formErrors={formErrors}/>
            <button type="submit" className="btn-primary">Publicar Noticia</button>
        </form>
    )
}

export default PublicarNoticiaLogic