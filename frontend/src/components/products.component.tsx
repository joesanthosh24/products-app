import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector, useDispatch } from 'react-redux';
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router';

import ProductComponent from './product.component';
import { type SortBy, type Product } from '../types';
import Search from './search.component';
import Filters from './filters.component';
import { fetchAllProducts } from '../api/products';
import { type RootState, type AppDispatch } from '../store/store';
import Toaster from './toaster.component';

interface ProductsProps {
  itemsPerPage: number
}

const Products: React.FC<ProductsProps> = ({ itemsPerPage }) => {
  const [searchText, setSearchText] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortBy>({category: "name", ascending: true})
  const [itemOffset, setItemOffset] = useState(0);

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const products = useSelector((state: RootState) => state.products.products
    .filter(product => {
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
  );

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;

    setItemOffset(newOffset);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(fetchAllProducts())
    }

    fetchProducts();
  }, [dispatch]);

  const handleFilterChange = (filterCategory: string) => {
    if (sortBy.category === filterCategory) {
      setSortBy({...sortBy, ascending: !sortBy.ascending});
    } else {
      setSortBy({ category: filterCategory, ascending: true });
    }
  }

  return (
    <>
      <Toaster />
      <Search updateSearch={setSearchText} />
      <Filters handleClick={handleFilterChange} sortCategory={sortBy.category} />
      <div className='position-absolute' style={{ top: '173px', left: '45%' }}>
        <Button variant='primary' onClick={() => navigate(`/addProduct`)}>Add Product</Button>
      </div>
      <div className='p-5 d-flex flex-wrap justify-content-center'>
        {currentItems.map(product => 
          <ProductComponent key={product._id} id={product._id} {...product} />
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