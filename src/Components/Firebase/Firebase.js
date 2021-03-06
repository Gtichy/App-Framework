import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const prodConfig = {
  apiKey: process.env.REACT_APP_PROD_API_KEY,
  authDomain: process.env.REACT_APP_PROD_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_PROD_DATABASE_URL,
  projectId: process.env.REACT_APP_PROD_PROJECT_ID,
  storageBucket: process.env.REACT_APP_PROD_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_PROD_MESSAGING_SENDER_ID,
};

const devConfig = {
  apiKey: process.env.REACT_APP_DEV_API_KEY,
  authDomain: process.env.REACT_APP_DEV_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DEV_DATABASE_URL,
  projectId: process.env.REACT_APP_DEV_PROJECT_ID,
  storageBucket: process.env.REACT_APP_DEV_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_DEV_MESSAGING_SENDER_ID,
};

const config =
  process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export const firebaseApp = app.initializeApp(config);
export const firebaseAuth = firebaseApp.auth();
export const firebaseDb = firebaseApp.database();

class Firebase {
    constructor() {
      this.auth = firebaseAuth;
      this.db = firebaseDb;
    }

    // *** Auth API 

    doCreateUserWithEmailAndPassword = (email, password) =>
      this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) => 
      this.auth.signInWithEmailAndPassword(email, password);
    
    doSignOut = () => 
      this.auth.signOut();

    doPasswordReset = email => 
      this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password => 
      this.auth.currentUser.updatePassword(password);
    
    // User API 
    user = uid => this.db.ref(`users/${uid}`);
    users = () => this.db.ref('users');

    // Lead API
    lead = lid => this.db.ref(`leads/${lid}`);
    leads = () => this.db.ref('leads');
  }

  export default Firebase;