"use client"
import isError from "@/app/utils/formValidation/isErrorInput"
import { Input, Typography } from "@/app/utils/materialTailwind"
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import { signIn } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"


const FormLogin = () => {
    // Create form data
    const [data, setData] = useState({
        password:'',
        email: ''
    })

    const [formErrors, setFormErrors] = useState([])
    const router = useRouter()
    const handleChange = (property, value) => {
        setData({...data, [property]: value})
    }

    const handleSubmit = async(e) => {  
        e.preventDefault()
        // create user
        
            const res = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false
            })

            if(res.error){
                const serverErrors = JSON.parse(res.error)
                // Si el middleware devuelve errores, lo hace en un array errors
                if(serverErrors.errors){
                    setFormErrors(serverErrors.errors)
                }else{
                    setFormErrors([serverErrors])
                }
            }else{

                return router.replace('/')
            }
        
            
    }

    return(
        <>
        <form className="w-full lg:w-2/3 mt-10 flex flex-col items-start gap-6" onSubmit={handleSubmit}>

            <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">

                <Input 
                    tabIndex={1}
                    type="email"
                    color="gray" 
                    label="Email*" 
                    aria-labelledby="email"
                    labelProps={{id: 'email'}}
                    error={isError('email', formErrors)}
                    value={data.email} 
                    onChange={(e) => handleChange('email', e.target.value)}
                    />
                <Input 
                    tabIndex={2}
                    color="gray" 
                    label="Contraseña*"
                    type="password"
                    aria-labelledby="password"
                    labelProps={{id: 'password'}}
                    error={isError('password', formErrors)}
                    value={data.password} 
                    onChange={(e) => handleChange('password', e.target.value)} 
                    />

            </div>
            <button type="submit" className="btn-primary">Iniciar Sesión</button>
        </form>
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
        </>
    )
}

export default FormLogin