import ListTorneos from "@/app/components/listTorneosComponents/ListTorneos"
import useFetch from "@/app/utils/hooks/useFetch";
import { Spinner } from "@/app/utils/materialTailwind";


const InscripcionesList = ({user}) => {

    const {data, loading, error} = useFetch(`inscripciones/atleta`, user.token)
    
    if (loading) {
        return <div className="mt-6"><Spinner color="amber" /></div>;
    }
    if (error) {
        return <h3 className="text-text font-text">Error al cargar las inscripciones</h3>;
    }
    return (
        <ListTorneos 
            tableHead={['Torneo', 'Inscripción']}
            data={data}
        />
    )
}

export default InscripcionesList