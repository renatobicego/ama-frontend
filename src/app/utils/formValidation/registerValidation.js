import {
  validateEmptyInput,
  validateNombreApellido,
} from "./formInputValidators";

const registerValidate = (form) => {
  let valid = true;
  let errors = [];

  for (let path in form) {
    // If some input is wrong, push error
    if (
      !validateEmptyInput(form[path]) &&
      path !== "club" &&
      path !== "telefono"
    ) {
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

  return { valid, errors };
};

export default registerValidate;
