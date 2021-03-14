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
import FileUpload from '../../../Components/Forms/FileUpload';
import { LoadingOutlined } from "@ant-design/icons";

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
    const [showSub, setshowSub] = useState(false);
    const [loading, setLoading] = useState(false);

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
                subs : [],
                category : e.target.value,
            }
        )
        getCategorySubs(e.target.value)
        .then(res =>
        {
            console.log(res);
            setsubOptions(res.data);
        })
        setshowSub(true);
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-2">
                    <AdminNav />
                </div>
                <div className="col-10">
                    <h4>Create Product</h4>
                    {loading ? <LoadingOutlined /> : ""}
                    <div className="p-3">
                        <FileUpload values = {values} setValues = {setValues} setLoading = {setLoading}/>
                    </div>
                    <ProductCreateForm 
                        handleSubmit = {handleSubmit} 
                        handleChange = {handleChange} 
                        values = {values} 
                        setValues = {setValues}
                        handleCategoryChange = {handleCategoryChange} 
                        subOptions = {subOptions}
                        showSub = {showSub} />
                </div>
            </div>
        </div>
    )
};

export default ProductCreate;