import { useState } from "react"
import { Input, Option, Select, Spinner, Typography } from "@/app/utils/materialTailwind";
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import registerValidate from "@/app/utils/formValidation/registerValidation";
import { useRegistroList } from "@/app/utils/hooks/useRegistroList";
import isError from "@/app/utils/formValidation/isErrorInput";



const FormLogicRegistrar = ({
    data, 
    handleChange, 
    handleSubmit, 
    setFormErrors,
    formErrors
}) => {

    const [passwordRepeat, setPasswordRepeat] = useState('')
    // Get form input for select dropdowns
    const { entityData, loading, error } = useRegistroList(['club', 'federaciones', 'asociaciones'])
    const { club, federaciones, asociaciones } = entityData

    if (loading) {
        return <div className="mt-6"><Spinner color="amber" /></div>;
    }
    if (error) {
        return <h3 className="text-text font-text">Error al cargar el formulario</h3>
    }

    const validateSubmit = (e) => {
        e.preventDefault()
        const {valid, errors} = registerValidate(data, passwordRepeat)
        
        if(valid){
            handleSubmit()
        }else{
            setFormErrors(errors)
        }
    }


    return (
        <form className="w-full lg:w-2/3 mt-10 flex flex-col items-start gap-6" onSubmit={validateSubmit}>
            <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">
                <Input 
                    tabIndex={1}
                    color="gray" 
                    label="Nombre y Apellido*" 
                    aria-labelledby="nombre"
                    labelProps={{id: 'nombre'}}
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
                    aria-labelledby="club"
                    labelProps={{id: 'club'}}
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
                    error={isError('dni', formErrors)}
                    value={data.dni} 
                    aria-labelledby="dni"
                    labelProps={{id: 'dni'}}
                    onChange={(e) => handleChange('dni', e.target.value)} 
                    />

                <Input
                    tabIndex={4}
                    type="date"
                    color="gray" 
                    label="Fecha de Nacimiento*" 
                    aria-labelledby="fecha-nacimiento"
                    labelProps={{id: 'fecha-nacimiento'}}
                    error={isError('fecha_nacimiento', formErrors)}
                    value={data.fecha_nacimiento} 
                    onChange={(e) => handleChange('fecha_nacimiento', e.target.value)}
                    />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">

                <Input
                    tabIndex={5}
                    color="gray" 
                    label="País*"
                    error={isError('pais', formErrors)}
                    value={data.pais} 
                    aria-labelledby="pais"
                    labelProps={{id: 'pais'}}
                    onChange={(e) => handleChange('pais', e.target.value)} 
                    />

                <Select 
                    tabIndex={6}
                    onChange={(value) => handleChange('sexo', value)} 
                    defaultValue={data.sexo} 
                    color="gray"
                    error={isError('sexo', formErrors)}
                    aria-labelledby="sexo"
                    labelProps={{id: 'sexo'}}
                    label="Sexo*">
                        <Option key={1} value={'M'}>
                            Masculino
                        </Option>
                        <Option key={1} value={'M'}>
                            Femenino
                        </Option>

                </Select>
            </div>

            <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">

                <Input 
                    tabIndex={7}
                    color="gray" 
                    label="Teléfono*"
                    type="tel"
                    aria-labelledby="telefono"
                    labelProps={{id: 'telefono'}}
                    error={isError('telefono', formErrors)}
                    value={data.telefono} 
                    onChange={(e) => handleChange('telefono', e.target.value)} 
                    />

                <Input 
                    tabIndex={8}
                    type="email"
                    color="gray" 
                    label="Email*" 
                    aria-labelledby="email"
                    labelProps={{id: 'email'}}
                    error={isError('email', formErrors)}
                    value={data.email} 
                    onChange={(e) => handleChange('email', e.target.value)}
                    />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">
                <Select 
                    tabIndex={9}
                    onChange={(value) => handleChange('federacion', value)} 
                    defaultValue={data.federacion} 
                    aria-labelledby="federacion"
                    labelProps={{id: 'federacion'}}
                    color="gray"
                    error={isError('federacion', formErrors)}
                    label="Federación*">

                    {federaciones.federaciones.map((federacion, i) => 
                        <Option key={i} value={federacion._id}>
                            {federacion.nombre}
                        </Option>
                        )}

                </Select>

                <Select 
                    tabIndex={10}
                    onChange={(value) => handleChange('asociacion', value)} 
                    defaultValue={data.asociacion} 
                    aria-labelledby="asociacion"
                    labelProps={{id: 'asociacion'}}
                    color="gray"
                    error={isError('asociacion', formErrors)}
                    label="Asociación*">

                    {asociaciones.asociaciones.map((asociacion, i) => 
                        <Option key={i} value={asociacion._id}>
                            {asociacion.nombre}
                        </Option>
                        )}

                </Select>
                
            </div>

            <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">

                <div className="w-full">
                    <Input 
                        tabIndex={11}
                        color="gray" 
                        label="Contraseña*"
                        aria-labelledby="password"
                        labelProps={{id: 'password'}}
                        type="password"
                        error={isError('password', formErrors)}
                        value={data.password} 
                        onChange={(e) => handleChange('password', e.target.value)} 
                        />
                    <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal mt-2">
                        <InformationCircleIcon className="w-4 h-4 -mt-px" />
                        La contraseña debe tener 8 o más caracteres
                    </Typography>

                </div>

                <Input 
                    tabIndex={12}
                    type="password"
                    color="gray" 
                    label="Repetir Contraseña*" 
                    aria-labelledby="password-check"
                    labelProps={{id: 'password-check'}}
                    error={isError('password', formErrors)}
                    value={passwordRepeat} 
                    onChange={(e) => setPasswordRepeat(e.target.value)}
                    />
            </div>
            <button type="submit" className="btn-primary">Crear Usuario</button>
            
        </form>
    )
}

export default FormLogicRegistrar