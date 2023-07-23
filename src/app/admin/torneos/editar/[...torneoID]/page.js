"use client"

import VolverButton from "@/app/components/button/VolverButton"
import useFetch from "@/app/utils/hooks/useFetch"
import { Spinner } from "@/app/utils/materialTailwind"
import { useParams } from "next/navigation"
import FormEditarTorneo from "./FormEditarTorneo"


const EditarTorneo = () => {
    const {torneoID} = useParams()
    const {data, loading, error} = useFetch(`torneo/${torneoID}`)
  
    return (
        <main className="pt-[17vh] lg:pt-44 2xl:pt-52 pb-20">
            <section className="size-section flex flex-col items-start gap-4 md:gap-8 xl:mt-6">
                <VolverButton />
                <h2 className='text-title title-section'>Descargar Inscripciones</h2>
                {loading && <div className="mt-6"><Spinner color="amber" /></div>}
                {error && <div>Error al cargar los torneos</div>}
                {data && <FormEditarTorneo torneo={data.torneo}/>}
            </section>
        </main>
    )
}

export default EditarTorneo