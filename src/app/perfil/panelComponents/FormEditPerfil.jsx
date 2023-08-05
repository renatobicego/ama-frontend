"use client"

import { Input, Option, Select, Typography } from "@/app/utils/materialTailwind";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import inscripcionValidate from "../../utils/formValidation/registerValidation";
import { useSession } from "next-auth/react";
import LoadingError from "@/app/components/LoadingError";
import isError from "@/app/utils/formValidation/isErrorInput";
import FormErrorMsg from "@/app/components/form/FormErrorMsg";

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

const FormEditPerfil = () => {

    const [data, setData] = useState({})
    const [formErrors, setFormErrors] = useState([])
    const {data : session, status} = useSession()
    console.log(session)

    
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

    if(status === 'loading') return <LoadingError loading={true} />

    return(
        <form className="w-full lg:w-2/3 mt-10 flex flex-col items-start gap-6" onSubmit={handleSubmit}>
            <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">
                <Input 
                    tabIndex={1}
                    color="gray" 
                    label="Nombre y Apellido*" 
                    error={isError('nombre_apellido', formErrors)}
                    
                    value={data.nombre_apellido}
                    onChange={(e => handleChange('nombre_apellido', e.target.value))}
                    />

                <Select 
                    tabIndex={2}
                    onChange={(value) => handleChange('club', value)} 
                    defaultValue={data.club} 
                    color="gray"
                    error={isError('club', formErrors)}
                    label="Club*">

                    {clubes.map((club, i) => 
                        <Option key={i} value={club.value}>
                            {club.name}
                        </Option>
                        )}

                </Select>
                

            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">

                <Input
                    tabIndex={3}
                    color="gray" 
                    label="DNI*"
                    error={isError('dni', formErrors)}
                    value={data.dni} 
                    onChange={(e) => handleChange('dni', e.target.value)} 
                    />

                <Input
                    tabIndex={4}
                    type="date"
                    color="gray" 
                    label="Fecha de Nacimiento*" 
                    error={isError('fecha_nacimiento', formErrors)}
                    value={data.fecha_nacimiento} 
                    onChange={(e) => handleChange('fecha_nacimiento', e.target.value)}
                    />
            </div>

            <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">

                <Input 
                    tabIndex={5}
                    color="gray" 
                    label="Teléfono*"
                    type="tel"
                    error={isError('telefono', formErrors)}
                    value={data.telefono} 
                    onChange={(e) => handleChange('telefono', e.target.value)} 
                    />

                <Input 
                    tabIndex={6}
                    type="email"
                    color="gray" 
                    label="Email*" 
                    error={isError('email', formErrors)}
                    value={data.email} 
                    onChange={(e) => handleChange('email', e.target.value)}
                    />
            </div>

            <div>
                <button type="submit" className="btn-primary">Editar Perfil</button>

                <FormErrorMsg formErrors={formErrors}/>
            </div>
        </form>
    )
}


export default FormEditPerfil