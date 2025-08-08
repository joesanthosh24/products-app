import React, { useState } from "react";
import Button from "react-bootstrap/Button";

import PlaceholderImage from '../assets/placeholder-img.png';

interface ProductFormProps {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    disabledFields: boolean;
    submit: (name: string, description: string, price: number, imageUrl: string) => void
}

const ProductForm: React.FC<ProductFormProps> = ({ name, description, price, imageUrl, disabledFields, submit }) => {
  const [productImageUrl, setProductImageUrl] = useState(imageUrl);
  const [productPrice, setProductPrice] = useState(price);
  const [productName, setProductName] = useState(name);
  const [productDescription, setProductDescription] = useState(description);

  return (
    <div className="d-flex">
        <img 
            src={productImageUrl ? productImageUrl : PlaceholderImage} 
            width='50%' 
            height='650px' 
            className="border border-info m-2" 
            alt={productImageUrl ? "New Image" : "Placeholder Iamge"}
        />
        <div className="inputs d-flex flex-column m-2 w-50">
            <div className="d-flex align-items-center">
                <p>Name: </p>
                <input type="text" name="name" value={productName} onChange={(event) => setProductName(event.target.value)} id="name" className="mb-3 w-75 ms-auto" disabled={disabledFields} />
            </div>
            <div className="d-flex align-items-center">
                <p>Price: </p>
                <input type="number" name="price" value={productPrice} id="price" onChange={(event) => setProductPrice(Number(event.target.value))} className="mb-3 w-75 ms-auto" />
            </div>
            <div className="d-flex align-items-center">
                <p>Description: </p>
                <input type="text" name="description" value={productDescription} onChange={(event) => setProductDescription(event.target.value)} id="description" className="mb-3 w-75 ms-auto" disabled={disabledFields} />
            </div>
            <div className="d-flex align-items-center">
                <p>Image URL: </p>
                <input type="text" name="imageUrl" value={productImageUrl} onChange={(event) => setProductImageUrl(event.target.value)} id="imageUrl" className="mb-3 w-75 ms-auto" />
            </div>
            <Button variant="warning" className="text-white fs-5" onClick={() => submit(productName, productDescription, productPrice, productImageUrl)}>Submit</Button>
        </div>
    </div>
  )
}

export default ProductForm