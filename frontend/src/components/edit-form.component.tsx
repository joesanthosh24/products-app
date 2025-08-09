import React, { useEffect } from "react";
import { useLocation, useParams, useNavigate } from 'react-router';
import { editProduct } from "../api/products";
import { useDispatch, useSelector } from "react-redux";
import ProductForm from "./product-form.component";
import type { RootState } from '../store/store';

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

  const user = useSelector((state: RootState) => state.user.currentUser);

  useEffect(() => {
    if (user && !user.isAdmin) {
      navigate('/');
    }
  }, []);

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