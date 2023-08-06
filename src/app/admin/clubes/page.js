"use client"
import VolverButton from "@/app/components/button/VolverButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingError from "@/app/components/LoadingError";
import ListClubes from "./ClubesList";

export default function EditarClubes(){
    const {data: session, status} = useSession()
    const router = useRouter()
    if(status === 'loading'){ 
        return (
            <main className="pt-[17vh] lg:pt-44 2xl:pt-52 pb-20">
                <section className="size-section flex flex-col items-start gap-4 md:gap-8 xl:mt-6">
                    <LoadingError loading={true} />
                </section>
            </main> 
        )
    }

    if(session.user.usuario.role === 'ADMIN_ROLE' || session.user.usuario.role === 'EDITOR_ROLE'){
        return (
            <main className="pt-[17vh] lg:pt-44 2xl:pt-52 pb-20">
                <section className="size-section flex flex-col items-start gap-4 md:gap-8 xl:mt-6">
                    <VolverButton />
                    <h2 className='text-title title-section'>Editar Clubes</h2>
                    <ListClubes />
                </section>
            </main>
        )
    }else{
        return router.replace('/')
    }
}