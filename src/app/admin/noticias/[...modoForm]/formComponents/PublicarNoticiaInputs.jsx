import LoadingError from "@/app/components/LoadingError"
import isError from "@/app/utils/formValidation/isErrorInput"
import useFetch from "@/app/utils/hooks/useFetch"
import { Option, Select, Input, Textarea, Typography} from "@/MT"
import { DocumentCheckIcon, InformationCircleIcon, TrashIcon } from "@heroicons/react/24/outline"

const PublicarNoticiaInputs = ({data, handleChange, formErrors}) => {
    const {data: categoriasNoticia, loading, error} = useFetch('noticia/categorias')
    if(loading || error) return <LoadingError loading={loading} error={error} />

    const deleteImagenPortada = () => {
        handleChange('imgPortada', 'borrada')
    }

    return (
        <>
            <div className="flex w-full flex-wrap md:flex-nowrap justify-between gap-6">
                <Select 
                    value={data.categoria}
                    aria-labelledby="categoria"
                    tabIndex={1}
                    color="gray" 
                    label="Categoría de la Noticia*"
                    labelProps={{id: 'categoria'}}
                    error={isError('categoria', formErrors)}
                    onChange={(value) => {
                        handleChange('categoria', value)
                    }} 
                    >
                    {categoriasNoticia.categorias.map((categoria, i) => 
                        <Option key={i} value={categoria._id}>
                            {categoria.nombre}
                        </Option>
                    )}
                </Select>
                <Input 
                    tabIndex={2}
                    color="gray" 
                    label="Fecha*"
                    value={data.fecha}
                    aria-labelledby="fecha"
                    labelProps={{id: 'fecha'}}
                    error={isError('fecha', formErrors)}
                    type="date"
                    onChange={(e) => handleChange('fecha', e.target.value)}
                />
            </div> 
            <div className="w-full">
                <Input 
                    tabIndex={3}
                    color="gray" 
                    label="Imagen Principal*"
                    accept=".png, .jpeg, .jpg"
                    aria-labelledby="imgPortada"
                    value={data.imgPortadaName}
                    labelProps={{id: 'imgPortada'}}
                    error={isError('imgPortada', formErrors)}
                    type="file"
                    onChange={(e) => {
                        handleChange('imgPortada', e.target.files[0])
                    }}
                />
                {(data.imgPortadaId && typeof data.imgPortada === 'string') && 
                    <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal mt-2">
                        <DocumentCheckIcon className="w-4 h-4 -mt-px" />
                         <a target="_blank" href={data.imgPortadaUrl} className="text-blue-800">Foto anterior subida en este link</a> 
                    </Typography>
                }
                {
                    data.imgPortada instanceof File &&
                    <>
                        <div className="flex items-center gap-1 mt-2">
                            <InformationCircleIcon className="w-4 h-4 -mt-px" />
                            <Typography variant="small" color="gray" className="font-normal max-w-[95%]">
                                Toque el ícono del basurero si se arrepintió de cambiar la imagen
                                (seguirá apareciendo el nombre del archivo pero se borra)
                            </Typography>
                        </div>
                        <button 
                            aria-label='delete prueba'
                            type="button"
                            className={`absolute -right-6 top-[42%] md:-right-10 md:top-2 rounded cursor-pointer`}
                            onClick={deleteImagenPortada}
                            >
                            <TrashIcon strokeWidth={1} className="h-5 w-5 md:h-7 md:w-7 text-gray-700" />
                        </button>
                    </>
                }
            </div>
            <Input 
                tabIndex={4}
                color="gray" 
                label="Epígrafe de la Imagen"
                value={data.epigrafe}
                aria-labelledby="epigrafe"
                labelProps={{id: 'epigrafe'}}
                error={isError('epigrafe', formErrors)}
                onChange={(e) => handleChange('epigrafe', e.target.value)}
                />
            <Textarea  
                value={data.titulo}
                tabIndex={5} 
                onChange={(e) => handleChange('titulo', e.target.value)} 
                color="gray" 
                label="Titulo*"
                aria-labelledby="titulo"
                labelProps={{id: 'titulo'}} 
                error={isError('titulo', formErrors)}
                />
            <Textarea 
                tabIndex={6}
                value={data.subtitulo} 
                onChange={(e) => handleChange('subtitulo', e.target.value)} 
                color="gray" 
                label="Subtitulo*"
                aria-labelledby="subtitulo"
                labelProps={{id: 'subtitulo'}} 
                error={isError('subtitulo', formErrors)}
                />
        </>
    )
}

export default PublicarNoticiaInputs