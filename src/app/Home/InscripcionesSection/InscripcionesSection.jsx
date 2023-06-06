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
        <section className="size-section flex flex-wrap md:flex-nowrap md:justify-between gap-6 lg:gap-[3vw] items-center my-16">
            <h3 className="font-title font-semibold text-title w-52 text-2xl lg:text-3xl">
                Inscripciones Online
            </h3>
            <nav>
                <ul className="flex gap-10 2xl:gap-[3vw] flex-wrap md:justify-end">

                    {inscripcionesNav.map((navItem, i) => {
                        return(
                            <li key={i}>
                                <a className="flex items-center w-full gap-4 md:gap-4" href={navItem.href}>
                                    <Image width={100} height={100} src={navItem.logo} alt="" />
                                    <h4 className="font-title font-normal text-title w-32 text-lg lg:text-xl">
                                        {navItem.title}
                                    </h4>
                                    <button className='cursor-pointer'>
                                        <Image width={50} height={50} src='/icons/arrowRight.svg' alt="" />
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