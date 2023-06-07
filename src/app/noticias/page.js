
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import NewsCard from "./NewsCard/NewsCard";
import SearchSection from "./SearchSection/SearchSection";


export default function Noticias(){
    return(
        <>
            <Header />
            <main className="pt-[15vh] lg:pt-44 2xl:pt-52 pb-20">
                <section className="size-section flex flex-col justify-between items-start gap-8 xl:mt-6">
                    <h2 className="text-title title-section">Últimas Noticias</h2>
                    <SearchSection />
                    <NewsCard />
                </section>
            </main>
            <Footer />
        </>
        
    )
}