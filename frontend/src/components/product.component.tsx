import React from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

import { type AppDispatch } from '../store/store';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { deleteProduct, fetchAllProducts } from '../api/products';

interface ProductProps {
  id: string,
  name: string,
  price: number,
  description: string,
  imageUrl: string,
  messageUpdate: (msg: string) => void,
}

const Product: React.FC<ProductProps> = ({ 
  id, 
  name, 
  price, 
  description, 
  imageUrl,
  messageUpdate
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleEditClick = async () => {
    navigate(`/edit/${id}`, { 
      state: { name, price, description, imageUrl }
    });
  }
  
  const handleDeleteClick = async () => {
    const result = await dispatch(deleteProduct({ id }));

    if (deleteProduct.fulfilled.match(result)) {
      dispatch(fetchAllProducts()); // refetch to stay consistent
    } else {
      // optionally handle errors
      console.error("Delete failed:", result.payload || result.error);
    }
  }

  return (
    <div className='mb-4 p-3'>
      <Card className='h-100 d-flex flex-column border border-secondary-subtle' style={{ width: '20rem', height: '100%' }}>
        <Card.Img 
          src={imageUrl} 
          variant='top'
          className='border-bottom border-secondary-subtle'
          style={{height: '15rem', objectFit: 'cover' }}
        />
        <Card.Body className='d-flex flex-column bg-secondary text-white'>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <div className='d-flex justify-content-start align-items-center mt-auto'>
            <Button variant='danger' className='me-2' onClick={handleDeleteClick}>Delete</Button>
            <Button variant='warning' onClick={handleEditClick}>Edit</Button>
            <p className='mb-0 ms-auto'>${price}</p>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Product