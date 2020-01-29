import React, { useState, useEffect } from 'react';

const useValidation = (initialState, validate, fn) => {

    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [submitForm, setSubmitForm] = useState(false);

    useEffect(() => {
        if(submitForm) {
            const withoutErrors = Object.keys(errors).length === 0;

            if(withoutErrors) {
                fn(); // fn = Función que se ejecuta en el componente
            }
            setSubmitForm(false);
        }
    }, [errors]);

    //Función que se ejecuta conforme el usuario escribe algo
    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name] : e.target.value
        })
    }

    // Función que se ejecuta cuando el usuario hace submit
    const handleSubmit = e => {
        e.preventDefault();
        const errorsValidation = validate(values);
        setErrors(errorsValidation);
        setSubmitForm(true);
    }

    return {
        values,
        errors,
        handleSubmit,
        handleChange
    };
}
 
export default useValidation;