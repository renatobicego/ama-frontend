import { Card, Typography } from "@/app/utils/materialTailwind"
import Paginador from "./Paginador"
import ListTorneoRow from "./ListTorneosRow"

const ListTorneos = ({tableHead, data, pagina, setPagina, division, urlBtn, placeholder}) => {
    return (
        <Card className="h-full w-2/3">
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                    {tableHead.map((head) => (
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
                    {data.torneos.map(torneo => 
                        <ListTorneoRow 
                            torneo={torneo} 
                            key={torneo._id} 
                            urlBtn={`${urlBtn}/${torneo._id}`}
                            placeholder={placeholder}/>)}
                </tbody>
            </table>
            {data.total > 0 && 
                <Paginador 
                pagina={pagina} 
                setPagina={setPagina} 
                total={data.total} 
                division={division}
                />
                }
        </Card>
    )
}

export default ListTorneos