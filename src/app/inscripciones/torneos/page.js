"use client"
import FormLogicTorneo from "./components/FormLogic";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/utils/materialTailwind";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import inscripcionValidate from "../inscripcionValidation";


export default function InscripcionesTorneos(){
    
    //If user logged in, fetch user data

    const [data, setData] = useState({
        torneo: '',
        categoria: '',
        nombre_apellido: '',
        dni: '',
        sexo: '',
        fecha_nacimiento: '',
        club: '',
        federacion: '',
        asociacion: '',
        pais: '',
        pruebas: [],
        idpago: 'IDPAGO'
    })
    const router = useRouter()

    const [errorInput, setErrorInput] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    const handleSubmit = () => {
        const {inscripcion, errorKey, error} = inscripcionValidate(data)

        if(inscripcion){
            console.log(data)
        }else{
            setErrorInput(errorKey)
            setErrorMsg(error)
        }
    }

    return(
        <main className="pt-[15vh] lg:pt-44 2xl:pt-52 pb-20">
            <section className="size-section xl:mt-6">
                <Button 
                    variant="text" 
                    onClick={() => router.back()}
                    size="sm"
                    color="red"
                    className="w-32 pl-2 mb-4 flex justify-start items-center gap-3 text-title"
                    >
                    <ArrowLeftIcon strokeWidth={2} className="w-5"/>
                    Volver
                </Button>
                <h2 className="text-title title-section text-left">Inscripciones a Torneos</h2>
                <FormLogicTorneo 
                    data={data} 
                    setData={setData} 
                    handleSubmit={handleSubmit}
                    errorInput={errorInput}
                    errorMsg={errorMsg}
                    />
            </section>
        </main>
    )
}