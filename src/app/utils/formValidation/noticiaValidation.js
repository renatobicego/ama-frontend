import { validateEmptyInput, validateFile } from "./formInputValidators"

const noticiaValidate = (form, parrafos) => {
    let valid = true
    let errors = []

    for(let path in form){
        // If some input is wrong, push error
        if(!validateEmptyInput(form[path] && path !== 'cuerpo')){
            valid = false
            errors.push({
                msg: 'El campo no puede estar vacío',
                path
            }) 
        }
    }

    const imgPortadaValidation = validateFile(form.imgPortada)
    if(!imgPortadaValidation.statusFile){
        valid = false
        errors.push({
            msg: imgPortadaValidation.errorFileMsg,
            path: 'imgPortada'
        }) 
    }

    if(parrafos.length === 0){
        valid = false
        errors.push({
            msg: 'Escriba al menos un párrafo para la noticia',
            path: 'cuerpo'
        }) 
    }

    parrafos.forEach((parrafo) => {
        if(!validateEmptyInput(parrafo.texto)){
            valid = false
            errors.push({
                msg: 'El texto del párrafo no puede estar vacío',
                path: 'cuerpo'
            }) 
        }

        if(parrafo.imagenes){
            const imagenValidation = validateFile(parrafo.imagenes)
            if(!imagenValidation.statusFile){
                valid = false
                errors.push({
                    msg: imagenValidation.errorFileMsg,
                    path: 'cuerpo'
                }) 
            }
        }
    })

    return {valid, errors}
}

export default noticiaValidate