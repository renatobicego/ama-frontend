
import { Input, Typography } from "@/app/utils/materialTailwind"
import { useState } from "react"
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import isError from "@/app/utils/formValidation/isErrorInput"



const FormFederacionClub = () => {
    
    const [data, setData] = useState({
        club: '',
        idpago: 'IDPAGO'
    })

    const [formErrors, setFormErrors] = useState([])
    // const [errorMsg, setErrorMsg] = useState('')


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
                    label="Nombre de Club*" 
                    aria-labelledby="club"
                    labelProps={{id: 'club'}}
                    error={isError('club', formErrors)}
                    
                    value={data.nombre}
                    onChange={(e => handleChange('nombre', e.target.value))}
                    />
                
            </div>

            <div>
                <button type="submit" className="btn-primary">Inscribir Club</button>

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


export default FormFederacionClub