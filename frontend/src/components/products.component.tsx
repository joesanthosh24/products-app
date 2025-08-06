import React, { useEffect, useState } from 'react';

import ProductComponent from './product.component';
import type { Product } from '../types';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Array<Product>>([]);

  useEffect(() => {
    setProducts([
      {
        name: 'Headphones',
        price: 115.99,
        description: 'High quality noise cancelling headphones',
        imageUrl: 'https://cdn.thewirecutter.com/wp-content/media/2023/07/bluetoothheadphones-2048px-0876.jpg'
      },
      {
        name: 'Headphones',
        price: 115.99,
        description: 'High quality noise cancelling headphones',
        imageUrl: 'https://cdn.thewirecutter.com/wp-content/media/2023/07/bluetoothheadphones-2048px-0876.jpg'
      },
      {
        name: 'Headphones',
        price: 115.99,
        description: 'High quality noise cancelling headphones',
        imageUrl: 'https://cdn.thewirecutter.com/wp-content/media/2023/07/bluetoothheadphones-2048px-0876.jpg'
      },
      {
        name: 'Headphones',
        price: 115.99,
        description: 'High quality noise cancelling headphones',
        imageUrl: 'https://cdn.thewirecutter.com/wp-content/media/2023/07/bluetoothheadphones-2048px-0876.jpg'
      },
      {
        name: 'Headphones',
        price: 115.99,
        description: 'High quality noise cancelling headphones',
        imageUrl: 'https://cdn.thewirecutter.com/wp-content/media/2023/07/bluetoothheadphones-2048px-0876.jpg'
      }
    ])
  }, [])

  return (
    <div className='mt-5 p-5 d-flex flex-wrap justify-content-between'>
      {products.map(product => 
        <ProductComponent {...product} />
      )}
    </div>
  )
}

export default Products