"use client"
import Image from "next/image";
import {Button} from '@/app/utils/materialTailwind'
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Link from "next/link";

const club = {
    name: 'ALMA',
    place: 'Maipú',
    contacts: [
        {
            name: 'Manuel Aidar',
            phoneNumber: 2612486182
        },
        
    ],
    instagramHref: 'https://www.instagram.com/atletismo_alma_maipu/',
    facebookHref: 'https://www.facebook.com/profile.php?id=100071862310697&mibextid=ZbWKwL',
    twitterHref: ''
}

export default function Club(){
    // For coming back button
    const router = useRouter()
    return(
        <main className="pt-[17vh] lg:pt-44 2xl:pt-52 pb-20 size-section ">
            {/* Come back button */}
            <Button 
                variant="text" 
                onClick={() => router.back()}
                size="sm"
                color="red"
                className="w-32 pl-2 flex justify-start items-center gap-3 text-title"
                >
                <ArrowLeftIcon strokeWidth={2} className="w-5"/>
                Volver
            </Button>

            <section className="w-4/5 2xl:w-3/4 mx-auto flex flex-wrap lg:flex-nowrap items-center mt-6 bg-hamburguer-menu-bg rounded-2xl">
                <Image src={"/clubes/alma.jpg"} width={300} height={300} />
                <div className="flex flex-col items-start justify-around ml-4 md:ml-10 xl:ml-16 my-6 lg:my-auto">
                    <h4 className="text-white font-title text-left mb-1">{club.place}</h4>
                    <h2 className="text-white title-section text-left mb-3">{club.name}</h2>
                    <h4 className="text-white subtitle-news text-left mb-2">Contacto</h4>
                    <nav>
                        <ul className="text-white font-title text-left ">
                            {club.contacts.map((contact, i) => 
                                <li key={i}>
                                    {contact.name}: {contact.phoneNumber}
                                </li>
                            )}
                        </ul>
                    </nav>
                    <nav className="mt-3">
                        <ul className="flex gap-3 items-center">
                            {/* Render social media link if it's defined in database 
                            (in case it doesn't have a social media account) */}
                            {
                                club.instagramHref && 
                                <Link href={club.instagramHref}>
                                    <li>
                                        <Image width={25} height={25} src={'/icons/Instagram.png'}/> 
                                    </li>
                                </Link>
                            }
                            {
                                club.facebookHref && 
                                <Link href={club.facebookHref}>
                                    <li>
                                        <Image width={25} height={25} src={'/icons/Facebook.png'}/> 
                                    </li>
                                </Link>
                            }
                            {
                                club.twitterHref && 
                                <Link href={club.twitterHref}>
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