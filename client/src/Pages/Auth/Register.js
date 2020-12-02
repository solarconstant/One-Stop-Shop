import React, { useState } from 'react';
import { auth } from './.././../Firebase';
import { toast } from 'react-toastify';

const Register = () =>
{
    const [email, setEmail] = useState('');
    const handleSubmit = async (event) =>
    {
        event.preventDefault();
        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true   //From firebase docs; Registration verification to be completed from same device which is used to register.
        }

        await auth.sendSignInLinkToEmail(email, config);

        toast.success(`A verification mail has been sent to ${email}. Click here to complete your registration.`);

        //Save email in local storage
        window.localStorage.setItem('emailForRegistration', email);

        //Clear mail field
        setEmail("");
    }
    const registerForm = () =>(
        <form onSubmit = {handleSubmit}>
            <input type = "email" className = "form-control" value = {email} onChange = {e => setEmail(e.target.value)} autoFocus placeholder = "Your Email goes here..." />
            <br />
            <button type = "submit" className = "btn btn-raised">
                Register
            </button>
        </form>
    );
    return (
        <div className = "container p-5">
            <div className = "row">
                <div className = "col-md-6 offset-md-3">
                    <h4>
                        Register 
                    </h4>
                    {registerForm()} 
                </div>
            </div>
        </div>
    )
}

export default Register;