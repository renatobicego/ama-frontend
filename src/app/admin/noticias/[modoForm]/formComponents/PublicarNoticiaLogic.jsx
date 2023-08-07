import PublicarNoticiaInputs from "./PublicarNoticiaInputs"

const PublicarNoticiaLogic = ({data, setData, formErrors, setFormErrors}) => {
    const handleChange = (property, value) => {
        setData({...data, [property]: value})
    }
    const handleImgPortadaChange = (e) => {
        setData({...data, imgPortada: e.target.files[0]})
    }
    return (
        <form className="w-full lg:w-2/3 mt-10 flex flex-col items-start gap-6">
            <PublicarNoticiaInputs 
                data={data} 
                formErrors={formErrors} 
                handleChange={handleChange} 
                handleImgPortadaChange={handleImgPortadaChange}
                />
            <button type="submit" className="btn-primary">Publicar Noticia</button>
        </form>
    )
}

export default PublicarNoticiaLogic