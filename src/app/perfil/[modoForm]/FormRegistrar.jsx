"use client"
import { useEffect, useState } from "react";
import FormLogicRegistrar from "./FormLogicRegistrar";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import FormErrorMsg from "@/app/components/form/FormErrorMsg";

//TODO
// ERROR DNI EXISTE
// MANEJAR MEJOR LAS PROPS
// MEJORAR ERRORES INPUT Y MSG

const FormRegistrar = ({mode, session, update}) => {
    
    // Create form data
    const [data, setData] = useState({
        nombre_apellido: '',
        dni: '',
        fecha_nacimiento: '',
        telefono: '',
        role: 'USER_ROLE',
        email: '',
        asociacion: '',
        federacion: ''
    })
    
    const [formErrors, setFormErrors] = useState([])
    const router = useRouter()


    useEffect(() => {
        const setPreviousData = () => {
            setData((prev) => {
                const newData = {
                  ...prev,
                  ...session.user.usuario,
                  fecha_nacimiento: new Date(session.user.usuario.fecha_nacimiento).toISOString().split('T')[0]
                }
          
                if (session.user.usuario.club) {
                  newData.club = session.user.usuario.club
                }
          
                return newData
              })
        }

        if(session){
            setPreviousData()
        }
    }, [session])
    
    const handleChange = (property, value) => {
        setData({...data, [property]: value})
    }
    
    const handleSubmit = async() => {  
        // create user
        try {
            let res
            if(mode === 'create'){
                await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/usuarios`, data)
                res = await signIn('credentials', {
                    email: data.email,
                    password: data.password,
                    redirect: false
                })
            }else if (mode === 'edit'){
                res = await axios.put(`${process.env.NEXT_PUBLIC_URL_API}/usuarios/${session.user.usuario.uid}`, data, {
                    headers: {
                        'x-token': session.user.token
                    }
                })
                
                await update({usuario: res.data})
            }
            if(res.status === 200) {
                
                return router.replace('/perfil')
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
    }

    return(
        <>
            <FormLogicRegistrar 
                data={data}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                formErrors={formErrors}
                setFormErrors={setFormErrors}
                mode={mode}
                />
            <FormErrorMsg formErrors={formErrors} />
        </>
            
    )
}


export default FormRegistrar