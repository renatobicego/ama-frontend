import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import VolverButton from "@/app/components/button/VolverButton"
import { getServerSession } from "next-auth"
import PublicarNoticiaForm from "./formComponents/PublicarNoticiaForm"
import { Typography } from "@/MT"
import { InformationCircleIcon } from "@heroicons/react/24/outline"

const PublicarNoticia = async({params}) => {
    const {user} = await getServerSession(authOptions)
    
    if(user.usuario.role === 'ADMIN_ROLE' || user.usuario.role === 'EDITOR_ROLE'){
        return (
            <main className="pt-[17vh] lg:pt-44 2xl:pt-52 pb-20">
                <section className="size-section flex flex-col items-start gap-4 md:gap-8 xl:mt-6">
                    <div>
                        <VolverButton/>
                        <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal mt-2">
                            <InformationCircleIcon className="w-4 h-4 -mt-px" />
                            Si vuelve, se guardará el borrador de la noticia en el dispositivo que este usando, excepto las imágenes
                        </Typography>
                    </div>
                    <h2 className="text-title title-section text-left">Escribir Noticia</h2>
                    <PublicarNoticiaForm user={user} editando={params.modoForm[0] === 'editando'}/>
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