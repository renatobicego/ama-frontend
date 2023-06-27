import { Input, Option, Select } from "@/app/utils/materialTailwind";

const DatosPersonales = ({data, handleChange, errorInput}) => {
    
    return(
        <>
            <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">

                <Input 
                    aria-labelledby="nombre_apellido"
                    tabIndex={3}
                    color="gray" 
                    label="Nombre y Apellido*" 
                    labelProps={{
                        id: 'nombre_apellido'
                    }}
                    error={errorInput === 'nombre_apellido' ? true : false}
                    
                    value={data.nombre_apellido}
                    onChange={(e => handleChange('nombre_apellido', e.target.value))}
                    />

                <Select 
                    aria-labelledby="sexo"
                    tabIndex={4}
                    value={data.sexo} 
                    color="gray" 
                    error={errorInput === 'sexo' ? true : false}
                    label="Sexo*"
                    labelProps={{id: 'sexo'}}
                    onChange={(value) => handleChange('sexo', value)} 
                    >
                    <Option value="m">M</Option>
                    <Option value="f">F</Option>
                </Select>

            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">

                <Input 
                    aria-labelledby="dni"
                    tabIndex={5}
                    color="gray" 
                    label="DNI*"
                    labelProps={{id: 'dni'}}
                    error={errorInput === 'dni' ? true : false}
                    value={data.dni} 
                    onChange={(e) => handleChange('dni', e.target.value)} 
                    />

                <Input 
                    aria-labelledby="fecha_nacimiento"
                    tabIndex={6}
                    type="date"
                    color="gray" 
                    label="Fecha de Nacimiento*" 
                    labelProps={{id: 'fecha_nacimiento'}}
                    error={errorInput === 'fecha_nacimiento' ? true : false}
                    value={data.fecha_nacimiento} 
                    onChange={(e) => handleChange('fecha_nacimiento', e.target.value)}
                    />
            </div>

        </>
    )
}

export default DatosPersonales