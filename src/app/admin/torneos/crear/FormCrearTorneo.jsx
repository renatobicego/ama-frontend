"use client" 
import { useState } from "react"
import FormLogicCrearTorneo from "./FormLogicCrearTorneo"
import VolverButton from "@/app/components/button/volverButton"
import FormErrorMsg from "@/app/components/form/FormErrorMsg"
import axios, { AxiosError } from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const FormCrearTorneo = () => {
    const {data: session} = useSession()
    const router = useRouter()

    const [data, setData] = useState({
        nombre: '',
        fecha: '',
        lugar: '',
        pruebasDisponibles: [],
        categoriasDisponibles: []
    })
    const [programaHorario, setProgramaHorario] = useState(null)
    const [formErrors, setFormErrors] = useState([])

    const handleProgramaHorarioChange = (e) => {
        setProgramaHorario(e.target.files[0])
    }

    const handleSubmit = async() => {

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/torneo`, data, {
                headers: {
                    'x-token': session.user.token
                  },

            })
            const idTorneo = res.data.torneo._id
            const formData = new FormData()
            formData.append('programaHorario', programaHorario)
            await axios.put(`${process.env.NEXT_PUBLIC_URL_API}/torneo/${idTorneo}`, formData, {
                headers: {
                    'x-token': session.user.token
                  },
            })
            if(res.status === 200) return router.push('/torneos')

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
            <VolverButton />
            <h2 className='text-title title-section'>Crear Torneo</h2>
            <FormLogicCrearTorneo 
                data={data}
                setData={setData} 
                setFormErrors={setFormErrors} 
                handleSubmit={handleSubmit} 
                formErrors={formErrors}
                programaHorario={programaHorario}
                handleProgramaHorarioChange={handleProgramaHorarioChange}
            />
            <FormErrorMsg formErrors={formErrors} />
        </>
    )
}

export default FormCrearTorneo