import Campeones from "./CampeonesSection/Campeones"
import CarouselNews from "./CarouselNews/CarouselNews"
import ClubesSection from "./ClubesSection/ClubesSection"
import InscripcionesSection from "./InscripcionesSection/InscripcionesSection"
import ResultadosTorneoSection from "./ResultadosTorneoSection/ResultadosTorneoSection"
import SocialMedia from "./SocialMedia/SocialMedia"

const Home = () => {
    return(
        <main className="pt-[5vh] lg:pt-20 2xl:pt-12">
            <CarouselNews />
            <InscripcionesSection />
            <ResultadosTorneoSection />
            <Campeones/>
            <ClubesSection />
            <SocialMedia />
        </main>
    )
}

export default Home