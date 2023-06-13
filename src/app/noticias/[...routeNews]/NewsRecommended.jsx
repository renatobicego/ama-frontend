import NewsCard from "../components/NewsCard"

const newsRecommended = [
    {
        href: '/noticias/titulo_de_noticia/id',
        imgHref: '/imgs/renzo.jpg',
        date: new Date(2023, 4, 5),
        title: 'Reynaga cerró la temporada universitaria con 13:48.56 en 5.000'
    },
    {
        href: '/noticias/titulo_de_noticia/id',
        imgHref: '/imgs/news.png',
        date: new Date(2023, 10, 5),
        title: 'Reynaga cerró la temporada universitaria con 13:48.56 en 5.000'
    },
    {
        href: '/noticias/titulo_de_noticia/id',
        imgHref: '/imgs/erario.jpeg',
        date: new Date(2023, 9, 5),
        title: 'Reynaga cerró la temporada universitaria con 13:48.56 en 5.000'
    },
]

const NewsRecommendend = () => {
    return (
        <section className="md:w-4/5 my-16 flex flex-col gap-2">
            <h4 className="subtitle-news">
                Noticias Recomendadas
            </h4>
            {newsRecommended.map((n, i) => <NewsCard key={i} news={n}/>)}
        </section>
    )
}

export default NewsRecommendend