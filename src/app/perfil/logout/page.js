"use client"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Logout(){
    const router = useRouter()
    const handleSubmit = async (e) => {
        e.preventDefault()
        await signOut({ callbackUrl: '/'})
    }
    return(
        <main className="pt-[15vh] lg:pt-44 2xl:pt-52 pb-20 ">
             <section className="size-section xl:mt-6">
                <form className="w-full lg:w-2/3 mt-10 flex flex-col items-start gap-6" onSubmit={handleSubmit}>
                    <button className="btn-primary" type="submit">Cerrar Sesión</button>
                </form>
             </section>
        </main>
    )
}