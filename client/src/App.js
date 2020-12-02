import React, { useEffect } from 'react';
import {Switch, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';    //To be used in the entire app
import 'react-toastify/dist/ReactToastify.css';
import { auth } from './Firebase';
import { useDispatch } from 'react-redux';

import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Home from './Pages/Home';
import Header from './Components/Navbar/Header';
import RegisterCompletion from '../src/Pages/Auth/RegisterCompletion';

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
        dispatch(
          {
            type: "LOGGED_IN_USER",
            payload: {
              email: user.email,
              token: idTokenResult.token
            }
          }
        );
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
      </Switch>
    </div>
  );
}

export default App;
