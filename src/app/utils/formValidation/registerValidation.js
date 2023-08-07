
import { validateEmail, validateEmptyInput, validateNombreApellido, validatePassword } from "./formInputValidators"

const registerValidate = (form, passwordRepeat) => {
    let valid = true
    let errors = []

    for(let path in form){
        // If some input is wrong, push error
        if(!validateEmptyInput(form[path]) && path !== 'club'){
            valid = false
            errors.push({
                msg: 'El campo no puede estar vacío',
                path
            }) 
        }
    }

    if(!validateNombreApellido(form['nombre_apellido'])){
        valid = false
        errors.push({
            msg: 'El campo no puede estar vacío',
            path: 'nombre_apellido'
        }) 
    }

    if(!validateEmail(form['email'])){
        valid = false
        errors.push({
            msg: 'Ingrese un mail correcto',
            path: 'email'
        }) 
    }

    if(passwordRepeat){
        const passwordValidation = validatePassword(form['password'], passwordRepeat)
    
        if(!passwordValidation.statusPassword){
            valid = false
            errors.push({
                msg: passwordValidation.errorPasswordMsg,
                path: 'password'
            }) 
        }
    }

    return {valid, errors}
}

export default registerValidate
