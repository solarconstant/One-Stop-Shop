import React, { useEffect, useState } from 'react';
import AdminNav from '../../../Components/Navbar/AdminNav';
import { toast } from 'react-toastify';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { createProduct } from '../../../Functions/product';
import CategoryForm from '../../../Components/Forms/CategoryForm';
import LocalSearch from '../../../Components/Forms/LocalSearch';
import ProductCreateForm  from '../../../Components/Forms/ProductCreateForm';
import { getCategories, getCategorySubs } from '../../../Functions/category';

const ProductCreate = () =>
{
    const initialState = {
        title: '',
        description: '',
        price: '',
        categories: [],
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
    const [subOptions, setsubOptions] = useState([]);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = () =>
    {
        getCategories().then((c) => setValues({...values, categories : c.data}));
    }

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        createProduct(values, user.token)
        .then((res) => 
            {
                console.log(res);
                toast.success(`"${res.data.title}" is created`);
                window.location.reload();
            })
            .catch(err => 
                {
                    console.log(err);
                    toast.error(err.response.data.err);
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

    const handleCategoryChange = (e) =>
    {
        e.preventDefault();
        console.log("CLICKED CATEGORY ", e.target.value);
        setValues(
            {
                ...values,
                category : e.target.value,
            }
        )
        getCategorySubs(e.target.value)
        .then(res =>
        {
            console.log(res);
            setsubOptions(res.data);
        })
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-2">
                    <AdminNav />
                </div>
                <div className="col-10">
                    <h4>Create Product</h4>
                    <div className="form-group">
                    </div>
                    <ProductCreateForm handleSubmit = {handleSubmit} handleChange = {handleChange} values = {values} handleCategoryChange = {handleCategoryChange} />
                </div>
            </div>
        </div>
    )
};

export default ProductCreate;