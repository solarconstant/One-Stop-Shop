import React from 'react';

const LocalSearch = ({keyword, setKeyword}) =>
{
    const handleSearchChange = (e) =>
    {
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase())
    }
    return (
        <div className="container pt-4 pb-4">
            <input 
                type = "search" 
                placeholder = "Search for a category" 
                value = {keyword} 
                onChange = {handleSearchChange} 
                classname = "form-control" />
        </div>
       
    )
}

export default LocalSearch;