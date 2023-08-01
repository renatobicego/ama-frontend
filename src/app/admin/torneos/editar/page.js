"use client"
import VolverButton from "@/app/components/button/VolverButton";
import ListTorneosEditar from "./ListTorneosEditar";
import { useSession } from "next-auth/react";
import { Spinner } from "@/app/utils/materialTailwind";

export default function EditarTorneos(){
    const {data: session, status} = useSession()
   
    if(status === 'loading'){
        return (
            <main className="pt-[17vh] lg:pt-44 2xl:pt-52 pb-20">
                <section className="size-section flex flex-col items-start gap-4 md:gap-8 xl:mt-6">
                    <div className="mt-6"><Spinner color="amber" /></div>
                </section>
            </main>
            )
    }

    if(session.user.usuario.role === 'ADMIN_ROLE' || session.user.usuario.role === 'EDITOR_ROLE'){
        return (
            <main className="pt-[17vh] lg:pt-44 2xl:pt-52 pb-20">
                <section className="size-section flex flex-col items-start gap-4 md:gap-8 xl:mt-6">
                    <VolverButton />
                    <h2 className='text-title title-section'>Editar Torneos</h2>
                    <ListTorneosEditar />
                </section>
            </main>
        )
    }else{
        return(
            <main className="pt-[17vh] lg:pt-44 2xl:pt-52 pb-20">
                <section className="size-section flex flex-col items-start gap-4 md:gap-8 xl:mt-6">
                    <h4 className="text-title text-left">Acceso Denegado</h4>
                </section>
            </main>
        )
    }
}