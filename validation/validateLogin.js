export default function validateLogin(values) {
    let errors = {};

    //Validar email
    if(!values.email) {
        errors.email = "El correo es obligatorio"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Correo no válido"
    }

    //Validar password
    if(!values.password) {
        errors.password = "La contraseña es obligatoria"
    } else if (values.password.length < 6) {
        errors.password = "La contraseña debe ser de al menos 6 caracteres"
    }

    return errors;
}