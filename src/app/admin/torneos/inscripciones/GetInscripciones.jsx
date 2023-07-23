"use client"
import VolverButton from "@/app/components/button/VolverButton"
import ListTorneosInscripcion from "./ListTorneoInscripcion"


const GetInscripciones = () => {
    return(
        <>
            <VolverButton />
            <h2 className='text-title title-section'>Descargar Inscripciones</h2>
            <ListTorneosInscripcion />
        </>
    )
}

export default GetInscripciones