"use client"
import LoadingError from "@/app/components/LoadingError"
import ListAtletas from "@/app/components/listAtletas/ListAtletas"
import useFetch from "@/app/utils/hooks/useFetch"
import { Typography } from "@/app/utils/materialTailwind"


const MisAtletasList = ({usuario}) => {
    const {data, loading, error} = useFetch(`usuarios/club/${usuario.club}`)
    if(loading || error) return <LoadingError loading={loading} error={error} />
    return (
        <>
            {data.usuarios.length > 0 ? 
                <ListAtletas 
                    data={data.usuarios.filter(u => u._id !== usuario.uid)} 
                    placeholder={'Inscribir'} 
                    tableHead={['Atleta', 'Inscribir a Torneo']} 
                    urlBtn={'/inscripciones/torneos'}
                    tipo={'misatletas'}
                    />
                :
                <Typography variant="h5" className="text-title font-title">
                    No hay atletas registrados en su club
                </Typography>
            }   
        </>
    )
}

export default MisAtletasList