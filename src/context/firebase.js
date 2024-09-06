import { initializeApp } from "firebase/app";
import { createContext, useContext ,useState  , useEffect} from "react";
import {getAuth , createUserWithEmailAndPassword , signInWithEmailAndPassword , GoogleAuthProvider , 
  signInWithPopup , onAuthStateChanged} from 'firebase/auth'

import {getFirestore , collection , addDoc ,getDoc, doc, getDocs } from 'firebase/firestore'  
import { getStorage ,ref ,uploadBytes , getDownloadURL } from "firebase/storage";

const FirebaseContext = createContext(null);


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
  };
console.log(firebaseConfig);

  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const firebaseAuth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

const firestoreDb = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);




export const useFirebase = () => {
    return useContext(FirebaseContext);
} 

export const FirebaseProvider = (props) => {
  const [user,setUser] = useState(null);
  useEffect(()=>{
    onAuthStateChanged(firebaseAuth,(user)=>{
      if(user){
        setUser(user);
      }else{
        setUser(null);
      }
    })
  },[])


  const isLoggedIn = user ? true : false;

    const singupUserWithEmailAndPassword = (email,password) => {

       return createUserWithEmailAndPassword(firebaseAuth,email,password);
    }

    const singinUserWithEmailAndPassword = (email,password) => {
      return signInWithEmailAndPassword(firebaseAuth,email,password);
    }
    
    const singinUserWithGoogle = () => {
      return signInWithPopup(firebaseAuth,provider);
    }


    const handleCreateNewListing = async (name,isbn,price , cover) => {
      const imageRef = ref(storage,`upload/images/${Date.now()}-${cover.name}`);
      const uploadResult = await uploadBytes(imageRef,cover);
     return await addDoc(collection(firestoreDb,'books'),{
        name,
        isbn,
        price,
        imageURL : uploadResult.ref.fullPath,
        userId : user.uid,
        userEmail : user.email,
        userDisplayName : user.displayName,
        userPhotoUrl : user.photoURL
      })
    } 

    const listAllBooks = async() => {
      return  getDocs(collection(firestoreDb,'books'));
    }

    const getImageUrl = (path) => {
      return  getDownloadURL(ref(storage,path))
    }

    return <FirebaseContext.Provider value={{singupUserWithEmailAndPassword , singinUserWithEmailAndPassword , singinUserWithGoogle , isLoggedIn ,handleCreateNewListing ,listAllBooks , getImageUrl }}>
      {props.children}
    </FirebaseContext.Provider>
} 