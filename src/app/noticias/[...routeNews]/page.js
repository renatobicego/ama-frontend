import Image from "next/image"


export default function News ({params}){
    const route = params.routeNews
    return(
        <main className="pt-[17vh] lg:pt-44 2xl:pt-52 pb-20 size-section">
            <section className="flex flex-col w-full md:w-4/5 gap-3">
                <h3 className="title-section text-left 2xl:text-4xl">
                    Reynaga cerró la temporada universitaria con 13:48.56 en 5.000
                </h3>
                <i className="text-right">
                    23 de Mayo de 2023
                </i>
                <h4 className="font-medium text-lg">
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
                <i className="md:px-4">Forem ipsum dolor sit amet, consectetur adipiscing elit.</i>
            </section>
            <section className="flex flex-col w-full md:w-4/5 gap-8 mt-8">
                <p className="font-text md:px-4">
                    Sorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, 
                    dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, 
                    risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget 
                    condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora 
                    torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim 
                    egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus 
                    nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam 
                    sit amet lacinia. Aliquam in elementum tellus.
                </p>
                <h4 className="font-semibold text-2xl md:px-4">
                    Subtitulo de Noticia
                </h4>
                <p className="font-text md:px-4">
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
                    <i className="md:px-4">Forem ipsum dolor sit amet, consectetur adipiscing elit.</i>
                </div>
            </section>
        </main>
    )
}
