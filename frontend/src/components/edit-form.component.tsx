import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from 'react-router';
import Button from 'react-bootstrap/Button';
import { editProduct } from "../api/products";
import { useDispatch } from "react-redux";
import ProductForm from "./product-form.component";

const EditForm: React.FC = () => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name, description, price, imageUrl } = location.state || {};

  const handleSubmit = async (name, description, price, imageUrl) => {
    await dispatch(editProduct({ id: params.id, price, imageUrl }));
    navigate("/");
  }

  return <ProductForm
    name={name}
    description={description}
    price={price}
    imageUrl={imageUrl}
    disabledFields={true}
    submit={handleSubmit}
  />
}

export default EditForm