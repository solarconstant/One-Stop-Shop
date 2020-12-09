import React from 'react';
import UserNav from '../../Components/Navbar/UserNav';

const Wishlist = () =>
{
    return (
    <div className="container-fluid">
        <div className="row">
        <div className="col-2">
            <UserNav />
        </div>
            <div className="col">Wishlist</div>
        </div>
    </div>
    );
}

export default Wishlist;