import React, { useState } from 'react'
import Layout from '../components/layout/Layout'
import Router from 'next/router';
import { Form, Input, InputSubmitForm, H1Center, Error, Success } from '../components/ui/StyledComponents';

import firebase from '../firebase';

// Validaciones
import useValidation from '../hooks/useValidation';
import validateLogin from '../validation/validateLogin';


const INITIAL_STATE = {
  email: '',
  password: ''
}


const Login = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { values, errors, handleSubmit, handleChange } = useValidation(INITIAL_STATE, validateLogin, login);

  const { email, password } = values;

  // Crear cuenta en firebase
async function login() {
  try {
    const user = await firebase.login(email, password);
    console.log(user);
    setTimeout(() => {
      Router.push('/');
    }, 1500);
    setError(false);
    setSuccess(true);
  } catch (error) {
    console.error('Hubo un error al autenticar el usuario', error.message);
    setError(error.message);
  }
}

  return (
    <div>
      <Layout>
        <>
          <H1Center>Iniciar Sesión</H1Center>
          <Form
          onSubmit={handleSubmit}
          noValidate
          >
            { errors.email && <Error>{errors.email}</Error>}
            {error && <Error>{error}</Error> }
            <Input>
              <label htmlFor="email">Correo</label>
              <input
              type="email"
              id="email"
              placeholder="Tu correo"
              name="email"
              value={email}
              onChange={handleChange}
              />
            </Input>

            { errors.password && <Error>{errors.password}</Error>}
            <Input>
              <label htmlFor="password">Contraseña</label>
              <input
              type="password"
              id="password"
              placeholder="Tu contraseña"
              name="password"
              value={password}
              onChange={handleChange}
              />
            </Input>
            <InputSubmitForm
            type="submit"
            value="Iniciar sesión"
            />
          </Form>
          {success && <Success>Bienvenid@</Success> }
        </>
      </Layout>
    </div>
  )
}

export default Login;Login