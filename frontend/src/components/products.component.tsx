import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

import ProductComponent from './product.component';
import { type SortBy, type Product } from '../types';
import Search from './search.component';
import PaginatedItems from './paginated-items.component';
import ReactPaginate from 'react-paginate';

interface ProductsProps {
  itemsPerPage: number
}

const Products: React.FC<ProductsProps> = ({ itemsPerPage }) => {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortBy>({category: "name", ascending: true})
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  }

  useEffect(() => {
    console.log(searchText);
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:3000/products');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data: {products: Array<Product>} = await res.json();
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
  }, [sortBy, searchText]);

  return (
    <>
      <Search updateSearch={setSearchText} />
      <div className=' p-5 d-flex flex-wrap justify-content-center'>
        {currentItems.map(product => 
          <ProductComponent key={product.id} {...product} />
        )}
      </div>
       {pageCount > 1 && <ReactPaginate
            breakLabel="..."
            nextLabel="Next >"
            previousLabel="< Previous"
            pageRangeDisplayed={5}
            pageCount={pageCount}
            renderOnZeroPageCount={null}
            onPageChange={handlePageClick}
            containerClassName="pagination justify-content-center"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            activeClassName="active"
        />}
    </>
  )
}

export default Products