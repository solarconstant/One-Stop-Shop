import React, { useEffect, useState } from 'react';
import AdminNav from '../../../Components/Navbar/AdminNav';
import { toast } from 'react-toastify';
import {useSelector} from 'react-redux';
import { getSubCategory, updateSubCategory } from '../../../Functions/subcategory';
import { getCategories } from '../../../Functions/category';
import CategoryForm from '../../../Components/Forms/CategoryForm';

const SubCategoryUpdate = ({ history, match }) =>
{
    const { user } = useSelector(state => ({...state}));
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [parent, setParent] = useState("");

    const loadCategories = () =>
    {
        getCategories().then((c) => setCategories(c.data))
    }
    const loadSubCategory = () =>
    {
        getSubCategory(match.params.slug).then((s) => {
            setName(s.data.name);
            setParent(s.data.parent);
        });
    }

    useEffect(() =>
    {
        loadCategories();  
        loadSubCategory();
    }, [])

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        setLoading(true);
        updateSubCategory(match.params.slug, {name, parent}, user.token)
        .then((res) => 
            {
                setLoading(false);
                setName('');
                toast.success(`Category updated.`);
                history.push('/admin/subcategory')
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

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-2">
                    <AdminNav />
                </div>
                <div className="col-10">
                    {loading ? (<h4 className = "text-danger">Loading...</h4>) : (<h4>Update SubCategory</h4>)}
                    <br/>
                    <div className="form-group">
                        <label htmlFor="category">Parent</label>
                    
                        <select name="category" id="" className = "form-control" onChange = {e => setParent(e.target.value)}>
                            <option value={parent}>Please Select a category</option>
                            {categories.length > 0 && categories.map((c) => (
                                <option key = {c._id} value = {c._id} selected = {c._id === parent}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <CategoryForm handleSubmit = {handleSubmit} name = {name} setName = {setName} />
                    <hr/>
                </div>
            </div>
        </div>
        );
};

export default SubCategoryUpdate;