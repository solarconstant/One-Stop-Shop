import React, { useEffect, useState } from 'react';
import AdminNav from '../../../Components/Navbar/AdminNav';
import { toast } from 'react-toastify';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { createProduct } from '../../../Functions/product';
import CategoryForm from '../../../Components/Forms/CategoryForm';
import LocalSearch from '../../../Components/Forms/LocalSearch';

const ProductCreate = () =>
{
    const initialState = {
        title: '',
        description: '',
        price: '',
        category: '',
        subs: [],
        shipping: '',
        quantity: '',
        images: [],
        color: '',
        brand: '' 
    };
    const [values, setValues] = useState(initialState);
    const { user } = useSelector((state) => ({...state}));

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        createProduct(values, user.token)
        .then((res) => 
            {
                console.log(res);
                window.alert(`"${res.data.title}" is created`);
                window.location.reload();
            })
            .catch(err => 
                {
                    console.log(err);
                    toast.error(err.response.data);
                })
    };

    const handleChange = (e) =>
    {
        setValues(
            {
                ...values,
                [e.target.name] : e.target.value,
            }
        )
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-2">
                    <AdminNav />
                </div>
                <div className="col-10">
                    <h4>Create Product</h4>
                    <form onSubmit = {handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" name = 'title' className = 'form-control' value = {values.title} onChange = {handleChange} />
                            <label htmlFor="description">Description</label>
                            <input type="text" name = 'description' className = 'form-control' value = {values.description} onChange = {handleChange} />
                            <label htmlFor="price">Price</label>
                            <input type="number" name = 'price' className = 'form-control' value = {values.price} onChange = {handleChange} />
                            <label htmlFor="shipping">Shipping</label>
                            <select name="shipping" onChange = {handleChange}>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                            <br/>
                            <label htmlFor="quantity">Quantity</label>
                            <input type="number" name = 'quantity' className = 'form-control' value = {values.quantity} onChange = {handleChange} />
                            <label htmlFor="color">Color</label>
                            <input type = "text" name = 'color' className = 'form-control' value = {values.color} onChange = {handleChange} />
                            <label htmlFor="brand">Brand</label>
                            <input type="text" name = "brand" className = 'form-control' value = {values.brand} onChange = {handleChange} />
                        </div>
                        <button className = "btn btn-outline-info">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default ProductCreate;