import Image from "next/image";
import Link from "next/link";

const inscripcionesNav = [
    {
        href: '/inscripciones/torneos',
        logo: '/icons/medal.png',
        title: 'Inscripciones a Torneos'
    },
    {
        href: '/inscripciones/federaciones',
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

                    {/* Render Federación and Inscripción a Torneos links */}
                    {inscripcionesNav.map((navItem, i) => {
                        return(
                            <li className="w-full sm:w-1/2 lg:w-full" key={i}>
                                <Link className="flex justify-between items-center gap-4" href={navItem.href}>
                                    {/* Icon left */}
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
                                    {/* Arrow icon */}
                                    <button className='cursor-pointer w-1/5'>
                                        <Image 
                                            width={50} 
                                            height={50} 
                                            src='/icons/arrowRight.svg' 
                                            alt="Icono para ir a sección de inscripciones" />
                                    </button>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
            
            
        </section>
    )
}

export default InscripcionesSection