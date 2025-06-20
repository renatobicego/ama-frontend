import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import VolverButton from "@/app/components/button/VolverButton"
import MisAtletasInscripcionesList from "./MisAtletasInscripciones"


const MisAtletasInscripciones = async() => {
    const {user} = await getServerSession(authOptions)

    return (
        <main className="pt-[17vh] lg:pt-44 2xl:pt-52 pb-20">
            <section className="size-section flex flex-col items-start gap-4 md:gap-8 xl:mt-6">
                <VolverButton />
                <h2 className='text-title title-section'>Inscripciones de Mis Atletas</h2>

                <MisAtletasInscripcionesList usuario={user.usuario}/>
            </section>
        </main>
    )
}
export default MisAtletasInscripciones