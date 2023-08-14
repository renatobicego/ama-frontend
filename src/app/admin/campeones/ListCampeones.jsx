
import LoadingError from "@/app/components/LoadingError"
import ListAtletas from "@/app/components/listAtletas/ListAtletas"
import useFetch from "@/app/utils/hooks/useFetch"

const ListCampeones = () => {
    const {data, loading, error} = useFetch(`campeones`)

    if (loading || error) return <LoadingError loading={loading} error={error} />

    return <ListAtletas tableHead={['Campeón Nacional', 'Editar']} data={data.campeones} placeholder={'Editar'} urlBtn={'/admin/campeones/editar'} tipo={'misatletas'}/>
}

export default ListCampeones