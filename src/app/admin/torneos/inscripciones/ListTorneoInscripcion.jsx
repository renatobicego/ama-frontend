import useFetch from "@/app/utils/hooks/useFetch"
import { Button, Card, CardFooter, IconButton, Spinner, Typography } from "@/app/utils/materialTailwind"
import ListTorneoRow from "./ListTorneoRow"
import { useEffect, useState } from "react"
import Paginador from "@/app/components/Paginador"


const ListTorneosInscripcion = () => {
    const [pagina, setPagina] = useState(1)
    const {data, loading, error} = useFetch(`torneo/?desde=${(pagina - 1) * 5}`)

    if (loading) {
        return <div className="mt-6"><Spinner color="amber" /></div>;
    }
    if (error) {
        return <div>Error al cargar los torneos</div>;
    }

    return(
        <Card className="h-full w-2/3">
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                    {['Torneo', 'Inscripciones'].map((head) => (
                        <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal leading-none opacity-70"
                                >
                                {head}
                            </Typography>
                        </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.torneos.map(torneo => <ListTorneoRow torneo={torneo} key={torneo._id} />)}
                </tbody>
            </table>
            {data.total > 0 && <Paginador pagina={pagina} setPagina={setPagina} total={data.total} division={5}/>}
        </Card>
        
    )
}

export default ListTorneosInscripcion