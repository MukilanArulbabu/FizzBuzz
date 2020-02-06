import React, { useState } from 'react';
import Loader from './loader';
import axios from 'axios';
import Alert from './alerts';

const Login = (props) => {
    const [loading, setLoading] = useState(false);
    const [isAlert, setAlert] = useState(false);
    const handleSignIn = async (e) => {
        e.preventDefault();
        const uName = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;
        if ((uName.trim().length > 0) && (password.trim().length > 0)) {
            setLoading(true);
            setAlert(false);
            const body = {
                username: uName,
                password,
            }
            const res = await axios.post('/api/login', body);
            const { data } = res;
            if (data.auth) {
                sessionStorage.setItem('token', data.token);
                setLoading(false);
                props.history.push('/#');
            } else {
                setLoading(false);
                setAlert(true);
            }
        }
    }
    // if (loading) return (<Loader type="Puff" color="#00BFFF" height={100} width={100} />)
    return (
        <div className="flex justify-center h-screen items-center bg-green-500 flex-col">
            {(loading ? <Loader /> : <div />)}
            {(isAlert ? <Alert msg="Invalid username or password" /> : <div />)}
            <div className="w-full max-w-sm bg-gray-800 rounded shadow-lg" >  
                <form action="" className="bg-white shadow-md rounded px-8 py-8 pt-8">
                    <div className="px-4 pb-4">
                        <label htmlFor="username" className="text-sm block font-bold  pb-2">User Name</label>
                        <input type="text" name="username" id="username" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 " placeholder="Enter user name" />
                    </div>
                    <div className="px-4 pb-4">
                        <label htmlFor="password" className="text-sm block font-bold pb-2">Password</label>
                        <input type="password" name="password" id="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300" placeholder="Enter password" />
                    </div>
                    <div className="px-4">
                        <button onClick={handleSignIn} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Sign In</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login;
