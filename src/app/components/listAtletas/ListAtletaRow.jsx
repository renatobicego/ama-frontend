import { Typography } from "@/app/utils/materialTailwind"
import { PencilSquareIcon } from "@heroicons/react/24/outline"


const ListAtletaRow = ({atleta, urlBtn, placeholder}) => {
    return (
        <tr className="even:bg-blue-gray-50/50">
            <td className="p-4 max-w-2/3">
                <Typography variant="small" color="blue-gray" className="font-normal text-ellipsis">
                    {atleta.nombre_apellido}
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
                    <PencilSquareIcon strokeWidth={2} className="w-5 h-5 text-center" />
                </Typography>
            </td>
        </tr>
    )
}

export default ListAtletaRow