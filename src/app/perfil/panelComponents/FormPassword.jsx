"use client"

import { Input, Option, Select, Typography } from "@/app/utils/materialTailwind";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import inscripcionValidate from "../../utils/formValidation/registerValidation";
import { useSession } from "next-auth/react";
import LoadingError from "@/app/components/LoadingError";
import isError from "@/app/utils/formValidation/isErrorInput";
import FormErrorMsg from "@/app/components/form/FormErrorMsg";
import registerValidate from "../../utils/formValidation/registerValidation";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";


const FormPassword = ({user}) => {
    const router = useRouter()
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [formErrors, setFormErrors] = useState([])
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        const {valid, errors} = registerValidate({password}, repeatPassword)
    
        if(valid){
            try {
                const res = await axios.put(`${process.env.NEXT_PUBLIC_URL_API}/usuarios/password/${user.usuario.uid}`, {password})
                if(res.status === 200){
                    return router.replace('/')
                }
            } catch (error) {
                if(error instanceof AxiosError){
                    const axiosErrors = error.response.data.errors
                    setFormErrors(axiosErrors)
                }else{
                    setFormErrors([{
                        msg: error.message
                    }])
                }
            }
        }else{
            setFormErrors(errors)
        }
    }

    return(
        <form className="w-full lg:w-2/3 mt-10 flex flex-col items-start gap-6" onSubmit={handleSubmit}>
            <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">
                <Input 
                    tabIndex={1}
                    color="gray" 
                    label="Contraseña*" 
                    error={isError('password', formErrors)}
                    type="password"
                    value={password}
                    onChange={(e => setPassword(e.target.value))}
                    />
                <Input 
                    tabIndex={2}
                    color="gray" 
                    label="Repetir Contraseña*" 
                    error={isError('password', formErrors)}
                    type="password"
                    value={repeatPassword}
                    onChange={(e => setRepeatPassword(e.target.value))}
                    />         

            </div>

            <div>
                <button type="submit" className="btn-primary">Cambiar Contraseña</button>

                <FormErrorMsg formErrors={formErrors}/>
            </div>
        </form>
    )
}


export default FormPassword