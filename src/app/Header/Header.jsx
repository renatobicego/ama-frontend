
import HamburgerMenu from './HamburgerMenu/HamburgerMenu'
import './Header.css'
import NavBarHeader from './NavBar/NavBarHeader'
import Image from "next/image";

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

const Header = () => {
    return(
        <header className="font-text font-medium text-white fixed z-50 w-full lg:text-sm xl:text-base">
            <section className='w-full bg-primary2 flex justify-between lg:justify-evenly py-4 pl-8 pr-6 items-center'>
                <img 
                    className='max-h-[7vh] md:max-h-[8vh] lg:max-h-[5vw] lg:pr-80 xl:pr-96 2xl:pr-80' 
                    src='/icons/logo.png'
                    alt=""/>
                <div className='hidden lg:flex items-center gap-4'>
                    <img className='max-h-[3vw]' src='/icons/mail.svg' alt="" />
                    <div className='font-normal '>
                        <h4>Email</h4>
                        <h4>mail@gmail.com</h4>
                    </div>
                </div>
                <HamburgerMenu socialMedia={socialMedia} />
            </section>
            <NavBarHeader socialMedia={socialMedia} />
            
        </header>
    )
}

export default Header