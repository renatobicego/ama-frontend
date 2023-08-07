"use client"
import LoadingError from "@/app/components/LoadingError"
import ListAtletas from "@/app/components/listAtletas/ListAtletas"
import useFetch from "@/app/utils/hooks/useFetch"
import { Option, Select } from "@/app/utils/materialTailwind"
import { useState } from "react"


const MisAtletasInscripcionesList = ({usuario}) => {
    const {data, loading, error} = useFetch(`inscripciones/club/${usuario.club}`)
    
    const {data: torneosActivos, loading: loadingTorneos, error: errorTorneos} = useFetch(`torneo/activos`)
    const [torneo, setTorneo] = useState('')
    if(loading || error) return <LoadingError loading={loading} error={error} />
    if(loadingTorneos || errorTorneos) return <LoadingError loading={loading} error={error} />
    return (
        <>
            <div className="w-1/2">
                <Select 
                    aria-labelledby="torneo"
                    labelProps={{id: 'torneo'}}
                    color="gray" 
                    label="Torneo"
                    defaultValue={torneo}
                    onChange={(value) => setTorneo(value)} 
                    >
                    {torneosActivos.torneos.map(torneo => 
                        <Option key={torneo._id} value={torneo._id}>
                            {torneo.nombre}
                        </Option>
                    )}
                </Select>
            </div>
            {torneo !== '' && 
                <ListAtletas 
                    data={data.inscripcionesPorClub.filter(inscripcion => inscripcion.torneo._id === torneo)} 
                    placeholder={'Editar'} 
                    tableHead={['Atleta', 'Editar Inscripción']} 
                    urlBtn={'/inscripciones/torneos/editar'}
                    tipo={'misatletasinscripciones'}
                    />
            }
        </>
        )
}

export default MisAtletasInscripcionesList