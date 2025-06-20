import axios from "axios"
import Campeones from "./CampeonesSection/Campeones"
import CarouselNews from "./CarouselNews/CarouselNews"
import ClubesSection from "./ClubesSection/ClubesSection"
import InscripcionesSection from "./InscripcionesSection/InscripcionesSection"
import ResultadosTorneoSection from "./ResultadosTorneoSection/ResultadosTorneoSection"
import SocialMedia from "./SocialMedia/SocialMedia"

async function getData() {
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/noticia/?limite=5`)
   
    return data
}
const Home = async() => {
    const data = await getData()
    return(
        <main className="pt-[5vh] lg:pt-20 2xl:pt-12">
            <CarouselNews data={data} />
            <InscripcionesSection />
            <ResultadosTorneoSection />
            <Campeones/>
            <ClubesSection />
            <SocialMedia />
        </main>
    )
}

export default Home