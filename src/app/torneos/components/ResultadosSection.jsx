"use client"
import { monthsAbbreviated } from "@/app/utils/months"
import TorneoCard from "./TorneoCard"
import { Card, Spinner } from "@/app/utils/materialTailwind"
import Paginador from "@/app/components/Paginador"
import { useState } from "react"
import useFetch from "@/app/utils/hooks/useFetch"


const ResultadosSection = () => {
    const [pagina, setPagina] = useState(1)
    const {data, loading, error} = useFetch(`torneo/?desde=${(pagina - 1) * 8}`)
    if (loading) {
        return <div className="mt-6"><Spinner color="amber" /></div>;
    }
    if (error) {
        return <h3 className="text-text font-text">Error al cargar los resultados</h3>

    }

    // Filtrar los torneos con inscripcionAbierta igual a false
    let torneosFiltrados = []
    if(data){
        torneosFiltrados = data.torneos.filter((torneo) => !torneo.inscripcionesAbiertas)

    }

    return (
        <>
            {torneosFiltrados.map((torneo, i) => !torneo.inscripcionesAbiertas &&
                <TorneoCard 
                    key={i} 
                    torneo={torneo}
                    months={monthsAbbreviated}
                    calendar={false} 
                    />)}
           
                {torneosFiltrados.length > 0 ?  
                    <Card>
                        <Paginador 
                        pagina={pagina} 
                        setPagina={setPagina} 
                        total={torneosFiltrados.length} 
                        division={8}/>
                    </Card>
                    :
                    <h3 className="text-text font-text">No hay resultados disponibles</h3>
                }
            
        </>
    )
}

export default ResultadosSection