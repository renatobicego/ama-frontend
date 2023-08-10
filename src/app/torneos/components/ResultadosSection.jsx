"use client"
import { monthsAbbreviated } from "@/app/utils/utils"
import TorneoCard from "./TorneoCard"
import { Card, Spinner } from "@/app/utils/materialTailwind"
import Paginador from "@/app/components/Paginador"
import { useState } from "react"
import useFetch from "@/app/utils/hooks/useFetch"


const ResultadosSection = () => {
    const [pagina, setPagina] = useState(1)
    const division = 5
    const {data, loading, error} = useFetch(`torneo/resultados/?desde=${(pagina - 1) * division}&limite=${division}`)
    if (loading) {
        return <div className="mt-6"><Spinner color="amber" /></div>;
    }
    if (error) {
        return <h3 className="text-text font-text">Error al cargar los resultados</h3>

    }
   
    return (
        <>
            {data.torneos.map(torneo =>
                <TorneoCard 
                    key={torneo._id} 
                    torneo={torneo}
                    months={monthsAbbreviated}
                    calendar={false} 
                    />)}
           
                {data.total > 0 ?  
                    <Card className="w-full md:w-2/3 lg:w-1/2">
                        <Paginador 
                        pagina={pagina} 
                        setPagina={setPagina} 
                        total={data.total} 
                        division={division}/>
                    </Card>
                    :
                    <h3 className="text-text font-text">No hay resultados disponibles</h3>
                }
            
        </>
    )
}

export default ResultadosSection