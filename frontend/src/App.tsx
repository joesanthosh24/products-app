import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { jwtDecode, type JwtPayload } from 'jwt-decode';
import Button from 'react-bootstrap/Button'

import type { RootState, AppDispatch } from './store/store';

import { logout, setLoggedInUser } from './store/user/user.slice'

import Products from './components/products.component';
import AuthFormChoose from './components/auth-form-choose.component';

function App() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decoded: JwtPayload = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          // Token expired
          dispatch(logout());
        } else {
          dispatch(setLoggedInUser({ token, user: JSON.parse(localStorage.getItem('authUser')!) }));
        }
      } catch (err) {
        dispatch(logout());
      }
    }
  }, [dispatch]);

  return (
    user.isLoggedIn ? 
      <>
        <Button 
          className='position-absolute bg-white border-primary text-black' 
          style={{ top: '45px', right: '210px' }}
          onClick={() => {dispatch(logout())}}
        >
          Logout
        </Button>
        <Products itemsPerPage={6} />
      </> 
      : <AuthFormChoose />
  )
}

export default App
