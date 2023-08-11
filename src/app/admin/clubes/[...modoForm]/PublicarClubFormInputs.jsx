import clubValidate from "@/app/utils/formValidation/clubValidation"
import isError from "@/app/utils/formValidation/isErrorInput"
import { Input, Typography } from "@/app/utils/materialTailwind"
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import EntrenadoresList from "./EntrenadoresList"

const PublicarClubFormInputs = ({data, setLogoImg, logoImg, formErrors, setData, setFormErrors, handleSubmit, creando}) => {

    const handleChange = (property, value) => {
        setData({...data, [property]: value})
    }

    const handleLogoImgChange = (e) => {
        setLogoImg(e.target.files[0])
    }

    const validateData = (e) => {
        e.preventDefault()
        const {valid, errors} = clubValidate(data, logoImg, creando)
        
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
                    label="Nombre*" 
                    aria-labelledby="nombre"
                    labelProps={{id: 'nombre'}}
                    error={isError('nombre', formErrors)}
                    value={data.nombre}
                    onChange={(e => handleChange('nombre', e.target.value))}
                    />
                <div className="w-full">
                    <Input 
                        tabIndex={2}
                        color="gray" 
                        label="Logo del Club*"
                        accept=".png, .jpeg, .jpg"
                        aria-labelledby="logoImg"
                        labelProps={{id: 'logoImg'}}
                        error={isError('logoImg', formErrors)}
                        type="file"
                        onChange={handleLogoImgChange}
                        />
                    {!creando && 
                        <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal mt-2">
                            <InformationCircleIcon className="w-4 h-4 -mt-px" />
                            Agregar un logo solo si quiere cambiar el actual
                        </Typography>
                    }
                </div>
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">
                <Input 
                    tabIndex={3}
                    color="gray" 
                    label="Siglas en CADA*" 
                    aria-labelledby="siglas"
                    labelProps={{id: 'siglas'}}
                    error={isError('siglas', formErrors)}
                    value={data.siglas}
                    onChange={(e => handleChange('siglas', e.target.value))}
                    />
                <Input 
                    tabIndex={4}
                    color="gray" 
                    label="URL Perfil Instagram" 
                    aria-labelledby="instagram"
                    labelProps={{id: 'instagram'}}
                    error={isError('instagram', formErrors)}
                    value={data.instagram}
                    onChange={(e => handleChange('instagram', e.target.value))}
                    />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">
                <Input 
                    tabIndex={5}
                    color="gray" 
                    label="URL Perfil Twitter" 
                    aria-labelledby="twitter"
                    labelProps={{id: 'twitter'}}
                    error={isError('twitter', formErrors)}
                    value={data.twitter}
                    onChange={(e => handleChange('twitter', e.target.value))}
                    />
                <Input 
                    tabIndex={6}
                    color="gray" 
                    label="URL Perfil Facebook" 
                    aria-labelledby="facebook"
                    labelProps={{id: 'facebook'}}
                    error={isError('facebook', formErrors)}
                    value={data.facebook}
                    onChange={(e => handleChange('facebook', e.target.value))}
                    />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">
                <Input 
                    tabIndex={7}
                    color="gray" 
                    label="Lugar de Entrenamiento" 
                    aria-labelledby="ciudad"
                    labelProps={{id: 'ciudad'}}
                    error={isError('ciudad', formErrors)}
                    value={data.ciudad}
                    onChange={(e => handleChange('ciudad', e.target.value))}
                    />

            </div>
            <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal mt-2">
                <InformationCircleIcon className="w-4 h-4 -mt-px" />
                No es obligatorio agregar link a los perfiles de las redes sociales. 
            </Typography>
            {data.id && <EntrenadoresList data={data} setData={setData}/>}
            <button type="submit" className="btn-primary">{creando ? 'Publicar Club': 'Editar Club'} </button>
        </form>
    )
}

export default PublicarClubFormInputs