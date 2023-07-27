import { validateArrayElementosRepetidos, validateEmptyInput } from "./formInputValidators"

const inscripcionValidate = (form) => {
    let valid = true
    let errors = []

    for(let path in form){
        // If some input is wrong, push error
        if(!validateEmptyInput(form[path])){
            valid = false
            errors.push({
                msg: 'El campo no puede estar vacío',
                path
            }) 
        }
    }

    if(!validateArrayElementosRepetidos(form['pruebasInscripto'])){
        valid = false
        errors.push({
            msg: 'No se puede inscribir dos veces a la misma prueba',
            path: 'pruebasInscripto'
        }) 
    }

    return {valid, errors}
}

export default inscripcionValidate