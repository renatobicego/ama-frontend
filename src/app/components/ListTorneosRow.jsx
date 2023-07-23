import { Typography } from "@/app/utils/materialTailwind"


const ListTorneoRow = ({torneo, placeholder, urlBtn}) => {
    return (
        <tr className="even:bg-blue-gray-50/50">
            <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {torneo.nombre}
                </Typography>
            </td>
            <td className="p-4">
                <Typography 
                    as="a" 
                    href={`${urlBtn}`} 
                    variant="small" 
                    color="blue" 
                    className="font-medium">
                  {placeholder}
                </Typography>
            </td>
        </tr>
    )
}

export default ListTorneoRow

