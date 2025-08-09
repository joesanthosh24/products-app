import React, { useEffect } from "react";
import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from "react-redux";

import ProductForm from "./product-form.component";
import { addProduct } from "../api/products";
import type { RootState } from '../store/store';

const CreateForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name, description, price, imageUrl } = location.state || {};

  const user = useSelector((state: RootState) => state.user.currentUser);

  const handleSubmit = async (name, description, price, imageUrl) => {
    await dispatch(addProduct({ price, imageUrl, name, description }));
    navigate("/");
  }

  useEffect(() => {
    if (user && !user.isAdmin) {
      navigate('/');
    }
  }, []);

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
