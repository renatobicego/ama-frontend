const passwordValidate = (password, repeatPassword) => {
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

export default passwordValidate