import isError from "@/app/utils/formValidation/isErrorInput"
import torneoValidate from "@/app/utils/formValidation/torneoValidation"
import { useRegistroList } from "@/app/utils/hooks/useRegistroList"
import { Button, Input, Option, Select, Spinner } from "@/app/utils/materialTailwind"
import PruebasDisponiblesLogic from "./pruebasDisponibles/PruebasDisponiblesLogic"
import CategoriasDisponiblesLogic from "./categoriasDisponibles/CategoriasDisponibleLogic"


const FormLogicCrearTorneo = ({
    data,
    setData, 
    setFormErrors, 
    handleSubmit, 
    formErrors, 
    programaHorario, 
    handleProgramaHorarioChange
    }) => {
    
    const handleChange = (property, value) => {
        setData({...data, [property]: value})
    }

    // Get form input for select dropdowns
    const { entityData, loading, error } = useRegistroList(['pruebas', 'categorias'])
    const { pruebas, categorias } = entityData

    if (loading) {
        return <div className="mt-6"><Spinner color="amber" /></div>;
    }
    if (error) {
        return <h3 className="text-text font-text">Error al cargar el formulario</h3>

    }

    const validateSubmit = (e) => {
        e.preventDefault()
  
        const {valid, errors} = torneoValidate(data, programaHorario)

        if(valid){
            handleSubmit()
        }else{
            setFormErrors(errors)
        }
    }
    return (
        <form className="w-full lg:w-2/3 mt-10 flex flex-col items-start gap-6" onSubmit={validateSubmit}>
            <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">
                <Input 
                    tabIndex={1}
                    color="gray" 
                    label="Nombre del Torneo*" 
                    aria-labelledby="nombre"
                    labelProps={{id: 'nombre'}}
                    error={isError('nombre', formErrors)}
                    
                    value={data.nombre}
                    onChange={(e => handleChange('nombre', e.target.value))}
                    />
                <Input 
                    tabIndex={2}
                    color="gray" 
                    label="Lugar*"
                    aria-labelledby="lugar"
                    labelProps={{id: 'lugar'}}
                    error={isError('lugar', formErrors)}
                    
                    value={data.lugar}
                    onChange={(e => handleChange('lugar', e.target.value))}
                    />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">
                
                <Input 
                    tabIndex={3}
                    color="gray" 
                    label="Fecha*"
                    type="date" 
                    aria-labelledby="fecha"
                    labelProps={{id: 'fecha'}}
                    error={isError('fecha', formErrors)}
                    
                    value={data.fecha}
                    onChange={(e => handleChange('fecha', e.target.value))}
                    />
                <Select 
                    tabIndex={4}
                    value={data.cantidadDias} 
                    onChange={(newValue) => handleChange(cantidadDias, newValue)} 
                    color="gray" 
                    label="Cantidad de Dias*"
                    aria-labelledby="cantidadDias"
                    labelProps={{id: 'cantidadDias'}}
                    >

                    <Option value={1}>1</Option>
                    <Option value={2}>2</Option>
                    <Option value={3}>3</Option>
                    <Option value={4}>4</Option>

                </Select>
                
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">
                <Input 
                    tabIndex={5}
                    color="gray" 
                    type="file"
                    accept=".pdf, .doc, .docx"
                    className=""
                    label="Programa Horario" 
                    aria-labelledby="programaHorario"
                    labelProps={{id: 'programaHorario'}}
                    error={isError('programaHorario', formErrors)}
                    onChange={handleProgramaHorarioChange}
                />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">
                <PruebasDisponiblesLogic 
                    setData={setData}
                    formErrors={formErrors} 
                    pruebas={pruebas.pruebas}
                    data={data}
                />
                <CategoriasDisponiblesLogic 
                    setData={setData}
                    formErrors={formErrors} 
                    categorias={categorias.categorias}
                    data={data}
                />
            </div>
            <button type="submit" className="btn-primary">Crear Torneo</button>
        </form>
    )
}

export default FormLogicCrearTorneo