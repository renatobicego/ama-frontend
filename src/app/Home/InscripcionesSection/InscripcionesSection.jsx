import Image from "next/image";

const inscripcionesNav = [
    {
        href: '',
        logo: '/icons/medal.png',
        title: 'Inscripciones a Torneos'
    },
    {
        href: '',
        logo: '/icons/track.png',
        title: 'Federación Anual AMA'
    }
]

const InscripcionesSection = () => {
    return(
        <section className="size-section flex flex-wrap md:justify-between gap-6 lg:gap-[3vw] items-center my-16">
            <h3 className="font-title font-semibold text-title w-52 text-2xl lg:text-3xl">
                Inscripciones Online
            </h3>
            <nav>
                <ul className="flex gap-10 2xl:gap-[3vw] flex-wrap lg:flex-nowrap">

                    {inscripcionesNav.map((navItem, i) => {
                        return(
                            <li className="w-full sm:w-1/2 lg:w-full" key={i}>
                                <a className="flex justify-between items-center gap-4" href={navItem.href}>
                                    <Image 
                                        width={200} 
                                        height={200} 
                                        src={navItem.logo} 
                                        alt="Icono de inscripciones"
                                        className="max-w-[50px] h-[55px] md:max-w-[70px] md:h-[75px] object-contain border-r-2 pr-4"
                                        />
                                    <h4 className="font-title font-normal text-title text-lg lg:text-xl">
                                        {navItem.title}
                                    </h4>
                                    <button className='cursor-pointer w-1/5'>
                                        <Image 
                                            width={50} 
                                            height={50} 
                                            src='/icons/arrowRight.svg' 
                                            alt="Icono para ir a sección de inscripciones" />
                                    </button>
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </nav>
            
            
        </section>
    )
}

export default InscripcionesSection