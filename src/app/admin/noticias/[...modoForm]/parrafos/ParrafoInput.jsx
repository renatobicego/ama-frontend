import { Button, Input, Textarea, Typography } from "@/MT"
import { DocumentCheckIcon, TrashIcon } from "@heroicons/react/24/outline"


const ParrafoInput = ({parrafoAgregado, deleteParrafo, handleInputChange}) => {

    return (
        <>
            <hr className="my-2 border-primary2 w-full" />
            <Input 
                tabIndex={1}
                color="gray" 
                value={parrafoAgregado.titulo}
                label="Subtítulo del Párrafo*"
                aria-labelledby="titulo"
                labelProps={{id: 'titulo'}}
                onChange={(e) => handleInputChange('titulo', e.target.value, parrafoAgregado.id)}
                />
            <div className="w-full">

                <Input 
                    tabIndex={2}
                    color="gray" 
                    label="Imagen que acompañe el párrafo (se mostrará al final del párrafo)*"
                    aria-labelledby="imagenes"
                    labelProps={{id: 'imagenes'}}
                    type="file"
                    onChange={(e) => handleInputChange('imagenes', e.target.files[0], parrafoAgregado.id)}
                    />
                {parrafoAgregado.imagenesId && 
                    <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal mt-2">
                        <DocumentCheckIcon className="w-4 h-4 -mt-px" />
                         <a target="_blank" href={parrafoAgregado.imagenes} className="text-blue-800">Foto anterior subida en este link</a> 
                    </Typography>
                    
                }
            </div>
            {
                parrafoAgregado.imagenes &&
                <Input 
                    tabIndex={3}
                    color="gray" 
                    value={parrafoAgregado.epigrafe}
                    label="Epígrafe de la Imagen"
                    aria-labelledby="epigrafe"
                    labelProps={{id: 'epigrafe'}}
                    onChange={(e) => handleInputChange('epigrafe', e.target.value, parrafoAgregado.id)}
                    />
            }
            <Textarea  
                value={parrafoAgregado.texto}
                tabIndex={4} 
                onChange={(e) => handleInputChange('texto', e.target.value, parrafoAgregado.id)} 
                color="gray" 
                size="lg"
                label="Texto*"
                aria-labelledby="texto"
                labelProps={{id: 'texto'}} 
                />

            <Button
                className="flex items-center gap-3 text-primary2 rounded-3xl"
                color="white"
                onClick={() => deleteParrafo(parrafoAgregado.id)}
                >
                    <TrashIcon strokeWidth={2} className="h-5 w-5" />
                    Eliminar Párrafo
            </Button>
        </>
    )
}

export default ParrafoInput