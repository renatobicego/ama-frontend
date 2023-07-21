import { useEffect, useState } from "react"


const useFetch = (route) => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/${route}`)
                const data = await response.json()
                setData(data)
                setLoading(false)
            } catch (error) {
                setError(error)
                setLoading(false)
            }
        };

        fetchData()
    }, [])
    
    return { data, loading, error }
    
}

export default useFetch