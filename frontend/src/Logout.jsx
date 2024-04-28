import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useLogout from './hooks/useLogout';

const Logout = () => {
    const navigate=useNavigate()
    const logout = useLogout();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    let isAuth = localStorage.getItem('email');
    if (isAuth && isAuth !== 'undefined') {
      navigate('/logout');

      // Prevent going back to the previous page
      window.history.pushState(null, null, '/logout');
      window.addEventListener('popstate', handlePopState);
    }

    // Clean up the event listener when the component unmounts
    return () => {
        const usertype = "cuse";
        const signOut = async () => {
            const { message } = await logout(usertype);
            if (message) {
            handleSuccess(message);
            navigate(`/${usertype}/login`);
            }
        };
        signOut();
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  const handlePopState = (event) => {
    event.preventDefault();
    // Handle the back button event here, e.g., prevent going back
    window.history.pushState(null, null, '/logout');
  };

  return (
    <div>
      {isLoggedIn ? (
        <p>You are logged in. Logging out...</p>
      ) : (
        <div>
          <p>You have been logged out.</p>
          <Link to="/">Home</Link>
        </div>
      )}
    </div>
  );
};

export default Logout;