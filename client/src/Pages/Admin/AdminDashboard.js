import React from 'react';
import AdminNav from '../../Components/Navbar/AdminNav';
const AdminDashboard = () =>
{
    return (
        <div className="container-fluid">
            <div className="row">
            <div className="col-2">
                <AdminNav />
            </div>
                <div className="col">Admin Dashboard Page</div>
            </div>
        </div>
        );
};

export default AdminDashboard;