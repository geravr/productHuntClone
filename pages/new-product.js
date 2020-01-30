import React, { useState, useContext } from 'react'
import Layout from '../components/layout/Layout'
import Router, { useRouter } from 'next/router';
import FileUploader from 'react-firebase-file-uploader';
import { Form, Input, InputSubmitForm, H1Center, Error, Success } from '../components/ui/StyledComponents';

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
  const [ imageName, setImageName ] = useState('');
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


  const [error, setError] = useState(false);
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
          <H1Center>Nuevo Producto</H1Center>
          <Form onSubmit={handleSubmit} noValidate>
            <fieldset>
              <legend>Información General</legend>

              {errors.name && <Error>{errors.name}</Error>}
              <Input>
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Nombre del producto"
                  name="name"
                  value={name}
                  onChange={handleChange}
                />
              </Input>
              {errors.company && <Error>{errors.company}</Error>}
              <Input>
                <label htmlFor="company">Empresa</label>
                <input
                  type="text"
                  id="company"
                  placeholder="Nombre de empresa"
                  name="company"
                  value={company}
                  onChange={handleChange}
                />
              </Input>
              <Input>
                <label htmlFor="image">Imagen</label>
                <FileUploader
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
              </Input>
              {errors.url && <Error>{errors.url}</Error>}
              <Input>
                <label htmlFor="url">Empresa</label>
                <input
                placeholder="URL de tu producto"
                  type="url"
                  id="url"
                  name="url"
                  value={url}
                  onChange={handleChange}
                />
              </Input>
            </fieldset>
            <fieldset>
              <legend>
                Sobre tu producto
              </legend>
              {errors.description && <Error>{errors.description}</Error>}
              <Input>
                <label htmlFor="description">Descripción</label>
                <textarea
                  id="description"
                  placeholder="Nombre de empresa"
                  name="description"
                  value={description}
                  onChange={handleChange}
                />
              </Input>
            </fieldset>
            <InputSubmitForm type="submit" value="Crear producto" />
          </Form>
          {success && <Success>Cuenta creada correctamente</Success>}
        </>
      </Layout>
    </div>
  );
}

export default NewProduct;