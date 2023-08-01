"use client"
import Link from "next/link"
import ClubCard from "./ClubCard"
import useFetch from "@/app/utils/hooks/useFetch"

const ClubesSection = () => {
    const {data} = useFetch('club')
    return(
        <section className="bg-gradient-to-t from-primary2 via-30% xl:via-50% via-primary2 to-30% xl:to-50% w-full">
            <div 
                className="size-section flex flex-col justify-between items-center py-16 parent-btn">
                <h3 className="font-title font-semibold text-title text-2xl lg:text-3xl">
                    Clubes de Mendoza
                </h3>

                {data &&
                    <div className="md:w-4/5 lg:w-full py-10 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                        {data.clubes.map((club, i) => <ClubCard club={club} key={i}/>)}
                    </div>
                }

                <Link href={"/clubes"}>
                    <button className="btn-secondary">Conocer Más</button>
                </Link>
            </div>

        </section>
    )
}

export default ClubesSection