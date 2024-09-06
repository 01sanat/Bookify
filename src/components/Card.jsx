import React , {useState,useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from '../context/firebase';
const BookCard = (props) => {
   const firebase = useFirebase();
   const [url,setUrl] = useState(null);

   useEffect(()=>{
    firebase.getImageUrl(props.imageURL).then((imageUrl)=> {
        setUrl(imageUrl)});
   },[])

  return  (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={url} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          This Book has a title {props.name} and this book is sold by {props.userDisplayName} and this books costs Rs. {props.price}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default BookCard