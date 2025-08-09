import React, { useEffect, useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import type { AuthFormProp } from '../types';

import type { AppDispatch, RootState } from '../store/store';

import { userLogin } from '../api/user-auth';

const LoginForm: React.FC<AuthFormProp> = ({ changeForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.currentUser);

  const navigate = useNavigate();

  useEffect(() => {
    if (user && !user.isAdmin) {
      navigate('/');
    }
  }, []);

  const handleLogin = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    dispatch(userLogin({ email, password }))
  }

  return (
    <Form className='d-flex flex-column p-5 w-75 ms-auto me-auto mt-5'>
        <h1 className='align-self-center p-2'>Login Form</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <div className='d-flex align-items-center'>
            <Button variant="primary" type="submit" className='me-2' onClick={handleLogin}>Submit</Button>
            <p className='mt-3'>Need to Create an Account? <span role='button' className='text-primary cursor-pointer' onClick={() => changeForm("sign-up")}>Sign Up</span></p>
        </div>
    </Form>
  )
}

export default LoginForm