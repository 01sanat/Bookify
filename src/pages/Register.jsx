import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/firebase';
import { useNavigate } from 'react-router';

const RegisterPage =  () => {
    const firebase = useFirebase();
    const [email , setEmail] = useState('');
    const [password , setpassword] = useState('');
    
    const handleSubmit = async(e)=>{
      e.preventDefault();
      console.log('signin up a user....')
      const result = await firebase.singupUserWithEmailAndPassword(email,password)
      console.log("Successfull ",result);
    }
    const navigate = useNavigate();
    useEffect(()=>{
      if(firebase.isLoggedIn){
          navigate('/')
          //navigate to home
      }

  },[firebase.isLoggedIn , navigate])

  return (
    <div className='container mt-5'>
        <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"  onChange={e => setpassword(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit" >
        Submit
      </Button>
    </Form>
    </div>
  )
}

export default RegisterPage