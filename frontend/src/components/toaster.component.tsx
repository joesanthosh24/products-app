import React from 'react';
import Toast from 'react-bootstrap/Toast';
import { X } from 'react-bootstrap-icons';
import { useSelector, useDispatch } from 'react-redux';

import type { RootState, AppDispatch } from '../store/store';
import { hideToast } from '../store/toast/toasts.slice';

const Toaster: React.FC = () => {
  const toasterState = useSelector((state: RootState) => state.toaster);
  const dispatch = useDispatch<AppDispatch>();

  return (
      <Toast 
        show={toasterState.show} 
        onClose={() => dispatch(hideToast())} 
        bg={toasterState.messageObj.color} 
        delay={4000} 
        autohide
        style={{ position: "absolute", left: "40%", top: "5px" }}
        animation={true}
      >
        <Toast.Body className='d-flex justify-content-between align-items-center text-white'>
          <span>{toasterState.messageObj.message}</span>
          <X size={20} cursor="pointer" onClick={() => dispatch(hideToast())} />
        </Toast.Body>
      </Toast>
  )
}

export default Toaster