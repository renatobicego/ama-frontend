"use client"
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import VolverButton from "@/app/components/button/VolverButton";
import useFetch from "@/app/utils/hooks/useFetch";
import LoadingError from "@/app/components/LoadingError";
import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from "@/app/utils/materialTailwind";

export default function Club(){
    // For coming back button
    const {routeClub} = useParams()
    
    const {data, loading, error} = useFetch(`club/${routeClub}`)
    
    if(loading || error) return (
        <main className="pt-[17vh] lg:pt-44 2xl:pt-52 pb-20 size-section ">
            <section className="size-section xl:mt-6">
                <LoadingError error={error} loading={loading}/>
            </section>
        </main>
    )

    return(
        <main className="pt-[17vh] lg:pt-44 2xl:pt-52 pb-20 size-section ">
            <VolverButton />
                <Card className="w-full max-w-[48rem] md:flex-row bg-hamburguer-menu-bg">
                    <CardHeader
                        shadow={false}
                        floated={false}
                        className="m-0 w-full md:w-2/5 shrink-0 rounded-r-none"
                    >
                        <Image 
                        src={data.club.logoImg} 
                        className="w-full h-full object-contain"
                        width={300} 
                        height={300} 
                        alt={`Logo ${data.club.nombre}`}/>
                    </CardHeader>
                    <CardBody>
                        <Typography variant="h3" className="mb-3 text-white title-section text-left">
                            {data.club.nombre}
                        </Typography>
                        <Typography variant="h6" className="mb-4 text-white font-title text-left ">
                            {data.club.ciudad}
                        </Typography>
                        {data.club.entrenadores.length > 0 && 
                            <nav>
                                <Typography variant="h5" className="mb-3 text-white title-section text-left">
                                    Contacto
                                </Typography>
                                <ul className="text-white font-title text-left ">
                                    {data.club.entrenadores && data.club.entrenadores.map((entrenador, i) => 
                                        <li key={i}>
                                            {entrenador.nombre_apellido}: {entrenador.telefono}
                                        </li>
                                    )}
                                </ul>
                            </nav>
                        }
                    </CardBody>
                    <CardFooter>
                        <nav className="mt-3">
                            <ul className="flex gap-3 items-center">
                                {/* Render social media link if it's defined in database 
                                (in case it doesn't have a social media account) */}
                                {
                                    data.club.instagram && 
                                    <Link href={data.club.instagram} target="_blank">
                                        <li>
                                            <Image width={25} height={25} src={'/icons/Instagram.png'}/> 
                                        </li>
                                    </Link>
                                }
                                {
                                    data.club.facebook && 
                                    <Link href={data.club.facebook} target="_blank">
                                        <li>
                                            <Image width={25} height={25} src={'/icons/Facebook.png'}/> 
                                        </li>
                                    </Link>
                                }
                                {
                                    data.club.twitter && 
                                    <Link href={data.club.twitter} target="_blank">
                                        <li>
                                            <Image width={25} height={25} src={'/icons/Twitter.png'}/> 
                                        </li>
                                    </Link>
                                }
                            </ul>
                        </nav>
                    </CardFooter>
                </Card>
        </main>
    )
}