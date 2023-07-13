import { useState } from "react"
import { Input, Option, Select, Typography } from "@/app/utils/materialTailwind";
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import inscripcionValidate from "@/app/inscripciones/inscripcionValidation";

const FormLogicRegistrar = ({data, handleChange, handleSubmit, entityData}) => {
    const [errorInput, setErrorInput] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const { club, federaciones, asociaciones } = entityData

    const validateSubmit = (e) => {
        e.preventDefault()
        const {inscripcion, errorKey, error} = inscripcionValidate(data)
        if(inscripcion){
            handleSubmit()
        }else{
            setErrorInput(errorKey)
            setErrorMsg(error)
        }
    }

    return (
        <form className="w-full lg:w-2/3 mt-10 flex flex-col items-start gap-6" onSubmit={validateSubmit}>
            <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">
                <Input 
                    tabIndex={1}
                    color="gray" 
                    label="Nombre y Apellido*" 
                    error={errorInput === 'nombre_apellido' ? true : false}
                    
                    value={data.nombre_apellido}
                    onChange={(e => handleChange('nombre_apellido', e.target.value))}
                    />

                <Select 
                    tabIndex={2}
                    onChange={(value) => handleChange('club', value)} 
                    defaultValue={data.club} 
                    color="gray"
                    error={errorInput === 'club' ? true : false}
                    label="Club*">

                    {club.clubes.map((club, i) => 
                        <Option key={i} value={club._id}>
                            {club.nombre}
                        </Option>
                        )}

                </Select>
                

            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">

                <Input
                    tabIndex={3}
                    color="gray" 
                    label="DNI*"
                    error={errorInput === 'dni' ? true : false}
                    value={data.dni} 
                    onChange={(e) => handleChange('dni', e.target.value)} 
                    />

                <Input
                    tabIndex={4}
                    type="date"
                    color="gray" 
                    label="Fecha de Nacimiento*" 
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
                    error={errorInput === 'email' ? true : false}
                    value={data.email} 
                    onChange={(e) => handleChange('email', e.target.value)}
                    />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">
                <Select 
                    tabIndex={2}
                    onChange={(value) => handleChange('federacion', value)} 
                    defaultValue={data.federacion} 
                    color="gray"
                    error={errorInput === 'federacion' ? true : false}
                    label="Federación*">

                    {federaciones.federaciones.map((federacion, i) => 
                        <Option key={i} value={federacion._id}>
                            {federacion.nombre}
                        </Option>
                        )}

                </Select>

                <Select 
                    tabIndex={2}
                    onChange={(value) => handleChange('asociacion', value)} 
                    defaultValue={data.asociacion} 
                    color="gray"
                    error={errorInput === 'asociacion' ? true : false}
                    label="Asociación*">

                    {asociaciones.asociaciones.map((asociacion, i) => 
                        <Option key={i} value={asociacion._id}>
                            {asociacion.nombre}
                        </Option>
                        )}

                </Select>
                
            </div>

            <div>
                <button type="submit" className="btn-primary">Crear Usuario</button>

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

export default FormLogicRegistrar