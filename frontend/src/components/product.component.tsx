import React, { useEffect } from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

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
  const handleEditClick = async () => {
    try {
      const response = await fetch(`http://localhost:3000/products/${id}/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, price, imageUrl })
      });

      const resJSON = await response.json();

      if (!response.ok) {
        messageUpdate(resJSON.errorMsg);
      } else {
        messageUpdate(resJSON.message);
      }
    }
    catch(err) {
      messageUpdate(`Unexpecteder error occured: ${err}`)
    }
  }
  
  const handleDeleteClick = async () => {
    try {
      const response = await fetch(`http://localhost:3000/products/${id}/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const resJSON = await response.json();

      if (!response.ok) {
        messageUpdate(resJSON.errorMsg);
      } else {
        messageUpdate(resJSON.message);
      }
    }
    catch(err) {
      messageUpdate(`Unexpecteder error occured: ${err}`)
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