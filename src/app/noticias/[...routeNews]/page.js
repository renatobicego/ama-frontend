"use client"
import Image from "next/image"
import NewsCard from "../components/NewsCard"
import { Button } from "@material-tailwind/react"
import { useRouter } from "next/navigation"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import { months } from "@/app/utils/months"
import NewsBody from "./NewsBody"

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

const newsMocked = {
    title: 'Reynaga cerró la temporada universitaria con 13:48.56 en 5.000',
    author: {
        name: 'Miguel Leiva',
        profilePictureImg: '/imgs/newsAuthor.png'
    },
    category: 'Desempeño de Atletas',
    date: new Date(2023, 1, 2),
    subtitle: `Morem ipsum dolor sit amet, consectetur adipiscing elit. 
                Etiam eu turpis molestie, dictum est a, mattis tellus. 
                Sed dignissim, metus nec fringilla accumsan.`,
    imageCover: {
        imgHref: '/imgs/carrousel.jpg',
        epigraph: 'Forem ipsum dolor sit amet, consectetur adipiscing elit.'
    },

    body: [
        {
            text: `Sorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
                    dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, 
                    risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget 
                    condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora 
                    torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim 
                    egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus 
                    nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam 
                    sit amet lacinia. Aliquam in elementum tellus.`
        },
        {
            subtitle: 'Subtitulo de Noticia',
            text: `Sorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
                    dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, 
                    risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget 
                    condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora 
                    torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim 
                    egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus 
                    nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam 
                    sit amet lacinia. Aliquam in elementum tellus.`,
            img: {
                imgHref: '/imgs/noticia2.jpg',
                epigraph: 'Forem ipsum dolor sit amet, consectetur adipiscing elit.'
            }
        }
    ]

}

export default function News ({params}){
    const route = params.routeNews
    const router = useRouter()
    return(
        <main className="pt-[17vh] md:pt-[14vh] lg:pt-44 2xl:pt-52 pb-20 size-section">
            <section className="flex flex-col w-full lg:w-4/5 gap-3">
                <Button 
                    variant="text" 
                    onClick={() => router.back()}
                    size="sm"
                    color="red"
                    className="w-32 pl-2 flex justify-start items-center gap-3 text-title"
                    >
                    <ArrowLeftIcon strokeWidth={2} className="w-5"/>
                    Volver
                </Button>
                <h3 className="title-section text-left 2xl:text-4xl">
                    {newsMocked.title}
                </h3>
                <i className="text-right text-xs lg:text-sm">
                    {newsMocked.date.getDate()} de {months[newsMocked.date.getMonth()]} de {newsMocked.date.getFullYear()}
                </i>
                <h4 className="font-medium md:text-base lg:text-lg">
                    {newsMocked.subtitle}
                </h4>
                <h5 className="text-xs text-white md:text-base bg-tag-bg py-1 px-2 max-w-fit border-l-2 border-l-primary1 mb-2 font-title">
                    {newsMocked.category}
                </h5>
                <Image 
                    src={newsMocked.imageCover.imgHref} 
                    width={1000} 
                    height={1000}
                    className="mt-4"
                    alt={`Imagen ${newsMocked.imageCover.epigraph}`}
                    />
                <i className="paragraph-news">{newsMocked.imageCover.epigraph}</i>
            </section>
            <section className="flex flex-col w-full lg:w-4/5 gap-8 mt-8">

                {newsMocked.body.map((paragraph, i) => <NewsBody paragraph={paragraph} />)}

                <div className="flex gap-4 items-center">
                    <Image 
                        src={newsMocked.author.profilePictureImg} 
                        width={50} 
                        height={50}
                        className="rounded-full"
                        />
                    <i className="paragraph-news">{newsMocked.author.name}</i>
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
