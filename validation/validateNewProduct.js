export default function validateNewProduct(values) {
    let errors = {};

    //Validar nombre de usuario
    if(!values.name) {
        errors.name = "El nombre del producto es obligatorio"
    }

    //Validar empresa
    if(!values.company) {
        errors.company = "Nombre de empresa es obligatorio"
    }

    //Validar url
    if(!values.url) {
        errors.url = "La URL del producto es obligatoria"
    } else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
        errors.url = "URL no válida"
    }

    //Validar descripción
    if(!values.description) {
        errors.description = "Agrega una descripción de tu producto"
    }

    return errors;
}