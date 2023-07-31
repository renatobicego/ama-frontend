import { validateArrayElementosRepetidos, validateEmptyInput, validateFormatoMarca, validatePruebaInscripto, validatePruebasInscriptoRepetidas } from "./formInputValidators"

const inscripcionValidate = (form, pruebasInscripto) => {
    let valid = true
    let errors = []

    for(let path in form){
        // If some input is wrong, push error
        if(!validateEmptyInput(form[path] && path !== 'pruebasInscripto')){
            valid = false
            errors.push({
                msg: 'El campo no puede estar vacío',
                path
            }) 
        }
    }

    if(!validatePruebasInscriptoRepetidas(pruebasInscripto)){
        valid = false
        errors.push({
            msg: 'No se puede inscribir dos veces a la misma prueba',
            path: 'pruebasInscripto'
        }) 
    }

    if(!validateFormatoMarca(pruebasInscripto)){
        valid = false
        errors.push({
            msg: 'Escriba correctamente el formato de marca de las pruebas',
            path: 'pruebasInscripto'
        }) 
    }

    if(!validatePruebaInscripto(pruebasInscripto)){
        valid = false
        errors.push({
            msg: 'No deje el campo vacío de la prueba elegida. Si necesita, puede borrar la prueba tocando el ícono del basurero',
            path: 'pruebasInscripto'
        }) 
    }

    return {valid, errors}
}

export default inscripcionValidate