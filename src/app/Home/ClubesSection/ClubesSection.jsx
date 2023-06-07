
import ClubCard from "./ClubCard"

const mockedClubes = [
    {
        name: "Universidad Nacional de Cuyo",
        imgHref: "/clubes/uncuyo.jpg",
        href: ""
    },
    {
        name: "CAVEM",
        imgHref: "/clubes/CAVEM.jpg",
        href: ""
    },
    {
        name: "ALMA",
        imgHref: "/clubes/alma.jpg",
        href: ""
    },
    {
        name: "Murialdo",
        imgHref: "/clubes/murialdo.jpg",
        href: ""
    },
]

const ClubesSection = () => {
    return(
        <section className="bg-gradient-to-t from-primary2 via-30% xl:via-50% via-primary2 to-30% xl:to-50% w-full">
            <div 
                className="size-section flex flex-col justify-between items-center py-16 parent-btn">
                <h3 className="font-title font-semibold text-title text-2xl lg:text-3xl">
                    Clubes de Mendoza
                </h3>

                <div className="w-full flex justify-between py-10 flex-wrap">
                    {mockedClubes.map((club, i) => <ClubCard club={club} key={i}/>)}
                </div>

                <button className="btn-secondary">Conocer Más</button>
            </div>

        </section>
    )
}

export default ClubesSection