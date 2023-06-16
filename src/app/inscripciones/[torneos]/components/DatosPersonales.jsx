import { Input, Option, Select, Typography } from "@/app/utils/materialTailwind";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const DatosPersonales = ({data, handleChange, fechaNacimiento, setFechaNacimiento}) => {
    
    return(
        <>
            <div className="flex w-full justify-between gap-6">

                <Input 
                    color="gray" 
                    label="Nombre y Apellido*" 
                    value={data.nombre_apellido}
                    onChange={(e => handleChange('nombre_apellido', e.target.value))}
                    />

                <Select 
                    value={data.sexo} 
                    color="gray" 
                    label="Sexo*"
                    onChange={(value) => handleChange('sexo', value)} 
                    >
                    <Option value="m">M</Option>
                    <Option value="f">F</Option>
                </Select>

            </div>
            <div className="flex w-full justify-between gap-6">

                <Input 
                    color="gray" 
                    label="DNI*"
                    value={data.dni} 
                    onChange={(e) => handleChange('dni', e.target.value)} 
                    />

                <div className="w-full">
                    <Input 
                        color="gray" 
                        label="Fecha de Nacimiento*" 
                        value={fechaNacimiento} 
                        onChange={(e) => setFechaNacimiento(e.target.value)}
                        />
                    <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal mt-2">
                        <InformationCircleIcon className="w-4 h-4 -mt-px" />
                        Formato: dd-MM-AAAA. Por ejemplo: 03-06-2001
                    </Typography>
                </div>
            </div>

        </>
    )
}

export default DatosPersonales