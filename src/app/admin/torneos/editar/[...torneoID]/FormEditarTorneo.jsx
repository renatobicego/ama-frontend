import FormErrorMsg from "@/app/components/form/FormErrorMsg"
import { useSession } from "next-auth/react"
import { useState } from "react"
import FormLogicEditarTorneo from "./FormLogicEditarTorneo"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { subirArchivoFirebase } from "@/app/utils/files/archivosFirebase"


const FormEditarTorneo = ({torneo}) => {
    const [data, setData] = useState(
        {
            nombre: torneo.nombre, 
            lugar: torneo.lugar, 
            pruebasDisponibles: torneo.pruebasDisponibles, 
            categoriasDisponibles: torneo.categoriasDisponibles, 
            inscripcionesAbiertas: torneo.inscripcionesAbiertas, 
            fecha: new Date(torneo.fecha).toISOString().split('T')[0]
        })
    const router = useRouter()

    const {data: session} = useSession()
    const [programaHorario, setProgramaHorario] = useState(null)
    const [resultados, setResultados] = useState(null)
    const [formErrors, setFormErrors] = useState([])

    const handleProgramaHorarioChange = (e) => {
        setProgramaHorario(e.target.files[0])
    }

    const handleResultadosChange = (e) => {
        setResultados(e.target.files[0])
    }

    const handleSubmit = async() => {
        try {
            if(programaHorario){
                data.programaHorario = await subirArchivoFirebase(programaHorario, 'archivos/programaHorarioTorneos/')
            }
            if(resultados){
                data.resultados = await subirArchivoFirebase(resultados, 'archivos/resultadosTorneos/')
            }
            const res = await axios.put(`${process.env.NEXT_PUBLIC_URL_API}/torneo/${torneo._id}`, data, {
                headers: {
                    'x-token': session.user.token
                  },

           })

            if(res.status === 200) return router.push('/admin/torneos/editar')

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
            <FormLogicEditarTorneo 
                    data={data}
                    setData={setData} 
                    setFormErrors={setFormErrors} 
                    handleSubmit={handleSubmit} 
                    formErrors={formErrors}
                    programaHorario={programaHorario}
                    resultados={resultados}
                    handleProgramaHorarioChange={handleProgramaHorarioChange}
                    handleResultadosChange={handleResultadosChange}
                />
            <FormErrorMsg formErrors={formErrors} />
        </>
    )
}

export default FormEditarTorneo