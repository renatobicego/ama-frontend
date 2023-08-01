"use client"
import { useState } from "react";
import FormLogicRegistrar from "./FormLogicRegistrar";
import axios, { AxiosError } from "axios";
import { Typography } from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingError from "@/app/components/LoadingError";
import FormErrorMsg from "@/app/components/form/FormErrorMsg";

//TODO
// ERROR DNI EXISTE
// MANEJAR MEJOR LAS PROPS
// MEJORAR ERRORES INPUT Y MSG

const FormRegistrar = () => {

    // Create form data
    const [data, setData] = useState({
        nombre_apellido: '',
        dni: '',
        fecha_nacimiento: '',
        password:'',
        telefono: '',
        role: 'USER_ROLE',
        email: ''
    })

    const [formErrors, setFormErrors] = useState([])
    const router = useRouter()

    const {data : session, status} = useSession()

    if(status === 'loading') return <LoadingError loading={true}/>
    if(status === 'authenticated') return router.replace('/perfil')
    
    const handleChange = (property, value) => {
        setData({...data, [property]: value})
    }
    
    const handleSubmit = async() => {  
        // create user
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/usuarios`, data)
            const res = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false
            })
            if(res.ok) return router.replace('/perfil')
            

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
    }

    return(
        <>
            <FormLogicRegistrar 
                data={data}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                formErrors={formErrors}
                setFormErrors={setFormErrors}
                />
            <FormErrorMsg formErrors={formErrors} />
        </>
            
    )
}


export default FormRegistrar