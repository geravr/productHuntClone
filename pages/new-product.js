import React, { useState, useContext, useEffect } from 'react'
import Layout from '../components/layout/Layout'
import Router, { useRouter } from 'next/router';
import FileUploader from 'react-firebase-file-uploader';
import { Form, Input, InputSubmitForm, H1Center, Error, Success } from '../components/ui/StyledComponents';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput, MDBBadge } from 'mdbreact';

import { FirebaseContext } from '../firebase';

// Validaciones
import useValidation from '../hooks/useValidation';
import validateNewProduct from '../validation/validateNewProduct';
import firebaseConfig from '../firebase/config';

const INITIAL_STATE = {
  name: '',
  company: '',
  //image: '',
  url: '',
  description: ''
}


const NewProduct = () => {

  // State de imagenes
  const [ imageName, setImageName ] = useState('Selecciona una imagen');
  const [ uploading, setUploading ] = useState(false);
  const [ progress, setProgress ] = useState(0);
  const [ imageUrl, setImageUrl ] = useState('');

  const handleUploadStart = () => {
    setProgress(0);
    setUploading(true);
  };

  const handleProgress = progress => setProgress({ progress });

  const handleUploadError = error => {
    setUploading(error);
    console.log(error);
  };
  
  const handleUploadSuccess = name => {
    setProgress(100);
    setUploading(false);
    setImageName(name);
    firebase
        .storage
        .ref("products")
        .child(name)
        .getDownloadURL()
        .then(url => {
          console.log(url);
          setImageUrl(url);
        });
  };


  // const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { values, errors, handleSubmit, handleChange } = useValidation(INITIAL_STATE, validateNewProduct, newProduct);

  const { name, company, image, url, description } = values;

  // Hook de routing para redireccionar
  const router = useRouter();

  // Context con operaciones crud de firebase
  const { user, firebase } = useContext(FirebaseContext);

  async function newProduct() {
    // Si el usuario no está autenticado llevar a login
    if(!user) {
     return router.push('/login')
    }

    // Crear objeto de nuevo producto
    const product = {
      name,
      company,
      imageUrl,
      description,
      productVotes : 0,
      comments: [],
      date: Date.now()
    }

    // Insertar en la base de datos
    firebase.db.collection('products').add(product);
    return router.push('/')
  }

  //Path de imagen
  const [ currentPathImage, setCurrentPathImage ] = useState('Selecciona una imagen');
  useEffect(() =>{
      if (document.getElementById('image').files[0] != undefined) {
        setCurrentPathImage(document.getElementById('image').files[0].name);
      }
  });

  return (
    <div>
      <Layout>
        <>
          <MDBContainer>
            <MDBRow>
              <MDBCol md="6" className="mx-auto mt-5">
                <Form onSubmit={handleSubmit} noValidate>
                  <p className="h3 text-center mb-4">Nuevo producto</p>
                  <div className="grey-text">
                    {errors.name && (
                      <MDBBadge color="danger">{errors.name}</MDBBadge>
                    )}
                    <MDBInput
                      label="Nombre del producto"
                      icon="user"
                      group
                      type="text"
                      validate
                      error="wrong"
                      success="right"
                      id="name"
                      name="name"
                      value={name}
                      onChange={handleChange}
                    />
                    {errors.company && (
                      <MDBBadge color="danger">{errors.company}</MDBBadge>
                    )}
                    <MDBInput
                      label="Nombre de empresa"
                      icon="envelope"
                      group
                      type="text"
                      validate
                      error="wrong"
                      success="right"
                      id="company"
                      name="company"
                      value={company}
                      onChange={handleChange}
                    />
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroupFileAddon01">
                          Upload
                        </span>
                      </div>
                      <div className="custom-file">
                        <FileUploader
                        className="custom-file-input"
                        accept="image/*"
                        id="image"
                        name="image"
                        randomizeFilename
                        storageRef={firebase.storage.ref("products")}
                        onUploadStart={handleUploadStart}
                        onUploadError={handleUploadError}
                        onUploadSuccess={handleUploadSuccess}
                        onProgress={handleProgress}
                      />
                        <label className="custom-file-label">
                          {currentPathImage}
                        </label>
                      </div>
                    </div>
                    <Input>
                    </Input>
                    {errors.url && (
                      <MDBBadge color="danger">{errors.url}</MDBBadge>
                    )}
                    <MDBInput
                      label="URL de producto"
                      icon="tag"
                      group
                      type="url"
                      validate
                      error="wrong"
                      success="right"
                      id="url"
                      name="url"
                      value={url}
                      onChange={handleChange}
                    />
                    {errors.description && (
                      <MDBBadge color="danger">{errors.description}</MDBBadge>
                    )}
                    <MDBInput
                      type="textarea"
                      rows="2"
                      label="Descripción"
                      icon="pencil-alt"
                      id="description"
                      name="description"
                      value={description}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="text-center">
                    <MDBBtn color="elegant" type="submit">
                      Crear producto{" "}
                      <MDBIcon far icon="paper-plane" className="ml-1" />
                    </MDBBtn>
                  </div>
                </Form>
                {success && (
                  <MDBBadge color="success">
                    Producto creado correctamente
                  </MDBBadge>
                )}
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </>
      </Layout>
    </div>
  );
}

export default NewProduct;