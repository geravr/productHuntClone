import app from 'firebase/app';
import 'firebase/auth'
import firebaseConfig from './config';

class Firebase {
    constructor() {
        if(!app.apps.length) {
            app.initializeApp(firebaseConfig);
        }
        this.auth = app.auth();
    }

    // Registra un usuario
    async register(name, email, password) {
        const newUser = await this.auth.createUserWithEmailAndPassword(email, password);

        return await newUser.user.updateProfile({
            displayName : name
        })
    }

    // Inicia sesión de un usuario
    async login(email, password) {
      return this.auth.signInWithEmailAndPassword(email, password)
      
    }

}

const firebase = new Firebase();
export default firebase;