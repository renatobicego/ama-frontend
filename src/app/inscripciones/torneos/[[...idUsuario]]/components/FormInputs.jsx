import isError from "@/app/utils/formValidation/isErrorInput";
import { Button, Input, Option, Select,  } from "@/app/utils/materialTailwind";
import { useEffect, useState } from "react";
import PruebasLogic from "./PruebasLogic";
import Link from "next/link";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";

const FormInputs = ({data, handleChange, formErrors, entityData, pruebasSelected, setPruebasSelected, usuario}) => {
    const [torneoData, setTorneoData] = useState({})
    const {torneos} = entityData['torneo/activos']
      
    useEffect(() => {
 
        if (torneoData.pruebasDisponibles) {
            setTorneoData((prevTorneoData) => ({
            ...prevTorneoData,
            pruebasParaElegir: prevTorneoData.pruebasDisponibles.filter((p) => {
                if (!p.categorias) {
                    return p
                } else if (p.categorias.some((c) => c._id === data.categoria)) {
                    return p
                }
            }),
        }))
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
                    lockScroll={true}
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
                        lockScroll={true}
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
            {(data.categoria !== '' && data.torneo !== '' && torneoData.pruebasParaElegir) &&
            <> 
            <h3 className="text-text font-text font-semibold border-2 p-2">Para editar estos datos, edite su perfil en 
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
                    lockScroll={true}
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
                    lockScroll={true}
                    color="gray" 
                    label="Club*"
                    labelProps={{id: 'club'}}
                    >
                </Select>

                <Select 
                    value={usuario.federacion.nombre} 
                    color="gray" 
                    label="Federación*"
                    lockScroll={true}
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
                    lockScroll={true}
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
                pruebas={torneoData.pruebasParaElegir}
                pruebasSelected={pruebasSelected}
                setPruebasSelected={setPruebasSelected}
                formErrors={formErrors}
                usuario={usuario}
            />
            <div className="flex flex-col gap-4 items-left justify-start">
                {(torneoData.linkPagoFederados || torneoData.linkPagoNoFederados) &&
                    <h3 className="text-text font-text font-semibold p-2">
                            Por favor, guarde el comprobante de pago. En caso de no tener los medios de pagos aceptados, puede
                            contactar por este mail: master1963@live.com.ar. También, puede pagar luego en 
                            <Link href={'/perfil'} className="text-light-blue-800"> Mi Perfil {'>'} Mis Inscripciones</Link>  
                    </h3>
                }
                {torneoData.linkPagoFederados &&
                    <Link target="_blank" href={torneoData.linkPagoFederados}>
                        <Button
                            className="flex items-center gap-3 text-primary2 bg-secondary1 rounded-3xl"
                            color="white"
                            >
                                <CurrencyDollarIcon strokeWidth={2} className="h-5 w-5" />
                                Pagar Inscripción Federados
                        </Button>
                    </Link>  

                }
                {torneoData.linkPagoNoFederados &&
                    <Link target="_blank" href={torneoData.linkPagoNoFederados}>
                        <Button
                            className="flex items-center gap-3 text-primary2 bg-secondary1 rounded-3xl"
                            color="white"
                            >
                                <CurrencyDollarIcon strokeWidth={2} className="h-5 w-5" />
                                Pagar Inscripción No Federados
                        </Button>
                    </Link>  
                }
            </div>
            </> 
            }
        </>
    )
}

export default FormInputs
