import CalendarioSection from "./components/CalendarioSection";
import ResultadosSection from "./components/ResultadosSection";

export default function Torneos(){
    return(
        <main className="pt-[17vh] lg:pt-44 2xl:pt-52 pb-20">
            <section className="size-section flex flex-col items-start gap-4 md:gap-8 xl:mt-6">
                <h2 className="text-title title-section text-left">Resultados de Torneos</h2>
                <ResultadosSection />
            </section>
            <section className="size-section flex flex-col items-start gap-4 md:gap-8 mt-10 md:mt-12 lg:mt-16">
                <h2 className="text-title title-section text-left">Próximos Torneos</h2>
                <CalendarioSection />
            </section>
        </main>
    )
}