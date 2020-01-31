import React, { useState } from 'react'
import Layout from '../components/layout/Layout'
import Router from 'next/router';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBBadge } from 'mdbreact';

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
    <Layout>
      <>
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6" className="mx-auto mt-5">
              <form onSubmit={handleSubmit} noValidate>
                <p className="h3 text-center mb-4">Registrarse</p>
                <div className="grey-text">
                  {errors.name && (
                    <MDBBadge color="danger">{errors.name}</MDBBadge>
                  )}
                  <MDBInput
                    label="Tu nombre"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    name="name"
                    id="name"
                    value={name}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <MDBBadge color="danger">{errors.email}</MDBBadge>
                  )}
                  {error && <MDBBadge color="danger">{error}</MDBBadge>}
                  <MDBInput
                    label="Tu correo"
                    icon="envelope"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <MDBBadge color="danger">{errors.password}</MDBBadge>
                  )}
                  <MDBInput
                    label="Tu contraseña"
                    icon="lock"
                    group
                    type="password"
                    validate
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                  />
                </div>
                <div className="text-center">
                  <MDBBtn type="submit" color="elegant">
                    Crear cuenta
                  </MDBBtn>
                </div>
              </form>
              {success && (
                <MDBBadge color="success">Cuenta creada correctamente</MDBBadge>
              )}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
    </Layout>
  );
}

export default NewAccount;