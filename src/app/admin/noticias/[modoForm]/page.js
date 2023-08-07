import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import VolverButton from "@/app/components/button/VolverButton"
import { getServerSession } from "next-auth"
import PublicarNoticiaForm from "./formComponents/PublicarNoticiaForm"

const PublicarNoticia = async({params}) => {
    const {user} = await getServerSession(authOptions)
    
    if(user.usuario.role === 'ADMIN_ROLE' || user.usuario.role === 'EDITOR_ROLE'){
        return (
            <main className="pt-[17vh] lg:pt-44 2xl:pt-52 pb-20">
                <section className="size-section flex flex-col items-start gap-4 md:gap-8 xl:mt-6">
                    <VolverButton />
                    <h2 className="text-title title-section text-left">Escribir Noticia</h2>
                    <PublicarNoticiaForm usuario={user.usuario} editando={params.modoForm[0] === 'editando'}/>
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

export default PublicarNoticia