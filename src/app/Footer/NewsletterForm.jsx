"use client"
import { Input } from "@/app/utils/materialTailwind"
import { useState } from "react"
import validateEmail from "../utils/formValidation/emailValidation"


const NewsletterForm = ({socialMedia}) => {

    const [email, setEmail] = useState('')

    const handleEmailChange = e => setEmail(e.target.value)

    const handleSubmit = e => {
        e.preventDefault()
        console.log(validateEmail(email))
    }

    return(
        <form onSubmit={handleSubmit} className='flex flex-col justify-between gap-5 h-full w-full lg:w-1/3 parent-btn'>
            <h3 className='text-base md:text-xl font-semibold'>Suscribirse al Newsletter</h3>
            
            <Input 
                size="lg" 
                className="text-white" 
                color="gray" 
                placeholder='Ingrese su Mail*'
                value={email}
                onChange={handleEmailChange}
                />

            <div className='flex gap-8 justify-between items-center'>
                <button className='btn-primary' type="submit">Suscribirse</button>
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