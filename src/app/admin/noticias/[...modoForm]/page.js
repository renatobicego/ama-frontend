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
                        <div className="flex items-center gap-1 mt-2">
                            <InformationCircleIcon className="w-6 h-6 -mt-px" />
                            <Typography variant="small" color="gray" className="font-normal max-w-[95%] ">
                                Si vuelve, se guardará el borrador de la noticia en el dispositivo que este usando, excepto las imágenes
                            </Typography>
                        </div>
                        {params.modoForm[0] === 'editar' &&
                            <div className="flex items-center gap-1 mt-2">
                                <InformationCircleIcon className="w-6 h-6 -mt-px" />
                                <Typography variant="small" color="gray" className="font-normal max-w-[95%]">
                                    Al editar, las imágenes aparecen como que no están subidas, pero si en la noticia aparecen, si lo están.
                                    Si quiere cambiar una imagen directamente suba un nuevo archivo donde corresponda.
                                </Typography>
                            </div>
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