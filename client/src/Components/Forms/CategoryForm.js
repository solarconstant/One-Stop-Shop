import React from 'react';

const CategoryForm = ({handleSubmit, name, setName}) =>
{
    return(
        <form onSubmit = {handleSubmit}>
            <div className="form-group">
                <label htmlFor="">Name</label>
                <input type="text" 
                className = "form-control" 
                value = {name} 
                onChange = {event => setName(event.target.value)} 
                autoFocus 
                required/>
                <br/>
                <button className = "btn btn-outline-primary">Submit</button>
            </div>
        </form> 
    );
}

export default CategoryForm;
