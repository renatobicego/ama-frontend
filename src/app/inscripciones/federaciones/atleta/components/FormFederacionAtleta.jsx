"use client"

import { Input, Option, Select, Typography } from "@/app/utils/materialTailwind"
import { useState } from "react"
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import isError from "@/app/utils/formValidation/isErrorInput"

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

//TODO REHACER FORMULARIO CON DATOS

const FormFederacionAtleta = () => {
    
    const [data, setData] = useState({
        usuario: '',
        idpago: 'IDPAGO'
    })

    const [formErrors, setFormErrors] = useState([])


    const handleChange = (property, value) => {
        setData({...data, [property]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const {valid, errors} = registerValidate(data, passwordRepeat)
        
        if(valid){
            console.log(data);
        }else{
            setFormErrors(errors)
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
                    error={isError('nombre_apellido', formErrors)}
                    
                    value={data.nombre_apellido}
                    onChange={(e => handleChange('nombre_apellido', e.target.value))}
                    />

                <Select 
                    tabIndex={2}
                    onChange={(value) => handleChange('club', value)} 
                    defaultValue={data.club} 
                    error={isError('club', formErrors)}
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

                <div>

                    {formErrors.length > 0 && 

                        formErrors.map((error, i) => 
                            <Typography  
                                variant="small" 
                                color="gray" 
                                className="flex items-center gap-1 font-normal mt-2"
                                key={i}
                                >
                                <InformationCircleIcon className="w-4 h-4 -mt-px" />
                                {error.msg}
                            </Typography>
                            
                        )}
                </div>
            </div>
        </form>
    )
}


export default FormFederacionAtleta