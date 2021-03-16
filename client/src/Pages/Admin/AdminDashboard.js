import React, { useEffect, useState } from 'react';
import AdminNav from '../../Components/Navbar/AdminNav';
import { getProductsByCount } from '../../Functions/product';
import AdminProductCard from "../../Components/Cards/AdminProductCard";

const AdminDashboard = () =>
{
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() =>
    {
        loadAllProducts();
    }, []);

    const loadAllProducts = () =>
    {
        setLoading(true);
        getProductsByCount(20)
        .then(res =>
            {
                setProducts(res.data);
                setLoading(false);
            })
        .catch(err =>
            {
                console.log(err);
                setLoading(false);
            })
    }

    return (
        <div className="container-fluid">
            <div className="row">
            <div className="col-2">
                <AdminNav />
            </div>
                
                <div className="col">
                    {loading ? <h4>Loading...</h4> : <h4>All products:</h4>}
                    <div className="row">
                        {products.map((p) => (
                            <div className="col-md-4" key = {p._id}>
                                <AdminProductCard product = {p} /> 
                            </div>))}
                    </div>
                </div>
            </div>
        </div>
        );
};

export default AdminDashboard;