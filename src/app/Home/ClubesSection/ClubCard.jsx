import Image from 'next/image'
import {Card, CardBody, CardHeader, Typography} from '../../utils/materialTailwind'


const ClubCard = ({club}) => {
    return(
        <a href={club.href} className="mt-6 w-[48%] lg:w-[30%] xl:w-[24%] ">
            <Card className="overflow-hidden h-full ">
                <CardHeader 
                    className="relative w-full m-0 rounded-none"
                    floated={false}
                    shadow={false}
                >
                    <Image 
                        width={700} height={700} 
                        src={club.imgHref} 
                        alt={club.name} 
                        className="h-44 md:h-52 lg:h-64 object-contain"
                    />
                </CardHeader>
                <CardBody className="bg-hamburguer-menu-bg flex-1 p-3 md:p-6">
                    <Typography className="mb-2 text-white font-title text-base md:text-lg lg:text-xl font-medium">
                        {club.name}
                    </Typography>
                </CardBody>
            </Card> 
        </a>
    )
}

export default ClubCard