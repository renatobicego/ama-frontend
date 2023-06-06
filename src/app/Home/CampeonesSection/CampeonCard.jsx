import Image from "next/image"
import { Typography, Card, CardBody, CardHeader} from "../../utils/materialTailwind"

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
                    src={campeon.imgHref} 
                    alt={campeon.name} 
                    className="h-44 md:h-52 lg:h-64 object-cover"
                />
            </CardHeader>
            <CardBody>
                <Typography variant="h5" className="mb-2 text-title font-title">
                    {campeon.name}
                </Typography>
                <Typography className="text-title font-title">
                    {campeon.pruebas.map((prueba, i) => {
                        return prueba + '.  '
                    })}
                </Typography>
            </CardBody>
        </Card>
    )
}

export default CampeonCard