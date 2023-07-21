"use client"
import { monthsAbbreviated } from "@/app/utils/months"
import TorneoCard from "../TorneoCard"
import useFetch from "@/app/utils/hooks/useFetch"
import { Spinner } from "@/app/utils/materialTailwind"

const proximosTorneosMocked = [
    {
        date: new Date(2023, 4, 2),
        title: 'Nacional de Clubes U20',
        fileHref: ''
    },
    {
        date: new Date(2023, 3, 15),
        title: 'Nacional de Clubes U20',
        fileHref: ''
    },
    {
        date: new Date(2023, 7, 30),
        title: 'Nacional de Clubes U20',
        fileHref: ''
    },
    {
        date: new Date(2023, 11, 21),
        title: 'Nacional de Clubes U20',
        fileHref: ''
    },

]

const CalendarioSection = () => {
    const {data, loading, error} = useFetch('torneo/activos')
    if (loading) {
        return <div className="mt-6"><Spinner color="amber" /></div>;
    }
    if (error) {
        return <div>Error al cargar torneos</div>;
    }
    return data.torneos.map(torneo => 
        <TorneoCard 
            calendar={true} 
            key={torneo._id} 
            torneo={torneo} 
            months={monthsAbbreviated}
            />)
}

export default CalendarioSection