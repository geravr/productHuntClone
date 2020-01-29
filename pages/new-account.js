import React, { useState } from 'react'
import Layout from '../components/layout/Layout'
import Router from 'next/router';
import { Form, Input, InputSubmitForm, H1Center, Error, Success } from '../components/ui/StyledComponents';

import firebase from '../firebase';

// Validaciones
import useValidation from '../hooks/useValidation';
import validateNewAccount from '../validation/validateNewAccount';

const INITIAL_STATE = {
  name: '',
  email: '',
  password: ''
}

const NewAccount = () => {

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { values, errors, handleSubmit, handleChange } = useValidation(INITIAL_STATE, validateNewAccount, newAccount);

  const { name, email, password } = values;

  // Crear cuenta en firebase
  async function newAccount() {
    try {
      await firebase.register(name, email, password);
      setTimeout(() => {
        Router.push('/');
      }, 1500);
      setError(false);
      setSuccess(true);
    } catch (error) {
      console.error('Hubo un error al crear la cuenta', error.message);
      setError(error.message);
    }

  }

  return (
    <div>
      <Layout>
        <>
          <H1Center>Crear Cuenta</H1Center>
          <Form
          onSubmit={handleSubmit}
          noValidate
          >
            { errors.name && <Error>{errors.name}</Error>}
            <Input>
              <label htmlFor="name">Nombre</label>
              <input
              type="text"
              id="name"
              placeholder="Tu nombre"
              name="name"
              value={name}
              onChange={handleChange}
              />
            </Input>

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
            value="Crear cuenta"
            />
          </Form>
          {success && <Success>Cuenta creada correctamente</Success> }
        </>
      </Layout>
    </div>
  )
}

export default NewAccount;