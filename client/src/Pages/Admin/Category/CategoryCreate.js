import React, { useEffect, useState } from 'react';
import AdminNav from '../../../Components/Navbar/AdminNav';
import { toast } from 'react-toastify';
import {useSelector} from 'react-redux';
import {createCategory, getCategories, removeCategory} from '../../../Functions/category';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import CategoryForm from '../../../Components/Forms/CategoryForm';
import LocalSearch from '../../../Components/Forms/LocalSearch';

const CategoryCreate = () =>
{
    const { user } = useSelector(state => ({...state}));
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [keyword, setKeyword] = useState("");

    useEffect(() =>
    {
        loadCategories();  
    }, [])

    const loadCategories = () =>
    {
        getCategories().then((c) => setCategories(c.data))
    }

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        setLoading(true);

        createCategory({name}, user.token)
        .then((res) => 
            {
                setLoading(false);
                setName('');
                toast.success(`Category  created.`);
                loadCategories(); //No need of refreshing the page to see updates.
            }
        )
        .catch(err => 
            {
                setLoading(false);
                toast.error("Category exists");
                console.log(err);
            }
        );
    }
    const handleDelete = async (slug) =>
    {
        if(window.confirm(`Are you sure you want to delete the Category ${slug}`))
        {
            setLoading(true);
            removeCategory(slug, user.token)
            .then(res => 
                {
                    setLoading(false);
                    toast.error(`Deleted ${slug} category.`);
                    loadCategories();
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
                    {loading ? (<h4 className = "text-danger">Loading...</h4>) : (<h4>Create Category</h4>)}
                    <br/>
                    <CategoryForm handleSubmit = {handleSubmit} name = {name} setName = {setName} />
                    <hr/>

                    <LocalSearch keyword = {keyword} setKeyword = {setKeyword}/>

                    <br/>
                    <br/>
                    <div className="card-deck">
                    {categories.filter(searched(keyword)).map((c) => (
                        <div className = "card p-2" key = {c._id}>
                            <div className="card-heading text-center">
                                <h4>
                                    {c.name}
                                </h4>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-6 text-center" onClick = {() => handleDelete(c.slug)}>
                                        <h1>
                                            <DeleteOutlined />
                                        </h1>
                                    </div>
                                    <div className="col-6 text-center">
                                        <h1>
                                        <Link to = {`/admin/category/${c.slug}`}>
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

export default CategoryCreate;