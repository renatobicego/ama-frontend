"use client"
import FormLogicTorneo from "./components/FormLogic";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import VolverButton from "@/app/components/button/VolverButton";
import inscripcionValidate from "@/app/utils/formValidation/inscripcionValidation";

export default function InscripcionesTorneos(){
    
    //If user logged in, fetch user data
    const {data: session} = useSession()

    const [data, setData] = useState({
        torneo: '',
        categoria: '',
        atleta: '',
        pruebasInscripto: [],
    })

    // Which input returned error and the message
    const [formErrors, setFormErrors] = useState([])

    useEffect(() => {
        if(session){
            setData({...data, atleta: session.user.usuario.uid})
        }
        return () => {
            setData({})
        }
    }, [session])

    useEffect(() => {
        setData({
            ...data,
            categoria: ''
        })
        return () => {
            setData({})
        }
    }, [data.torneo])

    const handleSubmit = () => {
        const {valid, errors} = inscripcionValidate(data)
        
        if(valid){
            console.log(data);
        }else{
            setFormErrors(errors)
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
                    />
                    }
            </section>
        </main>
    )
}