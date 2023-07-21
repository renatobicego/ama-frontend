"use client" 
import { useState } from "react"
import FormLogicCrearTorneo from "./FormLogicCrearTorneo"
import VolverButton from "@/app/components/button/volverButton"
import FormErrorMsg from "@/app/components/form/FormErrorMsg"
import axios, { AxiosError } from "axios"
import { useSession } from "next-auth/react"

const FormCrearTorneo = () => {
    const {data: session} = useSession()

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
        const formData = new FormData()
        formData.append('nombre', data.nombre)
        formData.append('fecha', data.fecha)
        formData.append('lugar', data.lugar)
        formData.append('categoriasDisponibles', data.categoriasDisponibles)
        formData.append('pruebasDisponibles', data.pruebasDisponibles)
        formData.append('programaHorario', programaHorario)
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/torneo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-token': session.user.token
                  },

            })
            console.log(res)
        } catch (error) {
            if(error instanceof AxiosError){
                const axiosErrors = error.response
                console.log(axiosErrors)
                setFormErrors(axiosErrors)
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