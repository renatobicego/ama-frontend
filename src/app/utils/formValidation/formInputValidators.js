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

export {
    validateEmptyInput, 
    validateNombreApellido,
    validateEmail,
    validatePassword
}