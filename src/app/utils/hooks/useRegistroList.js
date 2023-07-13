import axios from "axios";
import { useEffect, useState } from "react";

export const useRegistroList = (entityTypes) => {
    const [entityData, setEntityData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        console.log('Hook llamado')
        const fetchEntityData = async () => {
            try {
                const requests = entityTypes.map(async (entityType) => {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/${entityType}`)
                    return { [entityType]: response.data }
                })
        
                const responses = await Promise.all(requests)
                const mergedData = Object.assign({}, ...responses)
                setEntityData(mergedData)
                setLoading(false)
            } catch (error) {
                setError(error)
                setLoading(false)
            }
        };

        fetchEntityData()
    }, [])
    
    return { entityData, loading, error };
}