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
  }, []);

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
      </Switch>
    </div>
  );
}

export default App;
