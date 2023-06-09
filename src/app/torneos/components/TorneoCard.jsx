import Image from "next/image"


const TorneoCard = () => {
    return(
        <div className="flex items-center w-full h-20 gap-8">
            <div className="flex items-center gap-6 h-full w-1/2">
                <Image src={"/icons/Calendar.svg"} width={50} height={50}/>
                <div className="flex flex-col pr-6 h-full border-r-2 items-center ">
                    <h5>
                        08
                    </h5>
                    <h6>
                        Mayo
                    </h6>
                    <h6>
                        2023
                    </h6>
                </div>
                <h4 className="text-left pl-6 w-full font-medium text-lg">
                    Nacional de Clubes U20
                </h4>
            </div>
            <div className="border-l-2 pl-6">
                <button className="btn-primary">
                    Descargar Resultados
                </button>   
            </div>
            
            
        </div>
    )
}

export default TorneoCard