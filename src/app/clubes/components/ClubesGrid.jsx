"use client"
import ClubCard from "@/app/Home/ClubesSection/ClubCard"
import LoadingError from "@/app/components/LoadingError"
import useFetch from "@/app/utils/hooks/useFetch"


const ClubesGrid = () => {
    const {data, loading, error} = useFetch('club')

    if(loading || error) return <LoadingError error={error} loading={loading}/>

    return(
        <article className="grid grid-cols-2 lg:grid-cols-3 w-full gap-3 md:gap-6">
            {data.clubes.map((club, i) => <ClubCard club={club} key={i}/>)}
        </article>
    )
}

export default ClubesGrid