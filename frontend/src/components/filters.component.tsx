import Button from "react-bootstrap/Button";
import { ArrowDownUp } from 'react-bootstrap-icons';
import type React from "react";

interface FiltersProps {
    handleClick: (filter: string) => void
    sortCategory: string
}

const Filters: React.FC<FiltersProps> = ({ handleClick, sortCategory }) => {
  return (
    <div className='ps-5 pt-5 d-flex justify-content-center align-items-center'>
        <span className='me-3'>Filters: </span>
        <Button 
          variant='light' 
          className={`me-3 ${sortCategory === 'name' ? 'active': ''}`}
          onClick={() => handleClick("name")}
        >
          Name <ArrowDownUp  />
        </Button>
        <Button 
          variant='light' 
          className={`${sortCategory === 'price' ? 'active': ''}`}
          onClick={() => handleClick("price")}
        >
          Price <ArrowDownUp  />
        </Button>
      </div>
  )
}

export default Filters