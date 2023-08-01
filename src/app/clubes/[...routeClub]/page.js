"use client"
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import VolverButton from "@/app/components/button/VolverButton";
import useFetch from "@/app/utils/hooks/useFetch";
import LoadingError from "@/app/components/LoadingError";

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

            <section className="w-full 2xl:w-3/4 mx-auto flex flex-wrap lg:flex-nowrap items-center mt-6 bg-hamburguer-menu-bg rounded-2xl py-6">
                <div className="w-full md:w-auto">
                    <Image 
                        src={data.club.logoImg} 
                        className="object-contain max-h-60 w-full"
                        width={300} 
                        height={300} 
                        alt={`Logo ${data.club.nombre}`}/>
                </div>
                <div className="flex flex-col items-start justify-around ml-4 md:ml-10 xl:ml-16 my-6 lg:my-auto">
                    <h4 className="text-white font-title text-left mb-1">{data.club.ciudad}</h4>
                    <h2 className="text-white title-section text-left mb-3">{data.club.nombre}</h2>
                    <h4 className="text-white subtitle-news text-left mb-2">Contacto</h4>
                    <nav>
                        <ul className="text-white font-title text-left ">
                            {data.club.entrenadores.map((entrenador, i) => 
                                <li key={i}>
                                    {entrenador.nombre_apellido}: {entrenador.telefono}
                                </li>
                            )}
                        </ul>
                    </nav>
                    <nav className="mt-3">
                        <ul className="flex gap-3 items-center">
                            {/* Render social media link if it's defined in database 
                            (in case it doesn't have a social media account) */}
                            {
                                data.club.instagram && 
                                <Link href={data.club.instagram}>
                                    <li>
                                        <Image width={25} height={25} src={'/icons/Instagram.png'}/> 
                                    </li>
                                </Link>
                            }
                            {
                                data.club.facebook && 
                                <Link href={data.club.facebook}>
                                    <li>
                                        <Image width={25} height={25} src={'/icons/Facebook.png'}/> 
                                    </li>
                                </Link>
                            }
                            {
                                data.club.twitter && 
                                <Link href={data.club.twitter}>
                                    <li>
                                        <Image width={25} height={25} src={'/icons/Twitter.png'}/> 
                                    </li>
                                </Link>
                            }
                        </ul>
                    </nav>
                </div>
                
            </section>
        </main>
    )
}