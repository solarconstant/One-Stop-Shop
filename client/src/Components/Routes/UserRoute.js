import React from 'react'
import { Route, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoadingToRedirectUser from './LoadingToRedirectUser'

//React router dom docs
const UserRoute = ({children, ...rest}) => 
{
    const {user} = useSelector((state) => ({...state}));
    return user && user.token ? (<Route {...rest} />) : (<LoadingToRedirectUser />)
}

export default UserRoute;