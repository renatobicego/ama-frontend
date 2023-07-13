"use client"

import { Input, Option, Select, Typography } from "@/app/utils/materialTailwind"
import { useState } from "react"
import inscripcionValidate from "../../../../utils/formValidation/registerValidation"
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import passwordValidate from "@/app/utils/formValidation/passwordValidation"

const clubes = [
    {
        name: 'Club 1',
        value: 'club1'
    },
    {
        name: 'Club 2',
        value: 'club2'
    },

]


const FormFederacionAtleta = () => {
    
    const [data, setData] = useState({
        usuario: '',
        idpago: 'IDPAGO'
    })

    const handleChange = (property, value) => {
        setData({...data, [property]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // const {inscripcion, errorKey, error} = inscripcionValidate(data)
        // const {statusPassword, errorPasswordMsg} = passwordValidate(data.password, passwordRepeat)

        // if(inscripcion && statusPassword){
        //     console.log(data)
        // }else if(!inscripcion){
        //     setErrorInput(errorKey)
        //     setErrorMsg(error)
        // }else if(!statusPassword){
        //     setErrorInput('password')
        //     setErrorMsg(errorPasswordMsg)
        // }
    }


    return (
        <form className="w-full lg:w-2/3 mt-10 flex flex-col items-start gap-6" onSubmit={handleSubmit}>
            <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">
                <Input 
                    tabIndex={1}
                    color="gray" 
                    label="Nombre y Apellido*" 
                    aria-labelledby="nombre"
                    labelProps={{id: 'nombre'}}
                    error={errorInput === 'nombre_apellido' ? true : false}
                    
                    value={data.nombre_apellido}
                    onChange={(e => handleChange('nombre_apellido', e.target.value))}
                    />

                <Select 
                    tabIndex={2}
                    onChange={(value) => handleChange('club', value)} 
                    defaultValue={data.club} 
                    error={errorInput === 'club' ? true : false}
                    color="gray" 
                    label="Club*"
                    aria-labelledby="club"
                    labelProps={{id: 'club'}}
                    >

                    {clubes.map((club, i) => 
                        <Option key={i} value={club.value}>
                            {club.name}
                        </Option>
                        )}

                </Select>
                

            </div>
            

            <div>
                <button type="submit" className="btn-primary">Inscribirse</button>

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


export default FormFederacionAtleta