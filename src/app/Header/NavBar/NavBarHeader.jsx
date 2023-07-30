/* eslint-disable react/prop-types */
"use client"
import useScrollDirection from "@/app/utils/hooks/useScrollDirection"
import Link from "next/link"
import { usePathname } from 'next/navigation'


const NavBarHeader = ({socialMedia, menuItems}) => {
    // Scroll down/up animation of navbar
    const scrollDirection = useScrollDirection()

    // In case pathname is '/', set to '' to be equall to Inicio href 
    let pathname = usePathname()
    if(pathname === "/"){
        pathname = ""
    }

    // Filter to not have Inscripciones item (that item is for mobile, on desktop is a button with Inscripciones)
    const navBarItems = menuItems.filter(item => item.text !== 'Inscripciones')

    // Select that item to render a button on desktop, instead of menu item (see HamburgerMenu)
    const inscripcionesItem = menuItems.find(item => item.text === 'Inscripciones')

    return(
        <section 
            className={`hidden lg:block bg-tag-bg list-none w-full relative -z-10 
                        ${ scrollDirection === "down" ? "-top-24" : "top-0"} 
                        transition-all duration-500`}>
                            
            <div className='size-section flex justify-between items-center'>
                <nav id='nav-header-site' >
                    <ul className='flex justify-evenly'>
                        {navBarItems.map((item, i ) => {
                            return(
                                <li key={i}>
                                    <Link 
                                        href={item.href} 
                                        prefetch={false}
                                        smooth="true" 
                                        className={` ${item.href === pathname && "border-b"} pb-1`}>
                                            {item.text}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
                <nav>
                    <ul className='flex gap-4'>
                        <div className='hidden xl:flex gap-4 items-center mr-4'>
                            {socialMedia.map((item, i) => {
                                return(
                                    <Link href={item.href} key={i}>
                                        <li><img src={item.logo} alt="" /></li>
                                    </Link>
                                )
                            })}
                        </div>
                        <li className="parent-btn">
                            <Link href={inscripcionesItem.href} prefetch={false}>
                                <button 
                                    className='btn-secondary'>
                                        {inscripcionesItem.text}
                                </button>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            </section>
    )
}

export default NavBarHeader