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
    <div>
      <Card className='p-0 mb-5 mr-5 border border-secondary-subtle' style={{ width: '20rem' }}>
        <Card.Img 
          src={imageUrl} 
          variant='top'
          className='border-bottom border-secondary-subtle'
        />
        <Card.Body className='bg-secondary text-white'>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <div className='d-flex justify-content-between align-items-center'>
            <Button variant='danger'>Delete</Button>
            <p>${price}</p>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Product