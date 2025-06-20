import { validateEmptyInput, validateFile } from "./formInputValidators"

const campeonValidate = (form, img, creando) => {
    let valid = true
    let errors = []

    for(let path in form){
        // If some input is wrong, push error
        if(!validateEmptyInput(form[path]) && path !== 'img'){
            valid = false
            errors.push({
                msg: 'El campo no puede estar vacío',
                path
            }) 
        }
    }
    if(img){
        const imgValidation = validateFile(img)
    
        if(!imgValidation.statusFile){
            valid = false
            errors.push({
                msg: imgValidation.errorFileMsg,
                path: 'img'
            }) 
        }

    }else if (creando){
        valid = false
            errors.push({
                msg: 'Imagen obligatoria',
                path: 'img'
            }) 
    }

    return {valid, errors}
}

export default campeonValidate