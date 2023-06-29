"use client"

import { Input, Option, Select, Typography } from "@/app/utils/materialTailwind"
import { useState } from "react"
import inscripcionValidate from "../../../inscripcionValidation"
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
        nombre_apellido: '',
        dni: '',
        fecha_nacimiento: '',
        club: '',
        telefono: '',
        email: '',
        password: '',
        idpago: 'IDPAGO'
    })
    const [errorInput, setErrorInput] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [passwordRepeat, setPasswordRepeat] = useState('')


    const handleChange = (property, value) => {
        setData({...data, [property]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const {inscripcion, errorKey, error} = inscripcionValidate(data)
        const {statusPassword, errorPasswordMsg} = passwordValidate(data.password, passwordRepeat)

        if(inscripcion && statusPassword){
            console.log(data)
        }else if(!inscripcion){
            setErrorInput(errorKey)
            setErrorMsg(error)
        }else if(!statusPassword){
            setErrorInput('password')
            setErrorMsg(errorPasswordMsg)
        }
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
            <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">

                <Input 
                    tabIndex={3}
                    color="gray" 
                    label="DNI*"
                    aria-labelledby="dni"
                    labelProps={{id: 'dni'}}
                    error={errorInput === 'dni' ? true : false}
                    value={data.dni} 
                    onChange={(e) => handleChange('dni', e.target.value)} 
                    />

                <Input 
                    tabIndex={4}
                    type="date"
                    color="gray" 
                    label="Fecha de Nacimiento*" 
                    aria-labelledby="fecha-nacimiento"
                    labelProps={{id: 'fecha-nacimiento'}}
                    error={errorInput === 'fecha_nacimiento' ? true : false}
                    value={data.fecha_nacimiento} 
                    onChange={(e) => handleChange('fecha_nacimiento', e.target.value)}
                    />
            </div>

            <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">

                <Input 
                    tabIndex={5}
                    color="gray" 
                    label="Teléfono*"
                    aria-labelledby="telefono"
                    labelProps={{id: 'telefono'}}
                    type="tel"
                    error={errorInput === 'telefono' ? true : false}
                    value={data.telefono} 
                    onChange={(e) => handleChange('telefono', e.target.value)} 
                    />

                <Input 
                    tabIndex={6}
                    type="email"
                    color="gray" 
                    label="Email*" 
                    aria-labelledby="email"
                    labelProps={{id: 'email'}}
                    error={errorInput === 'email' ? true : false}
                    value={data.email} 
                    onChange={(e) => handleChange('email', e.target.value)}
                    />
            </div>

            <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">

                <div className="w-full">
                    <Input 
                        tabIndex={7}
                        color="gray" 
                        label="Contraseña*"
                        aria-labelledby="password"
                        labelProps={{id: 'password'}}
                        type="password"
                        error={errorInput === 'password' ? true : false}
                        value={data.password} 
                        onChange={(e) => handleChange('password', e.target.value)} 
                        />
                    <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal mt-2">
                        <InformationCircleIcon className="w-4 h-4 -mt-px" />
                        La contraseña debe tener 8 o más caracteres
                    </Typography>

                </div>

                <Input 
                    tabIndex={8}
                    type="password"
                    color="gray" 
                    label="Repetir Contraseña*" 
                    aria-labelledby="password-check"
                    labelProps={{id: 'password-check'}}
                    error={errorInput === 'password' ? true : false}
                    value={passwordRepeat} 
                    onChange={(e) => setPasswordRepeat(e.target.value)}
                    />
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