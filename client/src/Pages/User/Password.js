import React, { useState } from 'react';
import UserNav from '../../Components/Navbar/UserNav';
import { auth } from '../../Firebase';
import { toast } from 'react-toastify';

const Password = () =>
{
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        setLoading(true);
        // console.log(password);
        // Update user password
        await auth.currentUser.updatePassword(password)
        .then(
            () =>
            {
                setLoading(false);
                toast.success("Password changed successfully!");
            }
        )
        .catch(err =>
            {
                setLoading(false);
                toast.error(err.message);
            });
    }
    const passwordUpdateForm = () =>
    (
        <form onSubmit = {handleSubmit}>
            <div className="form-group">
                <label htmlFor="">Your Password</label>
                <input value = {password} disabled = {loading} type="password" onChange = {e => setPassword(e.target.value)} className = "form-control" placeholder = "Enter new password"/>
                <button className = "btn btn-success" disabled = {!password || loading || password.length < 8}>Submit</button>
            </div>
        </form>
    )
    
    return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-2">
                <UserNav />
            </div>
            <div className="col">
                {loading ? (
                    <img src="https://www.pulsar-entertainment.com/assets/images/loading.gif" alt="loading" srcset=""/>
                ) : (
                    <h3>
                        Reset Your Password
                    </h3>
                )}
                {passwordUpdateForm()}
            </div>
        </div>
    </div>
    );
}

export default Password;