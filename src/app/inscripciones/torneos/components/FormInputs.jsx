import isError from "@/app/utils/formValidation/isErrorInput";
import { Input, Option, Select,  } from "@/app/utils/materialTailwind";
import { useEffect, useState } from "react";
import PruebasLogic from "./PruebasLogic";
import Link from "next/link";


const FormInputs = ({data, handleChange, formErrors, entityData, pruebasSelected, setPruebasSelected, usuario}) => {
    const [torneoData, setTorneoData] = useState({})
    const {torneos} = entityData['torneo/activos']

    useEffect(() => {
        if(torneoData.pruebasDisponibles){
            
            setTorneoData({
                ...torneoData,
                pruebasDisponibles: torneoData.pruebasDisponibles.filter( p => {
                    if(!p.categorias) {
                        return p
                    }else if (p.categorias.some(c => c._id === data.categoria)) {
                        return p
                    }}
                ) 
            })
        }
        setPruebasSelected([])

    }, [data.categoria])

    return(
        <>
            <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">
                <Select 
                    value={data.torneo}
                    aria-labelledby="torneo"
                    tabIndex={1}
                    color="gray" 
                    label="Torneo a Inscribirse*"
                    labelProps={{id: 'torneo'}}
                    error={isError('torneo', formErrors)}
                    onChange={(value) => {
                        handleChange('torneo', value)
                        setTorneoData(torneos.find(torneo => torneo._id === value))
                    }} 
                    >
                    {torneos.map((torneo, i) => 
                        <Option key={i} value={torneo._id}>
                            {torneo.nombre}
                        </Option>
                    )}
                </Select>
            {torneoData.categoriasDisponibles && 
                    <Select 
                        tabIndex={2}
                        aria-labelledby="categoria"
                        labelProps={{id: 'categoria'}}
                        color="gray" 
                        label="Categoría*"
                        error={isError('categoria', formErrors)}
                        defaultValue={data.categoria}
                        onChange={(value) => handleChange('categoria', value)} 
                        >
                        {torneoData.categoriasDisponibles.map(categoria => 
                            <Option key={categoria._id} value={categoria._id}>
                                {categoria.nombre}
                            </Option>
                            )}
                    </Select>
                }
            </div>
            {(data.categoria !== '' && data.torneo !== '') &&
            <> 
            <h3 className="text-text font-text">Para editar estos datos, edite su perfil en 
                <Link href={'/perfil'} className="text-light-blue-800"> Mi Perfil</Link> 
            </h3>
            <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">

                <Input 
                    aria-labelledby="nombre_apellido"
                    color="gray" 
                    label="Nombre y Apellido*" 
                    labelProps={{
                        id: 'nombre_apellido'
                    }}
                    defaultValue={usuario.nombre_apellido}
                    disabled
                    />

                <Select 
                    aria-labelledby="sexo"
                    value={usuario.sexo} 
                    color="gray" 
                    label="Sexo*"
                    labelProps={{id: 'sexo'}}
                    disabled
                    >
                </Select>

            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">

                <Input 
                    aria-labelledby="dni"
                    color="gray" 
                    label="DNI*"
                    labelProps={{id: 'dni'}}
                    value={usuario.dni} 
                    disabled
                    />

                <Input 
                    aria-labelledby="fecha_nacimiento"
                    type="date"
                    color="gray" 
                    label="Fecha de Nacimiento*" 
                    labelProps={{id: 'fecha_nacimiento'}}
                    value={new Date(usuario.fecha_nacimiento).toISOString().split('T')[0]} 
                    disabled
                    />
            </div>
            <div className="flex w-full justify-between flex-wrap md:flex-nowrap gap-6">
                <Select 
                    aria-labelledby="club"
                    value={usuario.club ? usuario.club.nombre : 'Club No Elegido'}
                    disabled
                    color="gray" 
                    label="Club*"
                    labelProps={{id: 'club'}}
                    >
                </Select>

                <Select 
                    value={usuario.federacion.nombre} 
                    color="gray" 
                    label="Federación*"
                    labelProps={{id: 'federacion'}}
                    aria-labelledby="federacion"
                    disabled
                    >
                </Select>

            </div>

            <div className="flex w-full justify-between flex-wrap md:flex-nowrap gap-6">

                <Select 
                    value={usuario.asociacion.nombre} 
                    color="gray" 
                    label="Asociación*"
                    labelProps={{id: 'asociacion'}}
                    aria-labelledby="asociacion"
                    disabled
                    >
                </Select>

                <Input 
                    disabled
                    defaultValue={usuario.pais} 
                    color="gray" 
                    label="Pais*" 
                    labelProps={{id: 'pais'}}
                    aria-labelledby="pais"
                    />
            </div>
            <PruebasLogic 
                // Filter for categoriasDisponibles. If prueba.categorias includes categoria
                // selected, show prueba, else don't show 
                pruebas={torneoData.pruebasDisponibles}
                pruebasSelected={pruebasSelected}
                setPruebasSelected={setPruebasSelected}
                formErrors={formErrors}
                usuario={usuario}
            />
            </> 
            }
        </>
    )
}

export default FormInputs