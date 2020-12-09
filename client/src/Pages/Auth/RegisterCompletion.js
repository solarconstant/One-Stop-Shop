import React, { useState, useEffect } from 'react';
import { auth } from './.././../Firebase';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { createOrUpdateUser } from '../../Functions/auth';

const RegisterCompletion = ({history}) =>         //destructure history from props
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user } = useSelector((state) => ({...state}));
    let dispatch = useDispatch();

    useEffect(      //useEffect is used to implement componentDidMount, etc hooks in functional components
        () => {
            setEmail(window.localStorage.getItem('emailForRegistration'));       //key of the item to get
            // console.log(window.location.href);
            // console.log(window.localStorage.getItem('emailForRegistration'));
        }, []
    )

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        //Email and password validation
        if(!email || !password)
        {
            toast.error("Please enter your password.");
            return;
        }

        if(password.length < 8)
        {
            toast.error("Your password must be atleast 8 characters long.");
            return;
        }
        try
        {
            const result = await auth.signInWithEmailLink(email, window.location.href);     //location.href returns url of current page
            //console.log('RESULT->', result);

            if(result.user.emailVerified)
            {
                // Once user is verified we can remove creds from local storage
                window.localStorage.removeItem('emailForRegistration');
                // User ID Token
                let user = auth.currentUser;
                await user.updatePassword(password);
                const idTokenResult = await user.getIdTokenResult();

                createOrUpdateUser(idTokenResult.token)
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
                //redirect
                history.push('/');
            }
        }
        catch(error)
        {
            console.log(error);
            toast.error(error.message)
        }
    }

    const completeRegistrationForm = () =>(
        <form onSubmit = {handleSubmit}>
            <input type = "email" className = "form-control" value = {email} onChange = {e => setPassword(e.target.value)} disabled />
            <input type = "password" className = "form-control" value = {password} onChange = {e => setPassword(e.target.value)} autoFocus />
            <button type = "submit" className = "btn btn-raised">
                Complete Registration
            </button>
        </form>
    );
    return (
        <div className = "container p-5">
            <div className = "row">
                <div className = "col-md-6 offset-md-3">
                    <h4>
                        Register Completion 
                    </h4>
                    {completeRegistrationForm()} 
                </div>
            </div>
        </div>
    )
}

export default RegisterCompletion;