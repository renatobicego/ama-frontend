import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import PanelAdmin from "./PanelAdmin"
import PanelEntrenador from "./PanelEntrenador"


export default async function AdminSection(){
    const {user} = await getServerSession(authOptions)
    
    if(user.usuario.role === 'ADMIN_ROLE' || user.usuario.role === 'EDITOR_ROLE'){
        return(
            <main className="pt-[17vh] lg:pt-44 2xl:pt-52 pb-20">
                <section className="size-section flex flex-col items-start gap-4 md:gap-8 xl:mt-6">
                    <PanelAdmin />
                </section>
            </main>
        )
    }else if (user.usuario.role === 'ENTRENADOR_ROLE'){
        return(
            <main className="pt-[17vh] lg:pt-44 2xl:pt-52 pb-20">
                <section className="size-section flex flex-col items-start gap-4 md:gap-8 xl:mt-6">
                    <PanelEntrenador usuario={user.usuario}/>
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
