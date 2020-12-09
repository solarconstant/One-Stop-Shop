import React, { useEffect, useState } from 'react';
import { auth } from './.././../Firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const ForgotPassword = ({history}) =>
{
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({...state}));

    useEffect(() =>
    {
        if(user && user.token)
        {
            history.push('/');
        }
    });

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        setLoading(true);
        console.log(process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL);
        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
            handleCodeInApp: true,
        };

        await auth.sendPasswordResetEmail(email, config)
        .then(() =>
        {
            setEmail('');
            setLoading(false);
            toast.success('A password reset mail has been sent to you. Please check.');
        })
        .catch((error) =>
        {
            setLoading(false);
            toast.error(error.message);
        })
    }

    return (
        <div className="container col-md-4 offset-md-4 p-5">
            {!loading ? (
                <h4>Forgot Password</h4>
            ) : (
                <h4>Loading...</h4>
            )}

            <form onSubmit = {handleSubmit}>
                <input type = "email" className = "form-control" value = {email} onChange = {e =>setEmail(e.target.value)} placeholder = "Enter your email here" autoFocus/>
                <br />
                <button className = "btn btn-raised" disabled = {!email}>
                    Send Link
                </button>
            </form>
        </div>
    )
}

export default ForgotPassword;