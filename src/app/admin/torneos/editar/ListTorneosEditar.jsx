"use client"
import ListTorneos from "@/app/components/listTorneosComponents/ListTorneos"
import useFetch from "@/app/utils/hooks/useFetch"
import { Spinner } from "@/app/utils/materialTailwind"
import { useState } from "react"

const ListTorneosEditar = () => {
    const [pagina, setPagina] = useState(1)
    const division = 10
    const {data, loading, error} = useFetch(`torneo/?desde=${(pagina - 1) * division}&limite=${division}`)

    if (loading) {
        return <div className="mt-6"><Spinner color="amber" /></div>;
    }
    if (error) {
        return <h3 className="text-text font-text">Error al cargar los torneos</h3>;
    }
    return (
        <>
    
            <ListTorneos 
                data={data}
                division={division}
                pagina={pagina}
                placeholder={'Editar Torneo'}
                setPagina={setPagina}
                tableHead={['Torneo', 'Editar']}
                urlBtn={'/admin/torneos/editar'}
            />
        </>
    )
}

export default ListTorneosEditar