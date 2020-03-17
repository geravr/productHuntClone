import React, { useEffect, useContext, useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';

import { TitleH1, TitleH5, DescriptionProduct, Divisor, Form } from '../../components/ui/StyledComponents';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBInput, MDBBtn } from 'mdbreact';

import Layout from '../../components/layout/Layout';
import Spinner from '../../components/layout/Spinner';
import Error404 from '../../components/layout/404';

import { FirebaseContext } from '../../firebase';

const Product = () => {

    // State del componente
    const [ product, setProduct ] = useState({});
    const [ error, setError ] = useState(false);

    //Routing para obtener el id actual
    const router = useRouter();
    const { query: { id }} = router;

    //Constext de firebase
    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        if (id) {
            const getProduct = async () => {
                const queryProduct = await firebase.db.collection('products').doc(id);
                const product = await queryProduct.get();
                if (product.exists) {
                    setProduct( product.data() );
                } else {
                    setError(true);
                }
            }
            getProduct();
        }
    }, [id]);

    if (Object.keys(product).length === 0 && error === false) return (
        <Layout>
            <Spinner/>
        </Layout>
    )

    const { comments, date, description, company, name, url, imageUrl, productVotes } = product;

    return ( 
        <Layout>
            <Fragment>
                {error && <Error404 />}
                <MDBContainer>
                    <MDBRow>
                    <MDBCol md="12">
                        <TitleH1>{name}</TitleH1>
                    </MDBCol>
                    <MDBCol md="8">
                        <MDBCard className="px-4 py-2">
                            <MDBRow>
                                <MDBCol md="12" className="my-2">
                                    <p className="black-text">
                                    Publicado hace:{" "}
                                    {formatDistanceToNow(new Date(date), { locale: es })}
                                    </p>
                                </MDBCol>
                                <MDBCol md="12" className="my-2">
                                    <img src={imageUrl} className="img-fluid" alt="name" />
                                </MDBCol>
                                <MDBCol md="12">
                                <Divisor />
                                    <DescriptionProduct>
                                        {description}
                                    </DescriptionProduct>
                                </MDBCol>
                            </MDBRow>
                        </MDBCard>
                        <p className="mt-4 mb-0 dark-grey-text">Discusión</p>
                        <MDBCard className="px-4 py-2">
                            <Form className="row mb-4">
                                <MDBCol md="12" className="my-2">
                                    <TitleH5>Agrega tu comentario</TitleH5>
                                </MDBCol>
                                    <MDBCol md="12">
                                        <MDBInput hint="¿Qué piensas de este producto?" type="text" />
                                    </MDBCol>
                                    <MDBCol md="12">
                                        <MDBBtn block type="submit" color="orange darken-4">
                                            Enviar
                                        </MDBBtn>
                                    </MDBCol>
                            </Form>
                            <TitleH5>Comentarios</TitleH5>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="4">
                        <MDBRow>

                        </MDBRow>
                    </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </Fragment>
        </Layout>
     );
}
 
export default Product;