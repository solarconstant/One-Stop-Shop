import React from 'react';
import {Switch, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';    //To be used in the entire app
import 'react-toastify/dist/ReactToastify.css';

import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Home from './Pages/Home';
import Header from './Pages/Components/Navbar/Header';
import RegisterCompletion from '../src/Pages/Auth/RegisterCompletion';

function App() {
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
