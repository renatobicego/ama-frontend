import FormEditPerfil from "./FormEditPerfil";

export default function Perfil(){
    return(
        <main className="pt-[15vh] lg:pt-44 2xl:pt-52 pb-20 ">
             <section className="size-section xl:mt-6">
                <h2 className="text-title title-section text-left">Editar Perfil</h2>
                <FormEditPerfil />
             </section>
        </main>
    )
}