import NewsCard from "./NewsCard"

const news = [
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
    {
        href: '/noticias/titulo_de_noticia/id',
        imgHref: '/imgs/torneos1.jpg',
        date: new Date(2023, 8, 5),
        title: 'Reynaga cerró la temporada universitaria con 13:48.56 en 5.000'
    },
    {
        href: '/noticias/titulo_de_noticia/id',
        imgHref: '/imgs/news.png',
        date: new Date(2023, 7, 5),
        title: 'Reynaga cerró la temporada universitaria con 13:48.56 en 5.000'
    },
]

const NewsSection = () => {
    return news.map((n, i) => <NewsCard key={i} news={n}/>)
}

export default NewsSection