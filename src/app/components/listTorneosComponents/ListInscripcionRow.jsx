import { Typography } from "@/app/utils/materialTailwind"
import { ArrowDownCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline"


const ListInscripcionRow = ({inscripcion}) => {
    return (
        <tr className="even:bg-blue-gray-50/50">
            <td className="p-4 max-w-2/3">
                <Typography variant="small" color="blue-gray" className="font-normal text-ellipsis">
                    {inscripcion.torneo.nombre}
                </Typography>
            </td>
            <td className="p-4 ">
                <Typography 
                    as="a" 
                    href={`/inscripciones/torneos/editar/${inscripcion._id}`} 
                    variant="small" 
                    color="blue" 
                    className="font-medium hidden md:block">
                  Editar
                </Typography>
                <Typography 
                    as="a" 
                    href={`/`} 
                    variant="small" 
                    color="blue" 
                    className="font-medium block md:hidden ml-auto">
                    <PencilSquareIcon strokeWidth={2} className="w-5 h-5 text-center" />
                </Typography>
            </td>
        </tr>
    )
}

export default ListInscripcionRow