import React, { useContext, useRef } from 'react'
import { Button, Container, Form, axios, toast } from '../import'
import Title from '../components/shared/Title'
import { getError } from '../utils';
import { useNavigate } from 'react-router-dom';
import { SIGN_IN } from '../actions';
import { Store } from '../Store';

function SignUp() {

    const nameRef = useRef("");
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const confirmPasswordRef = useRef("");

    const navigate = useNavigate();
    const { dispatch: ctxDispatch } = useContext(Store);

    const submitHandler = async (e) => {
        e.preventDefault();
       if(passwordRef.current.value !== confirmPasswordRef.current.value) {
           toast.error("Please Confirm Your Password !");
       }else{
       try {
        const { data } = await axios.post(`/api/v1/users/signup`, {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }) 
        ctxDispatch({type: SIGN_IN, payload: data})
        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate('/');
        toast.success(`Welcome ${nameRef.current.value} !`)
       } catch (err) {
        toast.error(getError(err));
       }
    }
    }

  return (
   <Container className="small-container">
      <Title title="SignIn Page"/>
      <h1 className='my-3'>Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3' controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control required ref={nameRef} name='name' placeholder='Enter your name'></Form.Control>
        </Form.Group>
        <Form.Group className='mb-3' controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' required ref={emailRef} name='email' placeholder='Enter your email'></Form.Control>
        </Form.Group>
        <Form.Group className='mb-3' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' required ref={passwordRef} name='password' placeholder='Enter your password'></Form.Control>
        </Form.Group>
        <Form.Group className='mb-3' controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type='password' required ref={confirmPasswordRef} name='confirmPassword' placeholder='Confirm your password'></Form.Control>
        </Form.Group>
        <div className="mb-3">
            <Button className="mb-3" type="submit">Sign Up</Button>
          </div>
      </Form>
   </Container>
  )
}

export default SignUp