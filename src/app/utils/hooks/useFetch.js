import { useEffect, useState } from "react"


const useFetch = (route) => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
  
    useEffect(() => {
        async function fetchData(){
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/${route}`)
                const data = await response.json()
                setData(data)
                setLoading(false)
            } catch (error) {
                setError(error)
                setLoading(false)
            }
        }

        fetchData()
    }, [route])
    
    return { data, loading, error }
    
}

export default useFetch