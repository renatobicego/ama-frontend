import useFetch from "@/app/utils/hooks/useFetch"
import { Spinner} from "@/app/utils/materialTailwind"
import { useState } from "react"
import ListTorneos from "@/app/components/ListTorneos"


const ListTorneosInscripcion = () => {
    const [pagina, setPagina] = useState(1)
    const division = 10
    const {data, loading, error} = useFetch(`torneo/?desde=${(pagina - 1) * 10}&limite=${division}`)

    if (loading) {
        return <div className="mt-6"><Spinner color="amber" /></div>;
    }
    if (error) {
        return <h3 className="text-text font-text">Error al cargar los torneos</h3>;
    }

    return(
        <ListTorneos 
            pagina={pagina} 
            setPagina={setPagina}
            data={data}
            division={division}
            tableHead={['Torneo', 'Inscripciones']}
            urlBtn={`${process.env.NEXT_PUBLIC_URL_API}/inscripciones/torneo`}
            placeholder={'Descargar Inscripciones'}
            />
    )
}

export default ListTorneosInscripcion