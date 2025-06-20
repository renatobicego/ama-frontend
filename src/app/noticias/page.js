
import NewsSection from "./components/NewsSection";

export default function Noticias(){
    return(
        <>
            <main className="pt-[17vh] lg:pt-44 2xl:pt-52 pb-20">
                <section className="size-section flex flex-col justify-between items-start gap-6 lg:gap-8 xl:mt-6">
                    <h2 className="text-title title-section">Últimas Noticias</h2>
                    <NewsSection />           
                </section>
            </main>
        </>
        
    )
}