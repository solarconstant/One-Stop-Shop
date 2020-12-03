import React, { useState } from 'react';
import { auth, googleAuthProvider } from './.././../Firebase';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { MailOutlined, GoogleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux'

const Login = ({history}) =>
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState('');     //For loading screen

    let dispatch = useDispatch();
    const handleSubmit = async (event) =>
    {
        event.preventDefault();
        setLoading(true);       //Until the following operations complete, loading screen will be displayed
        try
        {
            const result = await auth.signInWithEmailAndPassword(email, password);
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();

            dispatch(
                {
                    type: "LOGGED_IN_USER",
                    payload: {
                        email: user.email,
                        payload: idTokenResult.token,
                    }
                }
            );

            history.push('/');
        }
        catch(error)
        {
            console.log(error);
            toast.error(error.message);
            setLoading(false);
        }
    }

    const handleGoogleLogin = () =>
    {
        auth.signInWithPopup(googleAuthProvider).then(
            async (result) => {
                const { user } = result;
                const idTokenResult = await user.getIdTokenResult();
                dispatch(
                    {
                        type: "LOGGED_IN_USER",
                        payload: {
                            email: user.email,
                            token: idTokenResult.token
                        }
                    }
                );
                history.push('/');
            }
        ).catch(err => {
            toast.error("err.message");
            console.log(err);
        });
    }
    
    const loginForm = () =>(
        <form onSubmit = {handleSubmit}>
            <input type = "email" className = "form-control" value = {email} onChange = {e => setEmail(e.target.value)} autoFocus placeholder = "Your Email goes here..." />
            <br />
            <input type = "password" className = "form-control" value = {password} onChange = {e => setPassword(e.target.value)} placeholder = "Your Password goes here..." />
            <br/>
            <Button onClick = {handleSubmit} type = "primary" className = "mb-3" block shape = "round" icon = {<MailOutlined />} disabled = {!email || password.length < 8}>Login with Email and Password</Button>
        </form>
    );
    return (
        <div className = "container p-5">
            <div className = "row">
                <div className = "col-md-6 offset-md-3">
                    {loading ? (<h4>Loading</h4>) : (<h4>Login</h4>)}
                    {loginForm()} 
                    <Button onClick = {handleGoogleLogin} type = "danger" className = "mb-3" block shape = "round" icon = {<GoogleOutlined />} >Login with Google</Button>
                </div>
            </div>
        </div>
    )
}

export default Login;