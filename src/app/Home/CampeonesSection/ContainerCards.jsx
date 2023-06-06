import CampeonCard from "./CampeonCard"


const ContainerCards = ({campeones}) => {
    return(
        <div className="w-full flex justify-between py-6 px-16">
            {campeones.map((campeon, i) => <CampeonCard campeon={campeon} key={i}/>)}
        </div>
    )
}

export default ContainerCards