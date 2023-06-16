import Image from "next/image"
import NewsBody from "./NewsBody"
import NewsTitle from "./NewsTitle"
import NewsRecommendend from "./NewsRecommended"



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
    
    return(
        <main className="pt-[17vh] md:pt-[14vh] lg:pt-44 2xl:pt-52 pb-20 size-section">

            <NewsTitle newsMocked={newsMocked} />

            <section className="flex flex-col w-full lg:w-4/5 gap-8 mt-8">

                {newsMocked.body.map((paragraph, i) => <NewsBody key={i} paragraph={paragraph} />)}

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

            <NewsRecommendend />
            
        </main>
    )
}
