
import Link from 'next/link';
import HamburgerMenu from './HamburgerMenu/HamburgerMenu'
import './Header.css'
import NavBarHeader from './NavBar/NavBarHeader'

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

const menuItems = [
    {
        href: '',
        text: 'Inicio',
    },    
    {
        href: '/torneos',
        text: 'Torneos',
    },
    {
        href: '/inscripciones',
        text: 'Inscripciones',
    },
    {
        href: '/noticias',
        text: 'Noticias',
    },
    {
        href: '/clubes',
        text: 'Clubes',
    },
    {
        href: '/perfil',
        text: 'Mi Perfil',
    }
]

const Header = () => {
    return(
        <header className="font-text font-medium text-white fixed z-50 w-full lg:text-sm xl:text-base">
            <section className='w-full bg-primary2 flex justify-between lg:justify-evenly py-4 pl-8 pr-6 items-center'>
                <Link href="/" smooth="true">
                    <img 
                        className='max-h-[7vh] md:max-h-[8vh] lg:max-h-[5vw] lg:pr-80 xl:pr-96 2xl:pr-80' 
                        src='/icons/logo.png'
                        alt="Logo AMA"/>
                </Link>
                <div className='hidden lg:flex items-center gap-4'>
                    <img className='max-h-[3vw] w-auto' src='/icons/mail.svg' alt="" />
                    <div className='font-normal '>
                        <h4>Email</h4>
                        <address >
                            <Link href="mailto:mail@gmail.com" target='_blank'>mail@gmail.com</Link>
                        </address>
                    </div>
                </div>
                <HamburgerMenu socialMedia={socialMedia} menuItems={menuItems}/>
            </section>
            <NavBarHeader socialMedia={socialMedia} menuItems={menuItems}/>
            
        </header>
    )
}

export default Header