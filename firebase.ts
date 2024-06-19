import {getApp,getApps,initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAaxNFhUuiUAsjr6ptjjy3BBRqt4hUnSR0",
  authDomain: "project-2024-11f8a.firebaseapp.com",
  projectId: "project-2024-11f8a",
  storageBucket: "project-2024-11f8a.appspot.com",
  messagingSenderId: "208950341831",
  appId: "1:208950341831:web:13472b397de7ef24114ee2"
  };
  
  // Initialize Firebase
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  const db = getFirestore(app);


  export {db};