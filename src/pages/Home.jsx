import React , {useEffect ,useState } from "react";
import { useFirebase } from "../context/firebase";
import BookCard from "../components/Card";


const HomePage = () => {
    const firebase = useFirebase();
    
    const [books , setBooks] = useState([]);
    useEffect(()=>{
        firebase.listAllBooks().then( (docs) => setBooks(docs.docs))
    },[])

    return (
            <div className="container mt-5 mb-5 d-flex justify-content-start flex-wrap gap-4" >{
         books.map((book)=>  <BookCard key={book.id} {...book.data()}/>)
         }</div>
    )
}


export default HomePage;