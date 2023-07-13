import FormRegistrar from "./formRegistrar";


export default function Registrar(){
    return(
        <main className="pt-[15vh] lg:pt-44 2xl:pt-52 pb-20 ">
             <section className="size-section xl:mt-6">
                <h2 className="text-title title-section text-left">Registrarse</h2>
                <FormRegistrar />
             </section>
        </main>
    )
}