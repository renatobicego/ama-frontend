import Link from "next/link";
import FormLogin from "./FormLogin";


export default function Login(){
    return(
        <main className="pt-[17vh] lg:pt-44 2xl:pt-52 pb-20 ">
             <section className="size-section xl:mt-6">
                <h2 className="text-title title-section text-left">Iniciar Sesión</h2>
                <FormLogin />
                <h5 className="mt-4">¿No tenés una cuenta? 
                    <Link className="text-light-blue-800" href={'/perfil/registrar'}> Creala acá</Link> 
                </h5>
                <p className="text-sm">Si olvidaste tu contraseña, hablar al número 2612179610</p>
             </section>
        </main>
    )
}
