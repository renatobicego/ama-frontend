const validateEmptyInput = (input) => {
    
    // Depending if input is string or array validate if is empty different
    if(typeof input === 'string'){
        if(input.trim().length < 1){
            return false
        }else{
            return true
        } 
    }else if(Array.isArray(input)){
        if(input.length === 0){
            return false
        }else{
            return true
        } 
    }
   
}

const validateNombreApellido = (nombre) => {
    if(nombre.trim().length < 5){
        return false
    }else{
        return true
    }
}   


const inscripcionValidate = (form) => {
    let inscripcion = true
    let errorKey
    let error = ''

    for(let key in form){
        // If some input is wrong, stop validation and return error
        if(!validateEmptyInput(form[key]) && inscripcion){
            inscripcion = false
            errorKey = key
            error = 'El campo no puede estar vacío'
        }
    }

    // If inscripcion is already false, don't validate and return error
    if(!validateNombreApellido(form['nombre_apellido']) && inscripcion){
        inscripcion = false
        errorKey = 'nombre_apellido'
        error = 'Ingrese el nombre y apellido completo'
    }

    return {inscripcion, errorKey, error}
}

export default inscripcionValidate
