import firebase from 'firebase/app';
import 'firebase/storage'

var firebaseConfig = {
    apiKey: process.env.REACT_APP_API_FIREBASE,
    authDomain: "onedam-bdeea.firebaseapp.com",
    databaseURL: "https://onedam-bdeea.firebaseio.com",
    projectId: "onedam-bdeea",
    storageBucket: "onedam-bdeea.appspot.com",
    messagingSenderId: "618227478839",
    appId: "1:618227478839:web:ecd30bf068b7336832eab2"
  };
  
  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();

  export {storage, firebase as default}