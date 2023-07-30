import { Typography } from "@/app/utils/materialTailwind"
import { ArrowDownCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline"


const ListTorneoRow = ({torneo, placeholder, urlBtn}) => {
    return (
        <tr className="even:bg-blue-gray-50/50">
            <td className="p-4 max-w-2/3">
                <Typography variant="small" color="blue-gray" className="font-normal text-ellipsis">
                    {torneo.nombre}
                </Typography>
            </td>
            <td className="p-4 ">
                <Typography 
                    as="a" 
                    href={`${urlBtn}`} 
                    variant="small" 
                    color="blue" 
                    className="font-medium hidden md:block">
                  {placeholder}
                </Typography>
                <Typography 
                    as="a" 
                    href={`${urlBtn}`} 
                    variant="small" 
                    color="blue" 
                    className="font-medium block md:hidden ml-auto">
                  {placeholder === 'Editar Torneo' ? 
                    <PencilSquareIcon strokeWidth={2} className="w-5 h-5 text-center" />
                  : 
                    <ArrowDownCircleIcon strokeWidth={2} className="w-5 h-5 ml-auto mr-auto" />
                  }
                </Typography>
            </td>
        </tr>
    )
}

export default ListTorneoRow

