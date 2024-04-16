import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login');
    };

    const goToRegister = () => {
        navigate('/register');
    };

    return (

    <div className="navbar bg-base-100">
    <div className="flex-1">
        <a className="btn btn-ghost text-xl" onClick={goToLogin}>Login</a>
        <a className="btn btn-ghost text-xl" onClick={goToRegister}>Register</a>
    </div>
    </div>


    );
}

export default HomePage;
