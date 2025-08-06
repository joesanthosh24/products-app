import React, { type ChangeEvent } from 'react';
import { Search } from 'react-bootstrap-icons';

interface SearchProps {
  updateSearch: (text: string) => void
}

const SearchComponent: React.FC<SearchProps> = ({ updateSearch }) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateSearch(event.target.value);
  }
  return (
    <div className='pt-5 ps-5 d-flex justify-content-center align-items-center'>
      <div 
        className='border rounded-start-pill'
        style={{borderRightStyle: 'none', padding: '1px 6px 1px 6px' }}
      >
        <Search size={15} />
      </div>
      <input 
        type='text'
        className='border-top border-end border-bottom outline-none rounded-end-pill ps-2'
        style={{ borderLeftStyle: 'none', outline: 'none' }}
        onChange={handleInputChange}
      />
    </div>
  )
}

export default SearchComponent