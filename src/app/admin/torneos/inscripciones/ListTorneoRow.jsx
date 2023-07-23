import { Typography } from "@/app/utils/materialTailwind"


const ListTorneoRow = ({torneo}) => {
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
                    href={`${process.env.NEXT_PUBLIC_URL_API}/inscripciones/torneo/${torneo._id}`} 
                    variant="small" 
                    color="blue" 
                    className="font-medium">
                  Descargar Inscripciones
                </Typography>
            </td>
        </tr>
    )
}

export default ListTorneoRow