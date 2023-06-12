import { monthsAbbreviated } from "@/app/utils/months"
import TorneoCard from "../TorneoCard"

const resultadosTorneosMocked = [
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

const ResultadosSection = () => {
    return resultadosTorneosMocked.map((torneo, i) => <TorneoCard key={i} torneo={torneo} months={monthsAbbreviated}/>)
}

export default ResultadosSection