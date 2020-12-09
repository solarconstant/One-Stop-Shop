import React from 'react';
import UserNav from '../../Components/Navbar/UserNav';

const Password = () =>
{
    return (
    <div className="container-fluid">
        <div className="row">
        <div className="col-2">
            <UserNav />
        </div>
            <div className="col">Password Reset Page</div>
        </div>
    </div>
    );
}

export default Password;