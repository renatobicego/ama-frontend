"use client"
import LoadingError from "@/app/components/LoadingError"
import ListAtletas from "@/app/components/listAtletas/ListAtletas"
import useFetch from "@/app/utils/hooks/useFetch"


const MisAtletasList = ({usuario}) => {
    const {data, loading, error} = useFetch(`usuarios/club/${usuario.club}`)
    if(loading || error) return <LoadingError loading={loading} error={error} />
    return (
        <ListAtletas 
            atletas={data.usuarios.filter(usuario => usuario.role === 'USER_ROLE')} 
            placeholder={'Inscribir'} 
            tableHead={['Atleta', 'Inscribir a Torneo']} 
            urlBtn={'/inscripciones/torneos'}
            />
        )
}

export default MisAtletasList