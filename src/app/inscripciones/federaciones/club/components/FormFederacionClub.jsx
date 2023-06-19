
import { Input, Typography } from "@/app/utils/materialTailwind"
import { useState } from "react"
import inscripcionValidate from "../../../inscripcionValidation"
import { InformationCircleIcon } from "@heroicons/react/24/outline"



const FormFederacionClub = () => {
    
    const [data, setData] = useState({
        nombre: '',
        email: '',
        idpago: 'IDPAGO'
    })

    const [errorInput, setErrorInput] = useState('')
    const [errorMsg, setErrorMsg] = useState('')


    const handleChange = (property, value) => {
        setData({...data, [property]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const {inscripcion, errorKey, error} = inscripcionValidate(data)

        if(inscripcion){
            console.log(data)
        }else{
            setErrorInput(errorKey)
            setErrorMsg(error)
        }
    }


    return (
        <form className="w-full lg:w-2/3 mt-10 flex flex-col items-start gap-6" onSubmit={handleSubmit}>
            <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">
                <Input 
                    tabIndex={1}
                    color="gray" 
                    label="Nombre de Club*" 
                    error={errorInput === 'nombre' ? true : false}
                    
                    value={data.nombre}
                    onChange={(e => handleChange('nombre', e.target.value))}
                    />

                    <Input 
                        tabIndex={2}
                        type="email"
                        color="gray" 
                        label="Email*" 
                        error={errorInput === 'email' ? true : false}
                        value={data.email} 
                        onChange={(e) => handleChange('email', e.target.value)}
                    />
                
            </div>

            <div>
                <button type="submit" className="btn-primary">Inscribir Club</button>

                {errorMsg && 
                    <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal mt-2">
                        <InformationCircleIcon className="w-4 h-4 -mt-px" />
                        {errorMsg}
                    </Typography>
                }
            </div>
        </form>
    )
}


export default FormFederacionClub