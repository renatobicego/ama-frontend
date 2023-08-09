import { useEffect, useState } from "react"
import PublicarNoticiaInputs from "./PublicarNoticiaInputs"
import ParrafoLogic from "../parrafos/ParrafoLogic"
import noticiaValidate from "@/app/utils/formValidation/noticiaValidation"
import axios, { AxiosError } from "axios"
import { subirArchivoFirebase } from "@/app/utils/files/archivosFirebase"
import comprimirArchivos from "@/app/utils/files/comprimirArchivos"

const subirImagenNoticia = async(parrafo) => {
    return {
        url: await subirArchivoFirebase(await comprimirArchivos(parrafo.imagenes), 'images/noticias/'),
        epigrafe: parrafo.epigrafe ? parrafo.epigrafe : null
    }
}

const updateParrafo = async (parrafo, user) => {
    let imagen
    if (parrafo.imagenesId) {
        // Actualizar imagen y epigrafe si la tiene
        if(parrafo.imagenes instanceof File){
            imagen = await subirImagenNoticia(parrafo)
        // Sino solo epigrafe
        }else {
            imagen = {
                epigrafe: parrafo.epigrafe ? parrafo.epigrafe : null
            }
        }

        //Guardar el id de la imagenNoticia en parrafo
        const {data} = await axios.put(`${process.env.NEXT_PUBLIC_URL_API}/imagen_noticia/${parrafo.imagenesId}`, imagen, {
            headers: {
                'x-token': user.token
            },
        })

        parrafo.imagenes = data.imgNoticia._id

    }else if(parrafo.imagenes){
        // Subir imagen del parrafo si tiene
        imagen = await subirImagenNoticia(parrafo)


        //Guardar el id de la imagenNoticia en parrafo
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/imagen_noticia`, imagen, {
            headers: {
                'x-token': user.token
            },
        })
        parrafo.imagenes = data.imgNoticia._id
    }

    const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_URL_API}/parrafo_noticia/${parrafo.id}`,
        parrafo,
        {
        headers: {
            'x-token': user.token,
        },
        }
    )
    return data.parrafo._id;
}

const createParrafo = async (parrafo, user) => {
    if(parrafo.imagenes){
        // Subir imagen del parrafo si tiene
        const imagen = await subirImagenNoticia(parrafo)

        //Guardar el id de la imagenNoticia en parrafo
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/imagen_noticia`, imagen, {
            headers: {
                'x-token': user.token
            },
        })
        parrafo.imagenes = data.imgNoticia._id
    }
    // Publicar párrafo
    const {data} = await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/parrafo_noticia`, parrafo, {
        headers: {
            'x-token': user.token
        },
    })
    return data.parrafo._id
}

const PublicarNoticiaLogic = ({data, setData, formErrors, setFormErrors, handleSubmit, user, editando}) => {
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

        if (savedData && editando === undefined) {
            setData(savedData)
        }
        if(savedParrafos && editando === undefined){
            setParrafos(savedParrafos)
        }
    }, [])

    useEffect(() => {
        if(editando === undefined){
            localStorage.setItem('borradorNoticia', JSON.stringify(data))
            localStorage.setItem('borradorParrafos', JSON.stringify(parrafos))
        }
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
                    
                    // Si esta editando un parrafo
                    if(editando !== undefined && data.cuerpo.includes(parrafo.id)){
                        return await updateParrafo(parrafo, user)
                    //Publicar parrafo nuevo
                    }else{
                        return await createParrafo(parrafo, user)
                    }
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
                console.log(error)
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
        <form className="w-full lg:w-2/3 mt-3 flex flex-col items-start gap-6" onSubmit={saveParrafosValidateOnSubmit}>
            <PublicarNoticiaInputs 
                data={data} 
                formErrors={formErrors} 
                handleChange={handleChange} 
                />
            <ParrafoLogic 
                parrafos={parrafos} 
                setParrafos={setParrafos} 
                formErrors={formErrors} 
                editando={editando}
                cuerpo={data.cuerpo}
                user={user}
                />
            <button type="submit" className="btn-primary">
                {editando !== undefined ?
                    'Editar Noticia' :
                    'Publicar Noticia'
                }
            </button>
        </form>
    )
}

export default PublicarNoticiaLogic