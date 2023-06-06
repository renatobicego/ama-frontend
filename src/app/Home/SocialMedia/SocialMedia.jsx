"use client"

import useWindowSize from "@/app/utils/hooks/useWindowSize"
import { InstagramEmbed } from "react-social-media-embed"
import './socialMedia.css'


const SocialMedia = () => {
    const windowSize = useWindowSize()

    const isMobile = windowSize.width < 768
    return(
        <section className="size-section flex flex-col items-center justify-between py-14 gap-10">
            <h3 className="title-section">Seguinos en las Redes Sociales</h3>
            <div className="flex justify-evenly w-full flex-wrap">
                <InstagramEmbed 
                    url='https://www.instagram.com/p/Cs1K3QFLlSw/' 
                    width={isMobile ? "100%" : "40%"} 
                    />
                <iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid06ji1Y17W8eqAWLKpgBnrVBR8AH8tyXs4FJ4GRUJoJi178rWBy3V6XPNn1UaDchCJl%26id%3D100057241227055&show_text=true" className="border-none h-[60vh] md:!h-auto w-full md:w-[40%]" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
            </div>
            
    
        </section>
    )
}

export default SocialMedia