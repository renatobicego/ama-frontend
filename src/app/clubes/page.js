import ClubesGrid from "./components/ClubesGrid";


export default function Clubes(){
    return(
        <main className="pt-[17vh] lg:pt-44 2xl:pt-52 pb-20">
            <section className="size-section flex flex-col items-start gap-4 md:gap-8 xl:mt-6">
                <h2 className="text-title title-section text-left">Clubes de Atletismo de Mendoza</h2>
                <ClubesGrid />
            </section>
        </main>
    )
}