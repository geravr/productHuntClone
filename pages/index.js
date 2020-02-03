import React, { useEffect, useState, useContext } from 'react';
import Layout from '../components/layout/Layout';
import { FirebaseContext } from '../firebase';


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
      <h1>Inicio</h1>
    </Layout>
    </div>
  )
}

export default Home;
