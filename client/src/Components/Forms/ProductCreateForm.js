import React from 'react';
import { Select } from "antd";
const { Option } = Select;

const ProductCreateForm = ({ handleSubmit, handleChange, values, handleCategoryChange, subOptions, showSub, setValues }) =>
{
    return (
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
                <label htmlFor="category">Category</label>
                    <select name="category" id="" className = "form-control" onChange = {handleCategoryChange}>
                        <option value="">Please Select a category</option>
                        {values.categories.length > 0 && values.categories.map((c) => (
                            <option key = {c._id} value = {c._id}>{c.name}</option>
                        ))}
                    </select>
                    {showSub && (<div>
                        <label>Select Subcategories</label>
                        <Select mode = "multiple" style = {{width: "100%"}} placeholder = "Select Subcategories" value = {values.subs} onChange = {e => setValues({...values, subs : e})}>
                            {subOptions.length && subOptions.map((s) => (<Option key = {s._id} value = {s._id}>{s.name}</Option>))}
                        </Select>
                    </div>)}
            </div>
            <button className = "btn btn-outline-info">Submit</button>
        </form>
    );
}

export default ProductCreateForm;