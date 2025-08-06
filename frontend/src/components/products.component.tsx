import React, { useEffect, useState } from 'react';

import ProductComponent from './product.component';
import { type SortBy, type Product } from '../types';
import Search from './search.component';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortBy>({category: "name", ascending: true})

  useEffect(() => {
    console.log(searchText);
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:3000/products');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        const dataToReturn = data.products.filter(product => {
          if (searchText === "") {
            return true;
          }

          return product.name.toLowerCase().includes(searchText.toLowerCase());
        })
          .sort((first: Product, second: Product) => {
            const categoryOfFirst = first[sortBy.category];
            const categoryOfSecond = second[sortBy.category];

            if (typeof categoryOfFirst === 'string' && typeof categoryOfSecond === 'string') {
              return sortBy.ascending
                ? categoryOfFirst.localeCompare(categoryOfSecond)
                : categoryOfSecond.localeCompare(categoryOfFirst);
            }

            if (typeof categoryOfFirst === 'number' && typeof categoryOfSecond === 'number') {
              return sortBy.ascending
                ? categoryOfFirst - categoryOfSecond
                : categoryOfSecond - categoryOfFirst;
            }

            return 0;
          })

        setProducts(dataToReturn);
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