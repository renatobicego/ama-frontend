import {
  validateEmptyInput,
  validateNombreApellido,
  validatePassword,
} from "./formInputValidators";

const registerValidate = (form, passwordRepeat) => {
  let valid = true;
  let errors = [];

  for (let path in form) {
    // If some input is wrong, push error
    if (!validateEmptyInput(form[path]) && path !== "club") {
      valid = false;
      errors.push({
        msg: "El campo no puede estar vacío",
        path,
      });
    }
  }

  if (
    form["nombre_apellido"] &&
    !validateNombreApellido(form["nombre_apellido"])
  ) {
    valid = false;
    errors.push({
      msg: "El campo no puede estar vacío",
      path: "nombre_apellido",
    });
  }

  if (passwordRepeat) {
    const passwordValidation = validatePassword(
      form["password"],
      passwordRepeat
    );

    if (!passwordValidation.statusPassword) {
      valid = false;
      errors.push({
        msg: passwordValidation.errorPasswordMsg,
        path: "password",
      });
    }
  }

  return { valid, errors };
};

export default registerValidate;
