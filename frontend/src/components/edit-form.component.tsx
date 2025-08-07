import React, { useState } from "react";
import { useLocation, useParams } from 'react-router';
import Button from 'react-bootstrap/Button';

const EditForm: React.FC = () => {
  const location = useLocation();
  const params = useParams();
  const { name, description, price, imageUrl } = location.state || {};

  const [productImageUrl, setProductImageUrl] = useState(imageUrl);
  const [productPrice, setProductPrice] = useState(price);

  const handleSubmit = async () => {
    await fetch(`http://localhost:3000/products/${params.id}/edit`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({price: productPrice, imageUrl: productImageUrl})
    });
  }

  return (
    <div className="d-flex">
        <img src={productImageUrl ? productImageUrl : null} width='50%' height='650px' className="border border-info m-2" />
        <div className="inputs d-flex flex-column m-2 w-50">
            <div className="d-flex align-items-center">
                <p>Name: </p>
                <input type="text" name="name" value={name} id="name" className="mb-3 w-75 ms-auto" disabled />
            </div>
            <div className="d-flex align-items-center">
                <p>Price: </p>
                <input type="number" name="price" value={productPrice} id="price" onChange={(event) => setProductPrice(Number(event.target.value))} className="mb-3 w-75 ms-auto" />
            </div>
            <div className="d-flex align-items-center">
                <p>Description: </p>
                <input type="text" name="description" value={description} id="description" className="mb-3 w-75 ms-auto" disabled />
            </div>
            <div className="d-flex align-items-center">
                <p>Image URL: </p>
                <input type="text" name="imageUrl" value={productImageUrl} onChange={(event) => setProductImageUrl(event.target.value)} id="imageUrl" className="mb-3 w-75 ms-auto" />
            </div>
            <Button variant="warning" className="text-white fs-5" onClick={handleSubmit}>Submit</Button>
        </div>
    </div>
  )
}

export default EditForm