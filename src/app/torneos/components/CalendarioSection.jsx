"use client"
import { monthsAbbreviated } from "@/app/utils/utils"
import TorneoCard from "./TorneoCard"
import useFetch from "@/app/utils/hooks/useFetch"
import { Spinner } from "@/app/utils/materialTailwind"


const CalendarioSection = () => {
    const {data, loading, error} = useFetch('torneo/activos')
    if (loading) {
        return <div className="mt-6"><Spinner color="amber" /></div>;
    }
    if (error) {
        return <h3 className="text-text font-text">Error al cargar los torneos</h3>

    }
    return data.total > 0 ? data.torneos.map(torneo =>  
        <TorneoCard 
            calendar={true} 
            key={torneo._id} 
            torneo={torneo} 
            months={monthsAbbreviated}
            />) 
        :
        <h3 className="text-text font-text">No hay próximos torneos</h3>
}

export default CalendarioSection