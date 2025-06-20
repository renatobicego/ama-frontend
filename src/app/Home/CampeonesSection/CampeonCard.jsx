import Image from "next/image"
import { Typography, Card, CardBody, CardHeader} from "@/app/utils/materialTailwind"

const CampeonCard = ({campeon}) => {
    return(
        <Card className="mt-6 w-95% md:w-[45%] lg:w-[30%] overflow-hidden"  >
            <CardHeader 
                className="relative w-full m-0 rounded-none"
                floated={false}
                shadow={false}
            >
                <Image 
                    width={700} height={700} 
                    src={campeon.img} 
                    alt={`Foto de ${campeon.nombre_apellido}`} 
                    className="h-44 md:h-52 lg:h-64 object-cover"
                />
            </CardHeader>
            <CardBody>
                <Typography variant="h5" className="mb-2 text-title font-title">
                    {campeon.nombre_apellido}
                </Typography>
                <Typography className="text-title font-title">
                    {campeon.pruebasCampeon.map((prueba, i) => {
                        return prueba.nombre + ' / '
                    })}
                </Typography>
            </CardBody>
        </Card>
    )
}

export default CampeonCard