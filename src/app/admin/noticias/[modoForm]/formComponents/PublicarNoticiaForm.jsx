"use client"
import FormErrorMsg from "@/app/components/form/FormErrorMsg"
import PublicarNoticiaLogic from "./PublicarNoticiaLogic"
import { useState } from "react"
import axios, { AxiosError } from "axios"


const PublicarNoticiaForm = ({usuario, editando}) => {
    const [formErrors, setFormErrors] = useState([])
    const [data, setData] = useState({
        titulo: '',
        subitutlo: '',
        fecha: '',
        cuerpo: [],
        autor: usuario.uid,
        imgPortada: '',
        categoria: ''
    })

    const handleSubmit = async() => {

        // try {
        //     if(programaHorario){
        //         data.programaHorario = await subirArchivoFirebase(programaHorario, 'archivos/programaHorarioTorneos/')
        //     }
        //     const res = await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/torneo`, data, {
        //         headers: {
        //             'x-token': session.user.token
        //           },

        //     })

        //     if(res.status === 200) return router.replace('/torneos')

        // } catch (error) {
        //     if(error instanceof AxiosError){
        //         const axiosErrors = error.response.data
        //         if(axiosErrors.errors){
        //             setFormErrors(axiosErrors.errors)
        //         }else{
        //             setFormErrors([axiosErrors])
        //         }
        //     }else{
        //         setFormErrors([{
        //             msg: error.message
        //         }])
        //     }
        // }
    }
    return (
        <>
        <PublicarNoticiaLogic data={data} setData={setData} formErrors={formErrors} setFormErrors={setFormErrors}/>
        <FormErrorMsg formErrors={formErrors} />
        
        </>
    )
}

export default PublicarNoticiaForm