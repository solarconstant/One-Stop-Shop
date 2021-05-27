import React from 'react'
import { Link } from 'react-router-dom'

const AdminNav = () =>
{
    return (
    <nav>   
        <ul className="nav flex-column">
            <li className="nav-item">
                <Link to = '/admin/dashboard' class = "nav-link">
                    Dashboard
                </Link>
            </li>
            <li>
                <Link to = '/admin/product' class = "nav-link">
                    Product
                </Link>
            </li>
            <li>
                <Link to = '/admin/products' class = "nav-link">
                    Products
                </Link>
            </li>
            <li>
                <Link to = '/admin/category' class = "nav-link">
                    Category
                </Link>
            </li>
            <li>
                <Link to = '/admin/subcategory' class = "nav-link">
                    Sub-Category
                </Link>
            </li>
            <li>
                <Link to = '/admin/coupon' class = "nav-link">
                    Coupons
                </Link>
            </li>
            <li>
                <Link to = '/admin/password' class = "nav-link">
                    Password
                </Link>
            </li>
        </ul>
    </nav>  
    )
}

export default AdminNav;