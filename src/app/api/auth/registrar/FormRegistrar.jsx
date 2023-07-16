"use client"
import { useState } from "react";
import FormLogicRegistrar from "./FormLogicRegistrar";
import axios, { AxiosError } from "axios";
import { Typography } from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

//TODO
// ERROR DNI EXISTE
// MANEJAR MEJOR LAS PROPS
// PRUEBAS FAVORITAS 
// MEJORAR ERRORES INPUT Y MSG

const FormRegistrar = () => {

    // Create form data
    const [data, setData] = useState({
        nombre_apellido: '',
        dni: '',
        fecha_nacimiento: '',
        password:'',
        club: '',
        telefono: '',
        role: 'USER_ROLE',
        email: '',
        asociacion: '',
        federacion: '',
        pruebasFavoritas: [{
            prueba: "64a42d0c0d4546fc086227b2",
            marca: "100s"
        }]
    })

    const [formErrors, setFormErrors] = useState([])
    const router = useRouter()
    
    const handleChange = (property, value) => {
        setData({...data, [property]: value})
    }
    
    const handleSubmit = async() => {  
        // create user
        try {
            const registerRes = await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/usuarios`, data)
            const res = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false
            })
            console.log(registerRes)
            console.log(res);
            if(res.ok) return router.push('/')

        } catch (error) {
            if(error instanceof AxiosError){
                const axiosErrors = error.response.data.errors
                setFormErrors(axiosErrors)
            }
            console.log(error);
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


export default FormRegistrar