import React, { useEffect, useState } from 'react';
import AdminNav from '../../../Components/Navbar/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCategory, updateCategory, removeCategory } from '../../../Functions/category';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';

const CategoryUpdate = ({history, match}) =>
{
    const { user } = useSelector(state => ({...state}));
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadCategory();
    }, [])

    const loadCategory = () =>
    {
        getCategory(match.params.slug)
        .then((c) => setName(c.data.name))
        .catch(err => console.log(err));
    }

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        setLoading(true);
    } 
    const categoryForm = () =>
    (
        <form onSubmit = {handleSubmit}>
            <div className="form-group">
                <input type="text" className = "form-control" value = {name} onChange = {event => setName(event.target.value)} autoFocus required/>
                <br/>
                <button className = "btn btn-outline-primary">Submit</button>
            </div>
        </form> 
    )
    const handleDelete = async (slug) =>
    {
        if(window.confirm(`Are you sure you want to delete the Category ${slug}`))
        {
            setLoading(true);
            removeCategory(slug, user.token)
            .then(res => 
                {
                    setLoading(false);
                    toast.success(`Deleted ${slug} category.`);
                })
            .catch(err => {
                setLoading(false);
                toast.error(err);
            })
        }
    }
            
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-2">
                    <AdminNav />
                </div>
                <div className="col-10">
                    {loading ? (<h4 className = "text-danger">Loading...</h4>) : (<h4>Update Category</h4>)}
                    <br/>
                    {categoryForm()}
                    <hr/>
                </div>
            </div>
        </div>
        );
};

export default CategoryUpdate;