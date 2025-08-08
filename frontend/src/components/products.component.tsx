import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Toast from 'react-bootstrap/Toast';
import { X } from 'react-bootstrap-icons';
import { useSelector, useDispatch } from 'react-redux';

import ProductComponent from './product.component';
import { type SortBy, type Product } from '../types';
import Search from './search.component';
import Filters from './filters.component';
import { fetchAllProducts } from '../api/products';
import { type RootState, type AppDispatch } from '../store/store';

interface ProductsProps {
  itemsPerPage: number
}

const Products: React.FC<ProductsProps> = ({ itemsPerPage }) => {
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortBy>({category: "name", ascending: true})
  const [itemOffset, setItemOffset] = useState(0);
  const [updateMessage, setUpdateMessage] = useState("");
  const [showToaster, setShowToaster] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

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
    if (updateMessage) {
      setShowToaster(true);
    }

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
      <Toast 
        show={showToaster} 
        onClose={() => setShowToaster(false)} 
        bg='success' 
        delay={5000} 
        autohide
        style={{ position: "absolute", left: "40%", top: "5px" }}
        animation={true}
      >
        <Toast.Body className='d-flex justify-content-between align-items-center text-white'>
          <span>{updateMessage}</span>
          <X size={20} cursor="pointer" onClick={() => setShowToaster(false)} />
        </Toast.Body>
      </Toast>
      <Search updateSearch={setSearchText} />
      <Filters handleClick={handleFilterChange} sortCategory={sortBy.category} />
      <div className=' p-5 d-flex flex-wrap justify-content-center'>
        {currentItems.map(product => 
          <ProductComponent messageUpdate={setUpdateMessage} key={product._id} id={product._id} {...product} />
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