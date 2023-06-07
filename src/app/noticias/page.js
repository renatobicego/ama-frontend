
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import NewsCard from "./NewsCard/NewsCard";
import SearchSection from "./SearchSection/SearchSection";

const news = [
    {
        imgHref: '/imgs/renzo.jpg',
        date: new Date(2023, 4, 5),
        title: 'REYNAGA CERRÓ LA TEMPORADA UNIVERSITARIA CON 13:48.56 EN 5.000'
    },
    {
        imgHref: '/imgs/news.png',
        date: new Date(2023, 10, 5),
        title: 'REYNAGA CERRÓ LA TEMPORADA UNIVERSITARIA CON 13:48.56 EN 5.000'
    },
    {
        imgHref: '/imgs/erario.jpeg',
        date: new Date(2023, 9, 5),
        title: 'REYNAGA CERRÓ LA TEMPORADA UNIVERSITARIA CON 13:48.56 EN 5.000'
    },
    {
        imgHref: '/imgs/torneos1.jpg',
        date: new Date(2023, 8, 5),
        title: 'REYNAGA CERRÓ LA TEMPORADA UNIVERSITARIA CON 13:48.56 EN 5.000'
    },
    {
        imgHref: '/imgs/news.png',
        date: new Date(2023, 7, 5),
        title: 'REYNAGA CERRÓ LA TEMPORADA UNIVERSITARIA CON 13:48.56 EN 5.000'
    },
]

const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sept', 'Oct', 'Nov', 'Dic']

export default function Noticias(){
    return(
        <>
            <Header />
            <main className="pt-[17vh] lg:pt-44 2xl:pt-52 pb-20">
                <section className="size-section flex flex-col justify-between items-start gap-6 lg:gap-8 xl:mt-6">
                    <h2 className="text-title title-section">Últimas Noticias</h2>
                    <SearchSection />
                    {news.map((n, i) => <NewsCard key={i} news={n} months={months}/>)}
                    
                </section>
            </main>
            <Footer />
        </>
        
    )
}