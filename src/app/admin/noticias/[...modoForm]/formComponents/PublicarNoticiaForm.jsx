"use client"
import FormErrorMsg from "@/app/components/form/FormErrorMsg"
import PublicarNoticiaLogic from "./PublicarNoticiaLogic"
import { useEffect, useState } from "react"
import axios, { AxiosError } from "axios"
import comprimirArchivos from "@/app/utils/files/comprimirArchivos"
import { subirArchivoFirebase } from "@/app/utils/files/archivosFirebase"
import { useRouter } from "next/navigation"


const PublicarNoticiaForm = ({user, editando}) => {
    const [formErrors, setFormErrors] = useState([])
    const router = useRouter()
    const [data, setData] = useState({
        titulo: '',
        subtitulo: '',
        fecha: '',
        cuerpo: [],
        autor: user.usuario.uid,
        imgPortada: null,
        epigrafe: '',
        categoria: ''
    })

    useEffect(() =>  {
        // Si está editando, obtener los datos de la noticia
        const fetchNoticiaData = async() => {
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/noticia/${editando}`)
            const {noticia} = data
            setData(data => {
                return {
                    ...data,
                    ...noticia,
                    id: noticia._id,
                    autor: noticia.autor._id,
                    categoria: noticia.categoria._id,
                    fecha: new Date(noticia.fecha).toISOString().split('T')[0],
                    cuerpo: noticia.cuerpo.map(parrafo => parrafo._id),
                    epigrafe: noticia.imgPortada.epigrafe,
                    // Se setean estas 3 propiedades para manejar el tema de borrar y mostrar
                    // los archivos subidos junto con mensajes dando información
                    imgPortada: 'subida',
                    imgPortadaId: noticia.imgPortada._id,
                    imgPortadaUrl: noticia.imgPortada.url,
                }
            })
        }

        if(editando !== undefined){
            fetchNoticiaData()
        }
    }, [])

    const handleSubmit = async() => {
        try {
            let res
            // Si esta editando la noticia
            if(editando !== undefined){
                let imagen
                // Si usuario actualizó la imagen
                if(data.imgPortada instanceof File){
                    const url = await subirArchivoFirebase(await comprimirArchivos(data.imgPortada), 'images/noticias/')
                    imagen = {
                        url,
                        epigrafe: data.epigrafe
                    }

                //Sino solo actualizar epigrafe 
                }else{
                    imagen = {epigrafe: data.epigrafe}
                }

                const {data: imgPortadaDb} = await axios.put(
                    `${process.env.NEXT_PUBLIC_URL_API}/imagen_noticia/${data.imgPortadaId}`, 
                    imagen, 
                    {
                        headers: {
                            'x-token': user.token
                        },
                    }
                )

                // Guardar el id
                data.imgPortada = imgPortadaDb.imgNoticia._id
                data.titulo = data.titulo.trim()
                res = await axios.put(`${process.env.NEXT_PUBLIC_URL_API}/noticia/${data.id}`, data, {
                    headers: {
                        'x-token': user.token
                      },
    
                })
            
            // Publicar noticia
            }else {
                // Subir imagen de portada
                const url = await subirArchivoFirebase(await comprimirArchivos(data.imgPortada), 'images/noticias/')
                const {data: imgPortadaDb} = await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/imagen_noticia`, 
                    {
                        url,
                        epigrafe: data.epigrafe
                    }, 
                    {
                        headers: {
                            'x-token': user.token
                        },
                    }
                )
                data.imgPortada = imgPortadaDb.imgNoticia._id
                data.titulo = data.titulo.trim()
                res = await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/noticia`, data, {
                    headers: {
                        'x-token': user.token
                      },
    
                })
            }

            if(res.status === 200) {
                localStorage.removeItem('borradorNoticia')
                localStorage.removeItem('borradorParrafos')
                router.replace('/')
            }

        } catch (error) {
            // Errores de api
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
    }

    const handleDelete = async() => {
        const shouldDelete = window.confirm('¿Estás seguro de que quieres borrar la noticia?')

        if (!shouldDelete) {
            return
        }
        try {
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_URL_API}/noticia/${data.id}`, {
                headers: {
                    'x-token': user.token
                  },
           })

            if(res.status === 200) return router.push('/admin/noticias')

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
    }

    return (
        <>
        <PublicarNoticiaLogic 
            data={data} 
            setData={setData} 
            formErrors={formErrors} 
            setFormErrors={setFormErrors} 
            handleSubmit={handleSubmit}
            user={user}
            editando={editando}
            />
        <FormErrorMsg formErrors={formErrors} />
        {editando !== undefined &&
            <button onClick={handleDelete} className="btn-primary bg-primary2 text-white">Borrar Noticia</button>
        }
        </>
    )
}

export default PublicarNoticiaForm