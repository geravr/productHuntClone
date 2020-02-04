import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import Router from "next/router";
import { Form } from "../components/ui/StyledComponents";

import firebase from "../firebase";

// Validaciones
import useValidation from "../hooks/useValidation";
import validateLogin from "../validation/validateLogin";

//MDB REACT
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBBadge
} from "mdbreact";

const INITIAL_STATE = {
  email: "",
  password: ""
};

const Login = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { values, errors, handleSubmit, handleChange } = useValidation(
    INITIAL_STATE,
    validateLogin,
    login
  );

  const { email, password } = values;

  // Crear cuenta en firebase
  async function login() {
    try {
      const user = await firebase.login(email, password);
      console.log(user);
      setTimeout(() => {
        Router.push("/");
      }, 1500);
      setError(false);
      setSuccess(true);
    } catch (error) {
      console.error("Hubo un error al autenticar el usuario", error.message);
      setError(error.message);
    }
  }

  return (
    <div>
      <Layout>
        <>
          <MDBContainer>
            <MDBRow>
              <MDBCol md="6" className="mx-auto mt-5">
                <Form
                  onSubmit={handleSubmit}
                  noValidate
                  className="login-input"
                >
                  <p className="h3 text-center mb-4">Iniciar Sesión</p>
                  <div className="grey-text">
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
                      label="Contraseña"
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
                      Ingresar
                    </MDBBtn>
                  </div>
                </Form>
                {success && <MDBBadge color="success">Bienvenid@</MDBBadge>}
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </>
      </Layout>
    </div>
  );
};

export default Login;
Login;
