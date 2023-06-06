

const NewsletterForm = ({socialMedia}) => {
    return(
        <form action="" className='flex flex-col justify-between h-full w-full lg:w-1/3 parent-btn'>
            <h3 className='text-base md:text-xl font-semibold'>Suscribirse al Newsletter</h3>
            <input className="input text-white" type="text" placeholder='Ingrese su Mail*'/>
            <div className='flex gap-8 justify-between items-center'>
                <button className='btn-primary'>Suscribirse</button>
                <nav>
                    <ul className='flex gap-2 items-center'>
                        {socialMedia.map((item, i) => {
                            return(
                                <a href={item.href} key={i}>
                                    <li><img src={item.logo} alt="" /></li>
                                </a>
                            )
                        })}
                    </ul>
                </nav>
            </div>
        </form>
    )
}

export default NewsletterForm