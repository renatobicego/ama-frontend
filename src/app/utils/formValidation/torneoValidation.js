import { hasDuplicates, validateArrayElementosRepetidos, validateEmptyInput, validateFile } from "./formInputValidators"

const torneoValidate = (form,  programaHorario=null, resultados=null) => {
    let valid = true
    let errors = []

    const pathsToNotCheck = ['linkPagoFederados', 'linkPagoNoFederados', 'programaHorario', 'resultados']

    for(let path in form){
        // If some input is wrong, push error
        if(!validateEmptyInput(form[path]) && !pathsToNotCheck.includes(path)){
            valid = false
            errors.push({
                msg: 'El campo no puede estar vacío',
                path
            }) 
        }
    }

    if(hasDuplicates(form['pruebasDisponibles'])){
        valid = false
        errors.push({
            msg: 'Las pruebas disponibles no pueden estar repetidas',
            path: 'pruebasDisponibles'
        }) 
    }

    if(hasDuplicates(form['categoriasDisponibles'])){
        valid = false
        errors.push({
            msg: 'Las categorías disponibles no pueden estar repetidas',
            path: 'categoriasDisponibles'
        }) 
    }


    if(programaHorario){
        const programaHorarioValidation = validateFile(programaHorario)
    
        if(!programaHorarioValidation.statusFile){
            valid = false
            errors.push({
                msg: programaHorarioValidation.errorFileMsg,
                path: 'programaHorario'
            }) 
        }

    }

    if(resultados){

        const resultadosValidation = validateFile(resultados)
    
        if(!resultadosValidation.statusFile){
            valid = false
            errors.push({
                msg: resultadosValidation.errorFileMsg,
                path: 'resultados'
            }) 
        }
    }

    return {valid, errors}
}

export default torneoValidate