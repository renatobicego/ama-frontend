import { Card, Typography } from "@/app/utils/materialTailwind"
import ListatletaRow from "./ListAtletaRow"


const ListAtletas = ({atletas, urlBtn, placeholder, tableHead}) => {
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
                    {
                        atletas.map(atleta => 
                            <ListatletaRow
                                atleta={atleta} 
                                key={atleta._id} 
                                urlBtn={`${urlBtn}`}
                                placeholder={placeholder}/>)
                    }
                </tbody>
            </table>
        </Card>
    )
}

export default ListAtletas