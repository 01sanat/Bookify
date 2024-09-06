import { initializeApp } from "firebase/app";
import { createContext, useContext ,useState  , useEffect} from "react";
import {getAuth , createUserWithEmailAndPassword , signInWithEmailAndPassword , GoogleAuthProvider , 
  signInWithPopup , onAuthStateChanged} from 'firebase/auth'

import {getFirestore , collection , addDoc ,getDoc, doc, getDocs } from 'firebase/firestore'  
import { getStorage ,ref ,uploadBytes , getDownloadURL } from "firebase/storage";


const FirebaseContext = createContext(null);


const firebaseConfig = {
    apiKey: "AIzaSyBSjpo_rCx31XZMvWhLzm758UrxsaY2VPk",
    authDomain: "bookify-a0dc5.firebaseapp.com",
    projectId: "bookify-a0dc5",
    storageBucket: "bookify-a0dc5.appspot.com",
    messagingSenderId: "958572588904",
    appId: "1:958572588904:web:855e26c7358c53416970dd"
  };

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