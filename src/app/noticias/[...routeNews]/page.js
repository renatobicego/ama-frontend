import Image from "next/image"
import NewsCard from "../components/NewsCard/NewsCard"

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

export default function News ({params}){
    const route = params.routeNews
    return(
        <main className="pt-[17vh] lg:pt-44 2xl:pt-52 pb-20 size-section">
            <section className="flex flex-col w-full lg:w-4/5 gap-3">
                <h3 className="title-section text-left 2xl:text-4xl">
                    Reynaga cerró la temporada universitaria con 13:48.56 en 5.000
                </h3>
                <i className="text-right text-xs lg:text-sm">
                    23 de Mayo de 2023
                </i>
                <h4 className="font-medium md:text-base lg:text-lg">
                    Morem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Etiam eu turpis molestie, dictum est a, mattis tellus. 
                    Sed dignissim, metus nec fringilla accumsan.
                </h4>
                <h5 className="text-xs text-white md:text-base bg-tag-bg py-1 px-2 max-w-fit border-l-2 border-l-primary1 mb-2 font-title">
                    Categoría
                </h5>
                <Image 
                    src={"/imgs/carrousel.jpg"} 
                    width={1000} 
                    height={1000}
                    className="mt-4"
                    />
                <i className="paragraph-news">Forem ipsum dolor sit amet, consectetur adipiscing elit.</i>
            </section>
            <section className="flex flex-col w-full lg:w-4/5 gap-8 mt-8">
                <p className="paragraph-news">
                    Sorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
                    dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, 
                    risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget 
                    condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora 
                    torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim 
                    egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus 
                    nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam 
                    sit amet lacinia. Aliquam in elementum tellus.
                </p>
                <h4 className="subtitle-news md:px-4">
                    Subtitulo de Noticia
                </h4>
                <p className="paragraph-news">
                    Sorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
                    dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, 
                    risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget 
                    condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora 
                    torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim 
                    egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus 
                    nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam 
                    sit amet lacinia. Aliquam in elementum tellus.
                </p>
                <div className="flex flex-col gap-3">
                    <Image 
                        src={"/imgs/noticia2.jpg"} 
                        width={1000} 
                        height={1000}
                        className="mt-4"
                        />
                    <i className="paragraph-news">Forem ipsum dolor sit amet, consectetur adipiscing elit.</i>
                </div>
                <div className="flex gap-4 items-center">
                    <Image 
                        src={"/imgs/newsAuthor.png"} 
                        width={50} 
                        height={50}
                        className="rounded-full"
                        />
                    <i className="paragraph-news">Escrito por Miguel Leiva</i>
                </div>
            </section>
            <section className="md:w-4/5 my-16 flex flex-col gap-2">
                <h4 className="subtitle-news">
                    Noticias Recomendadas
                </h4>
                {newsRecommended.map((n, i) => <NewsCard key={i} news={n}/>)}
            </section>
        </main>
    )
}
