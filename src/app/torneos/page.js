import SearchBar from "../components/SearchBar";
import SearchSectionResultados from "./components/SearchSectionResultados";
import TorneoCard from "./components/TorneoCard";


export default function Torneos(){
    return(
        <main className="pt-[17vh] lg:pt-44 2xl:pt-52 pb-20">
            <section className="size-section flex flex-col items-start gap-8 xl:mt-6">
                <h2 className="text-title title-section text-left">Resultados de Torneos</h2>
                <SearchSectionResultados />
                <TorneoCard />
            </section>
        </main>
    )
}