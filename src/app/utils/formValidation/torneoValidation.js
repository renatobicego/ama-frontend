import { validateEmptyInput, validateFile } from "./formInputValidators"

const torneoValidate = (form,  programaHorario=null, resultados=null) => {
    let valid = true
    let errors = []

    for(let path in form){
        // If some input is wrong, push error
        if(!validateEmptyInput(form[path]) && path !== 'programaHorario' && path !== 'resultados'){
            valid = false
            errors.push({
                msg: 'El campo no puede estar vacío',
                path
            }) 
        }

        if(Array.isArray(form[path])){
            form[path].forEach(item => {
                if(item === 'a'){
                    valid = false
                    errors.push({
                        msg: 'El campo no puede estar vacío',
                        path
                    }) 
                }
            })
        }
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