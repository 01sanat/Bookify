import React , {useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from "../context/firebase";
import { useNavigate } from 'react-router-dom'
import SuccessModal from "../components/Success";


 const ListingPage = () => {
  const [name,setName] = useState('');
  const [isbnNumber,setisbnNumber] = useState('');
  const [price,setPrice] = useState('');
  const [coverPic, setCoverPic] = useState('');
  const [showSuccess,setShowSuccess] = useState(false);
  const firebase = useFirebase();
  const navigate = useNavigate();
  
  const handleSubmit = async(e)=>{

    e.preventDefault();
    await firebase.handleCreateNewListing(name,isbnNumber,price,coverPic);
    setisbnNumber("");
    setName("");
    setPrice("");
    setCoverPic("");
    setShowSuccess(true);
    
    // return navigate('/')
  }
  return (
<div className='container mt-5'>
        {!showSuccess && <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Book Name</Form.Label>
        <Form.Control 
        onChange={e => setName(e.target.value)} 
        type="text"
         placeholder="Enter Name"
          value={name} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>ISBN</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="ISBN Number" 
        value = {isbnNumber}
        onChange={e => setisbnNumber(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Price</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Price " 
        value = {price}
        onChange={e => setPrice(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>coverPic</Form.Label>
        <Form.Control 
        type="file"
        // accept=".jpeg"
        onChange={e => setCoverPic(e.target.files[0])}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit" >
        Create
      </Button>
    </Form>}


    {showSuccess && 
    <SuccessModal handleClose={()=>{setShowSuccess(false)}}/> }
    </div>
  )
}

export default ListingPage;