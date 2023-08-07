import LoadingError from "@/app/components/LoadingError"
import isError from "@/app/utils/formValidation/isErrorInput"
import useFetch from "@/app/utils/hooks/useFetch"
import { Option, Select, Input, Textarea } from "@/app/utils/materialTailwind"


const PublicarNoticiaInputs = ({data, handleChange, handleImgPortadaChange, formErrors}) => {
    const {data: categoriasNoticia, loading, error} = useFetch('noticia/categorias')

    if(loading || error) return <LoadingError loading={loading} error={error} />
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
                    label="Imagen Principal*"
                    accept=".png, .jpeg, .jpg"
                    aria-labelledby="imgPortada"
                    labelProps={{id: 'imgPortada'}}
                    error={isError('imgPortada', formErrors)}
                    type="file"
                    onChange={handleImgPortadaChange}
                    />
            </div> 
            <Textarea  
                value={data.titulo}
                tabIndex={3} 
                onChange={(e) => handleChange('titulo', e.target.value)} 
                color="gray" 
                label="Titulo*"
                aria-labelledby="titulo"
                labelProps={{id: 'titulo'}} 
                error={isError('titulo', formErrors)}
                />
            <Textarea 
                tabIndex={4}
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
/* <div className="w-full">
    <Input 
        defaultValue={''}
        value={pruebaAgregada.marca} 
        onChange={handleInputMarca} 
        color="gray" 
        label="Mejor Marca de Prueba*"
        aria-labelledby="marca-prueba"
        labelProps={{id: 'marca-prueba'}} 
        />
    <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal mt-2">
        <InformationCircleIcon className="w-4 h-4 -mt-px" />
        El formato de la marca debe ser {pruebaAgregada.formato}
    </Typography>
</div> */

export default PublicarNoticiaInputs