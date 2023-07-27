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
    }else if(typeof input == "boolean"){
        if(input !== false && input !== true){
            return false
        }else{
            return true
        } 
    }
    return true
   
}

const validateNombreApellido = (nombre) => {
    if(nombre.trim().length < 5){
        return false
    }else{
        return true
    }
}  

function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

const validatePassword = (password, repeatPassword) => {
    let statusPassword = true
    let errorPasswordMsg = ''
    if(password.length < 8){
        statusPassword = false
        errorPasswordMsg = 'La contraseña debe tener 8 o más caracteres'
    }else if (password !== repeatPassword){
        statusPassword = false
        errorPasswordMsg = 'Las contraseñas deben coincidir'
    }

    return {statusPassword, errorPasswordMsg}
}

const validateFile = (file) => {
    let statusFile = true
    let errorFileMsg = ''

    // Size
    const MIN_FILE_SIZE = 8 // 8KB
    const MAX_FILE_SIZE = 10000 // 10MB

    const fileSizeKiloBytes = file.size / 1024

    if(fileSizeKiloBytes < MIN_FILE_SIZE){
        statusFile = false
        errorFileMsg = 'El archivo debe ser mayor a 8KB'
    }
    if(fileSizeKiloBytes > MAX_FILE_SIZE){
        statusFile = false
        errorFileMsg = 'El archivo debe ser menor a 10MB'
    }
    return {statusFile, errorFileMsg}
}

const validateArrayElementosRepetidos = (arr) => {
    const seenIds = new Set()

    for (const obj of arr) {
      if (seenIds.has(obj.id)) {
        return false
      }
  
      seenIds.add(obj.id);
    }
  
    return true

}
export {
    validateEmptyInput, 
    validateNombreApellido,
    validateEmail,
    validatePassword,
    validateFile,
    validateArrayElementosRepetidos
}
