import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'

const LoadingToRedirectUser = () =>
{
    const [count, setCount] = useState(5);
    let history = useHistory();

    useEffect(
         () =>
         {
            const interval = setInterval(() =>
            {
                setCount(currentCount => --currentCount);
            }
            , 1000);
            //As count reaches 0, redirect
            count === 0 && history.push('/');

            return () => clearInterval(interval)
         }, [count]);
        
    return (
        <div className="container p-5 text-center">
            <h4>
                Looks like you aren't logged in!
            </h4>
            <p>
                Redirecting you in {count} seconds...
            </p>
        </div>
    )
}

export default LoadingToRedirectUser; 