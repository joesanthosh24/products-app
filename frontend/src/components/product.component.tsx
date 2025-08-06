import type React from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

interface ProductProps {
  name: string,
  price: number,
  description: string,
  imageUrl: string
}

const Product: React.FC<ProductProps> = ({ name, price, description, imageUrl }) => {
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
          <div className='d-flex justify-content-between align-items-center mt-auto'>
            <Button variant='danger'>Delete</Button>
            <p className='mb-0'>${price}</p>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Product