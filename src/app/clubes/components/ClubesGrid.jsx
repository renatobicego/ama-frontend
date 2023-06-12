const { default: ClubCard } = require("@/app/Home/ClubesSection/ClubCard")

const mockedClubes = [
    {
        name: "Universidad Nacional de Cuyo",
        imgHref: "/clubes/uncuyo.jpg",
        href: "/clubes/nombre_club/id"
    },
    {
        name: "CAVEM",
        imgHref: "/clubes/CAVEM.jpg",
        href: "/clubes/nombre_club/id"
    },
    {
        name: "ALMA",
        imgHref: "/clubes/alma.jpg",
        href: "/clubes/nombre_club/id"
    },
    {
        name: "Murialdo",
        imgHref: "/clubes/murialdo.jpg",
        href: "/clubes/nombre_club/id"
    },
]

const ClubesGrid = () => {
    return(
        <article className="grid grid-cols-2 lg:grid-cols-3 w-full gap-3 md:gap-6">
            {mockedClubes.map((club, i) => <ClubCard club={club} key={i}/>)}
        </article>
    )
}

export default ClubesGrid