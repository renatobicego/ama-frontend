import { validateEmptyInput, validateFile } from "./formInputValidators"

const clubValidate = (form, logoImg, creando) => {
    let valid = true
    let errors = []

    if(creando){
        if(!validateEmptyInput(form['nombre'])){
            valid = false
            errors.push({
                msg: 'El campo no puede estar vacío',
                path: 'nombre'
            })
        }
        if(!validateEmptyInput(form['siglas'])){
            valid = false
            errors.push({
                msg: 'El campo no puede estar vacío',
                path: 'nombre'
            })
        } 
    }
    
    if(logoImg){
        const logoImgValidation = validateFile(logoImg)
    
        if(!logoImgValidation.statusFile){
            valid = false
            errors.push({
                msg: logoImgValidation.errorFileMsg,
                path: 'logoImg'
            }) 
        }

    }else if (creando){
        valid = false
            errors.push({
                msg: 'Imagen obligatoria',
                path: 'logoImg'
            }) 
    }

    return {valid, errors}
}

export default clubValidate