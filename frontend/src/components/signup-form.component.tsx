import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { type AppDispatch, type RootState } from '../store/store';

import type { AuthFormProp } from '../types';
import { userSignUp } from '../api/user-auth';

const SignUpForm: React.FC<AuthFormProp> = ({ changeForm }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(userSignUp({ username, email, password, isAdmin: false }));
  }

  return (
    <Form className='d-flex flex-column p-5 w-75 ms-auto me-auto mt-5'>
      <h1 className='align-self-center p-2'>Sign Up Form</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicUserName">
        <Form.Label>User Name</Form.Label>
        <Form.Control type="username" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>
      <div className='d-flex align-items-center'>
        <Button variant="primary" type="submit" className='me-2' onClick={handleSubmit}>
          Submit
        </Button>
        <p className='mt-3'>Already Have Account? <span className='text-primary cursor-pointer' role='button' onClick={() => changeForm("log-in")}>Log In</span></p>
      </div>
    </Form>
  )
}

export default SignUpForm