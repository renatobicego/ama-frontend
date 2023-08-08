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
        const fetchNoticiaData = async() => {
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/noticia`)
            console.log(data)
        }

        if(editando){
            fetchNoticiaData()
        }
    }, [editando])

    const handleSubmit = async() => {
        try {
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
            data.imgPortada = imgPortadaDb.imgPortada._id

            const res = await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/noticia`, data, {
                headers: {
                    'x-token': user.token
                  },

            })

            if(res.status === 200) {
                localStorage.removeItem('borradorNoticia')
                localStorage.removeItem('borradorParrafos')
                router.replace('/')
            }

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
            />
        <FormErrorMsg formErrors={formErrors} />
        
        </>
    )
}

export default PublicarNoticiaForm