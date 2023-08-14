import { Card, Typography } from "@/app/utils/materialTailwind"
import ListAtletaRow from "./ListAtletaRow"


const ListAtletas = ({data, urlBtn, placeholder, tableHead, tipo}) => {
    console.log(data)
    return (
        <Card className="h-full w-full md:w-2/3">
            <table className="w-full table-auto text-left">
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
                <tbody className="max-w-full">
                    {tipo === 'misatletas' &&
                        data.map(atleta => 
                            <ListAtletaRow
                                atleta={atleta} 
                                key={atleta._id} 
                                urlBtn={`${urlBtn}/${atleta._id}`}
                                placeholder={placeholder}/>)
                    }
                    {tipo === 'misatletasinscripciones' &&
                        data.map(inscripcion => 
                            <ListAtletaRow
                                atleta={inscripcion.atleta} 
                                key={inscripcion._id} 
                                urlBtn={`${urlBtn}/${inscripcion._id}`}
                                placeholder={placeholder}/>)
                    }
                </tbody>
            </table>
        </Card>
    )
}

export default ListAtletas