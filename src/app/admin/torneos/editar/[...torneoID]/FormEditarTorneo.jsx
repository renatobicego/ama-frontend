import FormErrorMsg from "@/app/components/form/FormErrorMsg"
import { useSession } from "next-auth/react"
import { useState } from "react"
import FormLogicCrearTorneo from "../../crear/FormLogicCrearTorneo"


const FormEditarTorneo = ({torneo}) => {
    const [data, setData] = useState(
        {
            ...torneo, 
            fecha: new Date(torneo.fecha).toISOString().split('T')[0]
        })
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
            const res = await axios.put(`${process.env.NEXT_PUBLIC_URL_API}/torneo/${torneo._id}`, data, {
                headers: {
                    'x-token': session.user.token
                  },

            })

            const formData = new FormData()

            programaHorario && formData.append('programaHorario', programaHorario)
            resultados && formData.append('resultados', resultados)

            await axios.put(`${process.env.NEXT_PUBLIC_URL_API}/torneo/${torneo._id}`, formData, {
                headers: {
                    'x-token': session.user.token
                }
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
            <FormLogicCrearTorneo 
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