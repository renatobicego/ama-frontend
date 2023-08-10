import { InformationCircleIcon, PlusIcon } from "@heroicons/react/24/outline"
import { Button, Typography } from "@/MT"
import { v4 } from "uuid"
import ParrafoInput from "./ParrafoInput"
import { use, useEffect } from "react"
import axios from "axios"

const ParrafoLogic = ({parrafos, setParrafos, formErrors, editando, user, cuerpo}) => {

    useEffect(() => {
        // Obtener datos de los párrafos cuando está editando 
        const fetchCuerpoData = async() => {
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/parrafo_noticia/${editando}`)
            setParrafos([
                ...parrafos,
                ...data.parrafos.map(parrafo => {
                    if(parrafos.some(p => p.id === parrafo._id)){
                        return
                    }
                    const newData = {
                        id: parrafo._id,
                        texto: parrafo.texto,
                        
                    }
                    if(parrafo.titulo){
                        newData.titulo = parrafo.titulo
                    }
                    if(parrafo.imagenes){
                        // Para manejar mensajes de información respecto a los archivos
                        newData.imagenesId = parrafo.imagenes._id
                        newData.imagenes = 'subida'
                        newData.imagenesUrl = parrafo.imagenes.url
                        newData.epigrafe = parrafo.imagenes.epigrafe
                    }
                    return newData
                })
            ])
        }

        if(editando !== undefined){
            fetchCuerpoData()
        }
    }, [])

    const handleAddParrafo = () => {
        setParrafos([
            ...parrafos, 
            {
                id: v4(),
                texto: ''
            }])
    }

    const deleteParrafo = async(id) => {
        const shouldDelete = window.confirm('¿Está seguro de que quiere borrar el párrafo?')

        if (!shouldDelete) {
            return
        }

        setParrafos(prevState => prevState.filter(parrafo => parrafo.id !== id))
        // Si era un p{arrafo ya subido en la DB, borrarlo
        if(cuerpo.includes(id)){
            await axios.delete(`${process.env.NEXT_PUBLIC_URL_API}/parrafo_noticia/${id}`, {
                headers: {
                    'x-token': user.token
                }
            })
        }
    }

    const handleInputChange = (property, value, id) => {
        setParrafos(prevState => prevState.map(parrafo => {
            if(parrafo.id === id){
                return {
                    ...parrafo,
                    [property]: value
                }
            }
            return parrafo
        }))
    }

    const deleteImagenDeParrafo = async(parrafoAgregado, imagenDbBorrada=false) => {
        const shouldDelete = window.confirm('¿Está seguro de que quiere borrar la imagen?')

        if (!shouldDelete) {
            return
        }
        // Si se borra una imagen de la db, sino es solo una imagen subida pero
        // no publicada todavía a la db
        if(imagenDbBorrada){
            await axios.delete(
                `${process.env.NEXT_PUBLIC_URL_API}/imagen_noticia/${parrafoAgregado.imagenesId}`, {
                    headers: {
                        'x-token': user.token
                    }
                })
            
        }
        setParrafos(prevState => prevState.map(parrafo => {
            if(parrafo.id === parrafoAgregado.id){
                const newParrafoSinImagen = {
                    texto: parrafoAgregado.texto,
                    id: parrafoAgregado.id
                }
                if(parrafoAgregado.titulo){
                    newParrafoSinImagen.titulo = parrafoAgregado.titulo
                }
                return newParrafoSinImagen
            }
            return parrafo
        }))
    }

    return (
        <>
            {parrafos.map(parrafo => 
                <ParrafoInput 
                    key={parrafo.id}
                    deleteParrafo={deleteParrafo}
                    handleInputChange={handleInputChange}
                    parrafoAgregado={parrafo}
                    deleteImagenDeParrafo={deleteImagenDeParrafo}
                    />
            )}
            <div>
                <Button
                    className="flex items-center gap-3 text-primary2 bg-secondary1 rounded-3xl"
                    color="white"
                    onClick={handleAddParrafo}
                    >
                        <PlusIcon strokeWidth={2} className="h-5 w-5" />
                        Agregar Párrafo
                </Button>
                
                {/* If user doesn't add pruebas, show error */}
                {formErrors.some(error => error.path === 'cuerpo') &&
                    <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal mt-2">
                        <InformationCircleIcon className="w-4 h-4 -mt-px" />
                        Por favor, corrija los párrafos de la noticia
                    </Typography>
                }
            </div>
            <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal mt-2">
                <InformationCircleIcon className="w-4 h-4 -mt-px" />
                El único campo obligatorio en los párrafos es el texto
            </Typography>
        </>
    )
}

export default ParrafoLogic