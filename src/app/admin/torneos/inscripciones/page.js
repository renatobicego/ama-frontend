import GetInscripciones from "./GetInscripciones";

export default function InscripcionesTorneo(){
    return (
        <main className="pt-[17vh] lg:pt-44 2xl:pt-52 pb-20">
        <section className="size-section flex flex-col items-start gap-4 md:gap-8 xl:mt-6">
            <GetInscripciones />
        </section>
    </main>
    )
}