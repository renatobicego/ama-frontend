"use client"
import FormLogicTorneo from "./components/FormLogic";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import VolverButton from "@/app/components/button/VolverButton";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export default function InscripcionesTorneos(){
    
    //If user logged in, fetch user data
    const {data: session} = useSession()
    const router = useRouter()

    const [data, setData] = useState({
        torneo: '',
        categoria: '',
        atleta: '',
        pruebasInscripto: [],
    })
    // Which input returned error and the message
    const [formErrors, setFormErrors] = useState([])

    useEffect(() => {
        if (session) {
            setData((prevData) => ({ ...prevData, atleta: session.user.usuario.uid }));
        }
    }, [session])
      
    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            categoria: ''
        }))
        setFormErrors([])
    }, [data.torneo])

    const handleSubmit = async() => {
        try {

            const res = await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/inscripciones`, data, {
                headers: {
                    'x-token': session.user.token 
                }
            })
            if(res.status === 200) return router.replace('/perfil')
        } catch (error) {
            if(error instanceof AxiosError){
                const axiosErrors = error.response.data
                if(axiosErrors.errors){
                    setFormErrors(axiosErrors.errors)
                }else{
                    setFormErrors([axiosErrors])
                }
            }else{
                setFormErrors([{
                    msg: 'Error en el servidor'
                }])
            }
        }
    }

    return(
        <main className="pt-[15vh] lg:pt-44 2xl:pt-52 pb-20">
            <section className="size-section xl:mt-6">
                <VolverButton />
                <h2 className="text-title title-section text-left">Inscripciones a Torneos</h2>
                {session && <FormLogicTorneo 
                    usuario={session.user.usuario}
                    data={data} 
                    setData={setData} 
                    handleSubmit={handleSubmit}
                    formErrors={formErrors}
                    setFormErrors={setFormErrors}
                    />
                    }
            </section>
        </main>
    )
}