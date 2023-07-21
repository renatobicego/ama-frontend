import { monthsAbbreviated } from "@/app/utils/months"
import TorneoCard from "../TorneoCard"

const resultadosTorneosMocked = [
    {
        fecha: new Date(2023, 4, 2),
        nombre: 'Nacional de Clubes U20',
        fileHref: ''
    },
    {
        fecha: new Date(2023, 3, 15),
        nombre: 'Nacional de Clubes U20',
        fileHref: ''
    },
    {
        fecha: new Date(2023, 7, 30),
        nombre: 'Nacional de Clubes U20',
        fileHref: ''
    },
    {
        fecha: new Date(2023, 11, 21),
        nombre: 'Nacional de Clubes U20',
        fileHref: ''
    },

]

const ResultadosSection = () => {
    return resultadosTorneosMocked.map((torneo, i) => 
        <TorneoCard 
            key={i} 
            torneo={torneo}
            months={monthsAbbreviated}
            calendar={false} 
            />)
}

export default ResultadosSection