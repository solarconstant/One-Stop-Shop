import React, { useEffect } from 'react';
import {Switch, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';    //To be used in the entire app
import 'react-toastify/dist/ReactToastify.css';
import { auth } from './Firebase';
import { useDispatch } from 'react-redux';
import { currentUser } from './Functions/auth';

import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Home from './Pages/Home';
import Header from './Components/Navbar/Header';
import RegisterCompletion from '../src/Pages/Auth/RegisterCompletion';
import ForgotPassword from '../src/Pages/Auth/ForgotPassword';
import History from '../src/Pages/User/History';
import Password from '../src/Pages/User/Password';
import Wishlist from '../src/Pages/User/Wishlist';
import UserRoute from '../src/Components/Routes/UserRoute';
import AdminRoute from '../src/Components/Routes/AdminRoute';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import CategoryCreate from './Pages/Admin/Category/CategoryCreate';
import CategoryUpdate from './Pages/Admin/Category/CategoryUpdate';
import SubCategoryCreate from './Pages/Admin/Subcategory/SubCategoryCreate';
import SubCategoryUpdate from './Pages/Admin/Subcategory/SubCategoryUpdate';
import ProductCreate from './Pages/Admin/Product/ProductCreate';

function App() {

  const dispatch = useDispatch();

  //Check firebase auth state;
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) =>
    {
      if(user)
      {
        const idTokenResult = await user.getIdTokenResult();
        console.log("user", user);
        currentUser(idTokenResult.token)
        .then(
            (res) =>
            {
                dispatch(
                    {
                        type: "LOGGED_IN_USER",
                        payload: {
                            name: res.data.name,
                            email: res.data.email,
                            token: idTokenResult.token,
                            role: res.data.role,
                            _id: res.data._id,
                        },
                    }
                );
            } 
        )
        .catch(err => console.log(err));
      }
    });

    //cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path = '/' component = {Home} />
        <Route exact path = '/login' component = {Login} />
        <Route exact path = '/register' component = {Register} />
        <Route exact path = '/register/complete' component = {RegisterCompletion} />
        <Route exact path = '/forgot/password' component = {ForgotPassword} />
        <UserRoute exact path = '/user/history' component = {History} />
        <UserRoute exact path = '/user/password' component = {Password} />
        <UserRoute exact path = '/user/wishlist' component = {Wishlist} />
        <AdminRoute exact path = '/admin/dashboard' component = {AdminDashboard} />
        <AdminRoute exact path = '/admin/category' component = {CategoryCreate} />
        <AdminRoute exact path = '/admin/dashboard' component = {AdminDashboard} />
        <AdminRoute exact path = "/admin/category/:slug" component = {CategoryUpdate} />
        <AdminRoute exact path = "/admin/subcategory" component = {SubCategoryCreate} />
        <AdminRoute exact path = "/admin/subcategory/:slug" component = {SubCategoryUpdate} />
        <AdminRoute exact path = "/admin/products" component = {ProductCreate} />
        <AdminRoute exact path = "/admin/product" component = {ProductCreate} />
      </Switch>
    </div>
  );
}

export default App;
