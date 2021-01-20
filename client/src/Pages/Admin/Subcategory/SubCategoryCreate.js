import React, { useEffect, useState } from 'react';
import AdminNav from '../../../Components/Navbar/AdminNav';
import { toast } from 'react-toastify';
import {useSelector} from 'react-redux';
import { createSubCategory, removeSubCategory, getSubCategories} from '../../../Functions/subcategory';
import { getCategories } from '../../../Functions/category';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import CategoryForm from '../../../Components/Forms/CategoryForm';
import LocalSearch from '../../../Components/Forms/LocalSearch';

const SubCategoryCreate = () =>
{
    const { user } = useSelector(state => ({...state}));
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [keyword, setKeyword] = useState("");
    const [subs, setSubs] = useState([]);

    const loadCategories = () =>
    {
        getCategories().then((c) => setCategories(c.data))
    }
    const loadSubCategories = () =>
    {
        getSubCategories().then((s) => setSubs(s.data));
    }

    useEffect(() =>
    {
        loadCategories();  
        loadSubCategories();
    }, [])

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        setLoading(true);

        createSubCategory({name, parent: category}, user.token)
        .then((res) => 
            {
                setLoading(false);
                setName('');
                toast.success(`Category  created.`);
                loadSubCategories();
            }
        )
        .catch(err => 
            {
                setLoading(false);
                toast.error(`${err}`);
                //console.log(err);
            }
        );
    }
    const handleDelete = async (slug) =>
    {
        if(window.confirm(`Are you sure you want to delete the SubCategory ${slug}`))
        {
            setLoading(true);
            removeSubCategory(slug, user.token)
            .then(res => 
                {
                    setLoading(false);
                    toast.error(`Deleted ${slug} subcategory.`);
                    loadSubCategories();
                })
            .catch(err => {
                setLoading(false);
                toast.error(err);
            })
        }
    }
        
    

    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-2">
                    <AdminNav />
                </div>
                <div className="col-10">
                    {loading ? (<h4 className = "text-danger">Loading...</h4>) : (<h4>Create SubCategory</h4>)}
                    <br/>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                    
                        <select name="category" id="" className = "form-control" onChange = {e => setCategory(e.target.value)}>
                            <option value="">Please Select a category</option>
                            {categories.length > 0 && categories.map((c) => (
                                <option key = {c._id} value = {c._id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <CategoryForm handleSubmit = {handleSubmit} name = {name} setName = {setName} />
                    <hr/>

                    <LocalSearch keyword = {keyword} setKeyword = {setKeyword}/>

                    <br/>
                    <br/>
                    <div className="card-deck">
                    {subs.filter(searched(keyword)).map((s) => (
                        <div className = "card p-2" key = {s._id}>
                            <div className="card-heading text-center">
                                <h6>
                                    {s.name}
                                </h6>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-6 text-center" onClick = {() => handleDelete(s.slug)}>
                                        <h1>
                                            <DeleteOutlined />
                                        </h1>
                                    </div>
                                    <div className="col-6 text-center">
                                        <h1>
                                        <Link to = {`/admin/subcategory/${s.slug}`}>
                                            <EditOutlined />
                                        </Link>
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>))}
                    </div>
                </div>
            </div>
        </div>
        );
};

export default SubCategoryCreate;