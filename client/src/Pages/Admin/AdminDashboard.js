import React from 'react';
import AdminNav from '../../Components/Navbar/AdminNav';

const AdminDashboard = () =>
{
    return (
        <div className="row">
            <div class = "col-2">
                <AdminNav />
            </div>
            <div className="col-10">
                Hello
            </div>
        </div>
    )
};

export default AdminDashboard;