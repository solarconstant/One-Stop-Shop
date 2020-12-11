import React from 'react'
import { Link } from 'react-router-dom'

const UserNav = () =>
{
    return (
    <nav>   
        <ul className="nav flex-column">
            <li className="nav-item">
                <Link to = '/user/history' class = "nav-link">
                    History
                </Link>
            </li>
            <li>
                <Link to = '/user/password' class = "nav-link">
                    Password
                </Link>
            </li>
            <li>
                <Link to = '/user/wishlist' class = "nav-link">
                    Wishlist
                </Link>
            </li>
        </ul>
    </nav>  
    )
}

export default UserNav