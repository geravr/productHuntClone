import App from 'next/app';
import firebase, { FirebaseContext } from '../firebase';
import useAuthentication from '../hooks/useAuthentication';

//MDB REACT
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

const MyApp = props => {
    const user = useAuthentication();
    const { Component, pageProps } = props;
    return (
        <FirebaseContext.Provider
        value={{
            firebase,
            user
        }}
        >
            <Component {...pageProps} />
        </FirebaseContext.Provider>
    )
}

export default MyApp;