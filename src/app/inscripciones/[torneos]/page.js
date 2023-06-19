"use client"
import { initMercadoPago } from "@mercadopago/sdk-react";
import FormLogicTorneo from "./components/FormLogic";
import { useState } from "react";
import { v4 } from "uuid";

initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY)

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

    const handleSubmit = () => {
        console.log(data)
    }

    return(
        <main className="pt-[17vh] lg:pt-44 2xl:pt-52 pb-20">
            <section className="size-section xl:mt-6">
                <h2 className="text-title title-section text-left">Inscripciones a Torneos</h2>
                <FormLogicTorneo data={data} setData={setData} handleSubmit={handleSubmit}/>
            </section>
        </main>
    )
}