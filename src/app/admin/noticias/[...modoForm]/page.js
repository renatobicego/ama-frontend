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
                            <InformationCircleIcon className="w-[10%] md:w-[5%] lg:w-[2.5%] xl:w-[2.25%] 2xl:w-[2%] -mt-px" />
                            Si vuelve, se guardará el borrador de la noticia en el dispositivo que este usando, excepto las imágenes
                        </Typography>
                        {params.modoForm[0] === 'editar' &&
                            <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal mt-2">
                                <InformationCircleIcon className="w-[22%] md:w-[11%] lg:w-[5.5%] xl:w-[3.5%] 2xl:w-[2.5%] -mt-px" />
                                Al editar, las imágenes aparecen como que no están subidas, pero si en la noticia aparecen, si lo están.
                                Si quiere cambiar una imágen directamente suba un nuevo archivo donde corresponda.
                            </Typography>
                        }
                    </div>
                    <h2 className="text-title title-section text-left">
                        {params.modoForm[0] === 'editar' ?
                            'Editar Noticia' :
                            'Escribir Noticia'
                        }
                    </h2>
                    <PublicarNoticiaForm user={user} editando={params.modoForm[1]}/>
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