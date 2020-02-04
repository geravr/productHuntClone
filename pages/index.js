import React, { useEffect, useState, useContext } from 'react';
import Layout from '../components/layout/Layout';
import ProductDetails from '../components/layout/ProductDetails';
import { FirebaseContext } from '../firebase';

//MDB REACT
import {  MDBRow, MDBCard, MDBCardBody } from "mdbreact";

const Home = () => {

  const [products, setProducts] = useState([]);

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const getProducts = () => {
      firebase.db.collection('products').orderBy('date', 'desc').onSnapshot(manageSnapshot)
    }
    getProducts();
  }, [])

  function manageSnapshot(spanshot) {
    const products = spanshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    });
    setProducts(products);
  }

  return (
    <div>
      <Layout>
          <MDBCard
            className="my-5 px-5 mx-auto"
            style={{ fontWeight: 300, maxWidth: "90%" }}
          >
            <MDBCardBody style={{ paddingTop: 20 }}>
              <MDBRow>
                {products.map(product => (
                  <ProductDetails key={product.id} product={product} />
                ))}
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
      </Layout>
    </div>
  );
}

export default Home;
