import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import MisAtletasList from "./MisAtletasList"
import VolverButton from "@/app/components/button/VolverButton"


const MisAtletas = async() => {
    const {user} = await getServerSession(authOptions)

    return (
        <main className="pt-[17vh] lg:pt-44 2xl:pt-52 pb-20">
            <section className="size-section flex flex-col items-start gap-4 md:gap-8 xl:mt-6">
                <VolverButton />
                <h2 className='text-title title-section'>Inscribir Atletas</h2>

                <MisAtletasList usuario={user.usuario}/>
            </section>
        </main>
    )
}
export default MisAtletas