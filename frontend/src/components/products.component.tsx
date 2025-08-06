import React, { useEffect, useState } from 'react';

import ProductComponent from './product.component';
import type { Product } from '../types';
import Search from './search.component';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    console.log(searchText);
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:3000/products');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        setProducts(searchText === "" ? 
          data.products : 
          data.products.filter(
            product => product.name.toLowerCase().includes(searchText.toLowerCase())
          )
        );
      }
      catch (err: any) {
        setError(err);
      }
      finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [loading, searchText]);

  return (
    <>
      <Search updateSearch={setSearchText} />
      <div className=' p-5 d-flex flex-wrap justify-content-center'>
        {products.map(product => 
          <ProductComponent key={product.name} {...product} />
        )}
      </div>
    </>
  )
}

export default Products