/* eslint-disable react/prop-types */

import Image from "next/image"

const NavBarHeader = ({socialMedia}) => {
    return(
        <section className='hidden lg:block bg-tag-bg list-none w-full'>
            <div className='size-section flex justify-between items-center'>
                <nav id='nav-header-site' >
                    <ul className='flex justify-evenly'>
                        <li>Inicio</li>
                        <li>Torneos</li>
                        <li>Noticias</li>
                        <li>Clubes</li>
                        <li>Mi Perfil</li>
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
                            <button 
                                className='btn-secondary'>
                                    Inscripciones
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            </section>
    )
}

export default NavBarHeader