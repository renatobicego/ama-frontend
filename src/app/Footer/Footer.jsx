import Image from 'next/image'
import NewsletterForm from './NewsletterForm'

const navFooterItems = [
    {
        text: 'Inscripción a Torneos',
        href: ''
    },
    {
        text: 'Federación AMA',
        href: ''
    },
    {
        text: 'Resultados de Torneos',
        href: ''
    },
    {
        text: 'Noticias',
        href: ''
    },
    {
        text: 'Mi Perfil',
        href: ''
    },

]

const socialMedia = [
    {
        href: '',
        logo: '/icons/Facebook.png'
    },
    {
        href: '',
        logo: '/icons/Twitter.png'
    },
    {
        href: '',
        logo: '/icons/Instagram.png'
    }
]


const Footer = () => {
    return (
        <footer className='w-full bg-primary2 text-white border-t border-title py-14'>
            <div className='size-section flex gap-8 justify-between flex-wrap'>
                <section className='flex w-full lg:w-1/2 items-center justify-between flex-wrap gap-8'>
                    <div className='flex w-full gap-[8vw] lg:w-auto'>
                        <Image src="/icons/logoSinTitulo.png" alt="" width={70} height={70} className='max-w-[15vw] lg:max-w-[5vw]'/>
                        <div className='flex items-center gap-4 lg:hidden'>
                            <Image width={50} height={50} className='max-h-[12vw] lg:max-h-[3vw]' src='/icons/mail.svg' alt="" />
                            <div className='font-normal'>
                                <h4 className='text-sm md:text-base'>Email</h4>
                                <h4 className='text-sm md:text-base'>mail@gmail.com</h4>
                            </div>
                        </div>  
                    </div>
                    <nav className='w-full lg:w-1/2'>
                        <ul className='flex flex-col justify-between items-start gap-3 font-normal'>
                            {
                                navFooterItems.map((item, i) => {
                                    return(
                                        <a href={item.href} key={i}>
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