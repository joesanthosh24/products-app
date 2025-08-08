import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router';
import { useDispatch } from "react-redux";

import ProductForm from "./product-form.component";
import { addProduct } from "../api/products";

const CreateForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name, description, price, imageUrl } = location.state || {};

  const handleSubmit = async (name, description, price, imageUrl) => {
    await dispatch(addProduct({ price, imageUrl, name, description }));
    navigate("/");
  }

  return <ProductForm 
    name={name} 
    imageUrl={imageUrl} 
    price={price}
    description={description} 
    disabledFields={false}
    submit={handleSubmit}
  />
}

export default CreateForm
