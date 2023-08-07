import Image from 'next/image'
import NewsletterForm from './NewsletterForm'
import Link from 'next/link'

const navFooterItems = [
    {
        text: 'Inscripción a Torneos',
        href: '/inscripciones/torneos'
    },
    {
        text: 'Federación AMA',
        href: '/inscripciones/federaciones'
    },
    {
        text: 'Resultados de Torneos',
        href: '/torneos'
    },
    {
        text: 'Noticias',
        href: '/noticias'
    },
    {
        text: 'Mi Perfil',
        href: '/perfil'
    },

]

const socialMedia = [
    // {
    //     href: '',
    //     logo: '/icons/Facebook.png'
    // },
    // {
    //     href: '',
    //     logo: '/icons/Twitter.png'
    // },
    {
        href: 'https://www.instagram.com/asociacionmendocinadeatletismo/',
        logo: '/icons/Instagram.png'
    }
]


const Footer = () => {
    return (
        <footer className='w-full bg-primary2 text-white border-t border-title py-14'>
            <div className='size-section flex gap-8 justify-between flex-wrap'>
                <section className='flex w-full lg:w-1/2 items-center justify-between flex-wrap gap-8'>
                    <div className='flex w-full gap-[8vw] lg:w-auto'>
                        <Image src="/icons/logoSinTitulo.png" alt="Logo AMA" width={70} height={70} className='max-w-[15vw] lg:max-w-[5vw]'/>
                        <div className='flex items-center gap-4 lg:hidden'>
                            <Image width={50} height={50} className='max-h-[12vw] lg:max-h-[3vw] w-auto' src='/icons/mail.svg' alt="" />
                            <div className='font-normal'>
                                <h4 className='text-sm md:text-base'>Email</h4>
                                <address className='text-sm md:text-base'>
                                    <Link href="mailto:mail@gmail.com">mail@gmail.com</Link>
                                </address>
                            </div>
                        </div>  
                    </div>
                    <nav className='w-full lg:w-1/2'>
                        <ul className='flex flex-col justify-between items-start gap-3 font-normal'>
                            {
                                navFooterItems.map((item, i) => {
                                    return(
                                        <a href={item.href} key={i} smooth="true">
                                            <li>{item.text}</li>
                                        </a>
                                )
                            })
                            }
                        </ul>
                    </nav>
                </section>
                
                <NewsletterForm socialMedia={socialMedia}/>
            </div>
           
        </footer>
    )
}

export default Footer