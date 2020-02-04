import React from 'react';
import Header from './Header';
import { Global } from '@emotion/core';
import Head from 'next/head';

//MDBReact
import { MDBContainer } from 'mdbreact';


const Layout = props => {
    return ( 
        <>

            <Global />

            <Head>
                <html lang="es" />
                <title>Product Hunt Firebase & Next.js</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU=" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css?family=PT+Sans:400,700|Roboto+Slab:400,700&display=swap" rel="stylesheet" />
                <link href="/static/css/app.css" rel="stylesheet" />
            </Head>

            <Header />

            <main>
                <MDBContainer>
                    {props.children}
                </MDBContainer>
            </main>
        </>

     );
}
 
export default Layout;