"use client"
import VolverButton from "@/app/components/button/VolverButton"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import FormEditarInscripcion from "./FormEditarInscripcion"
import FormErrorMsg from "@/app/components/form/FormErrorMsg"
import { useSession } from "next-auth/react"
import useFetch from "@/app/utils/hooks/useFetch"
import axios, { AxiosError } from "axios"


const EditarInscripcion = () => {

    const {data: session} = useSession()
    const router = useRouter()

    const [data, setData] = useState({})
    // Which input returned error and the message
    const [formErrors, setFormErrors] = useState([])
    const {inscripcionID} = useParams()
    const {data: inscripcionData} = useFetch(`inscripciones/${inscripcionID}`)

    const handleSubmit = async() => {
        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_URL_API}/inscripciones/${inscripcionID}`, data, {
                headers: {
                    'x-token': session.user.token 
                }
            })
            if(res.status === 200) return router.replace('/perfil')
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
    } 

    const handleDelete = async() => {
        const shouldDelete = window.confirm('¿Estás seguro de que quieres borrar el torneo?')

        if (!shouldDelete) {
            return
        }
        try {
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_URL_API}/inscripciones/${inscripcionID}`, {
                headers: {
                    'x-token': session.user.token
                  },
           })

            if(res.status === 200) return router.push('/perfil')

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
        <main className="pt-[15vh] lg:pt-44 2xl:pt-52 pb-20">
            <section className="size-section xl:mt-6">
                <VolverButton />
                <h2 className="text-title title-section text-left">Editar Inscripcion</h2>
                {(session && inscripcionData) && 
                    <FormEditarInscripcion 
                        formErrors={formErrors} 
                        usuario={session.user.usuario}
                        setFormErrors={setFormErrors}
                        inscripcionData={inscripcionData}
                        setData={setData}
                        handleSubmit={handleSubmit}
                        />
                }
                <FormErrorMsg formErrors={formErrors} />
                <button onClick={handleDelete} className="btn-primary bg-primary2 text-white mt-6">Borrar Inscripción</button>
            </section>
        </main>
    )
}

export default EditarInscripcion