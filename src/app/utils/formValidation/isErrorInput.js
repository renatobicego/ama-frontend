const isError = (path, formErrors) => formErrors.some(error => error.path === path)

export default isError
