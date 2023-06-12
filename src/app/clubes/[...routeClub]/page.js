"use client"
import Image from "next/image";
import {Button} from '@/app/utils/materialTailwind'
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const club = {
    name: 'ALMA',
    contacts: [
        {
            name: 'Paola Abrego',
            phoneNumber: 2615880900
        },
        {
            name: 'Manuel Aidar',
            phoneNumber: 2615150379
        }
    ],
    instagramHref: '',
    facebookHref: ''
}

export default function Club(){
    const router = useRouter()
    return(
        <main className="pt-[17vh] lg:pt-44 2xl:pt-52 pb-20 size-section ">
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
            <section className="w-4/5 mx-auto flex items-center gap-4 md:gap-8 xl:mt-6 bg-hamburguer-menu-bg">
                <Image src={"/clubes/alma.jpg"} width={400} height={400}/>
                <div className="flex flex-col items-start justify-around">
                    <h2 className="text-white title-section text-left">ALMA</h2>
                    <h4 className="text-white subtitle-news text-left">Contacto</h4>
                    <nav>
                        
                    </nav>
                </div>
                
            </section>
        </main>
    )
}