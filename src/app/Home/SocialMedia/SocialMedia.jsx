"use client"

import useWindowSize from "@/app/utils/hooks/useWindowSize"
import { InstagramEmbed } from "react-social-media-embed"
import './socialMedia.css'

//TODO edit post by admin

const SocialMedia = () => {
    const windowSize = useWindowSize()

    // To change size of embed 
    const isMobile = windowSize.width < 768
    return(
        <section className="size-section flex flex-col items-center justify-between py-14 gap-10">
            <h3 className="title-section">Seguinos en las Redes Sociales</h3>
            <div className="flex justify-evenly w-full flex-wrap">
                <InstagramEmbed 
                    url='https://www.instagram.com/reel/CuKxE_sxX7v/' 
                    width={isMobile ? "100%" : "40%"} 
                    />
                
            </div>
            
    
        </section>
    )
}

export default SocialMedia