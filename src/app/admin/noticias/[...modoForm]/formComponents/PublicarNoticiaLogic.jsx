import { useEffect, useState } from "react"
import PublicarNoticiaInputs from "./PublicarNoticiaInputs"
import ParrafoLogic from "../parrafos/ParrafoLogic"
import noticiaValidate from "@/app/utils/formValidation/noticiaValidation"
import axios, { AxiosError } from "axios"
import { subirArchivoFirebase } from "@/app/utils/files/archivosFirebase"
import comprimirArchivos from "@/app/utils/files/comprimirArchivos"

const subirImagenNoticia = async(parrafo) => {
    // Subir la imagen a firebase comprimida y sumarle su epigrafe si tiene
    return {
        url: await subirArchivoFirebase(await comprimirArchivos(parrafo.imagenes), 'images/noticias/'),
        epigrafe: parrafo.epigrafe ? parrafo.epigrafe : null
    }
}

const updateParrafo = async (parrafo, user) => {
    let imagen
    // Si ya tenía imagen subida, se setea el id de ImagenNoticia
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

    // No tenía una imagen subida
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

    // Acttualizar párrafo con sus nuevos datos
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

    // Para guardar datos antes de que se publica por manejo de estados de react 
    // https://react.dev/learn/state-as-a-snapshot
    useEffect(() => {
        if(shouldSubmit){
            handleSubmit()
        }
        setShouldSubmit(false)
    }, [shouldSubmit])

    useEffect(() => {
        // Obtener borrador de la noticia en caso de que el usuario salió del editor
        const localStorageKey = editando !== undefined ? 'borradorNoticiaEditando' : 'borradorNoticia';
        const localStorageParrafosKey = editando !== undefined ? 'borradorParrafosEditando' : 'borradorParrafos';
    
        const savedData = JSON.parse(localStorage.getItem(localStorageKey));
        const savedParrafos = JSON.parse(localStorage.getItem(localStorageParrafosKey));
    
        if (savedData) {
            setData(savedData);
        }
        
        if (savedParrafos) {
            setParrafos(savedParrafos);
        }
    }, [])

    useEffect(() => {
        // Setear los datos en el borrador
        if(editando === undefined){
            localStorage.setItem('borradorNoticia', JSON.stringify(data))
            localStorage.setItem('borradorParrafos', JSON.stringify(parrafos))
        }else{
            localStorage.setItem('borradorNoticiaEditando', JSON.stringify(data))
            localStorage.setItem('borradorParrafosEditando', JSON.stringify(parrafos))
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
                // Subir todos los párrafos
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
                // Errores en el fetch
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
            // Errores de validación en frontend
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