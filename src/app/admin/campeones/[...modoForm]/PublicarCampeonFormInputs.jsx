
import isError from "@/app/utils/formValidation/isErrorInput"
import PruebasCampeonList from "./PruebasCampeonList"
import { Input } from "@/app/utils/materialTailwind"
import campeonValidate from "@/app/utils/formValidation/campeonValidation"

const PublicarCampeonFormInputs = ({data, setImg, img, formErrors, setData, setFormErrors, handleSubmit, creando}) => {

    const handleChange = (property, value) => {
        setData({...data, [property]: value})
    }

    const handleImgChange = (e) => {
        setImg(e.target.files[0])
    }

    const validateData = (e) => {
        e.preventDefault()
        const {valid, errors} = campeonValidate(data, img, creando)
        
        if(valid){
            handleSubmit()
        }else{
            setFormErrors(errors)
        }
    }


    return (
        <form className="w-full lg:w-2/3 mt-3 flex flex-col items-start gap-6" onSubmit={validateData}>
            <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">
                    <Input 
                        tabIndex={1}
                        color="gray" 
                        label="Nombre y Apellido*" 
                        aria-labelledby="nombre_apellido"
                        labelProps={{id: 'nombre_apellido'}}
                        error={isError('nombre_apellido', formErrors)}
                        value={data.nombre_apellido}
                        onChange={(e => handleChange('nombre_apellido', e.target.value))}
                        />
                    <Input 
                        tabIndex={2}
                        color="gray" 
                        label="Imagen*"
                        accept=".png, .jpeg, .jpg"
                        aria-labelledby="img"
                        labelProps={{id: 'img'}}
                        error={isError('img', formErrors)}
                        type="file"
                        onChange={handleImgChange}
                        />
            </div>
            <PruebasCampeonList data={data} setData={setData}/>
            <button type="submit" className="btn-primary">{creando ? 'Publicar Campeón': 'Editar Campeón'} </button>
        </form>
    )
}

export default PublicarCampeonFormInputs