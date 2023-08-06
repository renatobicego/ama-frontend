"use client"
import { useParams } from "next/navigation";
import FormRegistrar from "./FormRegistrar";
import { useSession } from "next-auth/react";
import LoadingError from "@/app/components/LoadingError";
import { useRouter } from "next/navigation";
import VolverButton from "@/app/components/button/VolverButton";


export default function Registrar(){
    const {modoForm} = useParams()
    const router = useRouter()

    const {data : session, status, update} = useSession()
    
    let mode = 'create'
    if (modoForm === 'editar') {
      mode = 'edit'
    }

    if(status === 'loading') {
      return (
        <main className="pt-[15vh] lg:pt-44 2xl:pt-52 pb-20 ">
          <section className="size-section xl:mt-6">
            <LoadingError loading={true}/>
          </section>
        </main>
      )
    }
    
    if(status === 'authenticated' && mode === 'create') return router.replace('/perfil/editar')

    return(
        <main className="pt-[15vh] lg:pt-44 2xl:pt-52 pb-20 ">
            <section className="size-section xl:mt-6">
              <VolverButton />
              <h2 className="text-title title-section text-left">
                {mode === 'create' ? 'Registrarse' : 'Editar Perfil'}
              </h2>
              <FormRegistrar mode={mode} session={session} update={update}/>
            </section>
        </main>
    )
}