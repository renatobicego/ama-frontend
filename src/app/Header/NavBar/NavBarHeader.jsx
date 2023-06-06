/* eslint-disable react/prop-types */
"use client"
import useScrollDirection from "@/app/utils/hooks/useScrollDirection"
import Image from "next/image"
import Link from "next/link"


const NavBarHeader = ({socialMedia, menuItems}) => {
    const scrollDirection = useScrollDirection()

    const navBarItems = menuItems.filter(item => item.text !== 'Inscripciones')
    const inscripcionesItem = menuItems.find(item => item.text === 'Inscripciones')

    return(
        <section className={`hidden lg:block bg-tag-bg list-none w-full relative -z-10 ${ scrollDirection === "down" ? "-top-24" : "top-0"} transition-all duration-500`}>
            <div className='size-section flex justify-between items-center'>
                <nav id='nav-header-site' >
                    <ul className='flex justify-evenly'>
                        {navBarItems.map((item, i ) => {
                            return(
                                <li key={i}>
                                    <Link href={item.href}>{item.text}</Link>
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
                                    <a href={item.href} key={i}>
                                        <li><img src={item.logo} alt="" /></li>
                                    </a>
                                )
                            })}
                        </div>
                        <li className="parent-btn">
                            <Link href={inscripcionesItem.href}>
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