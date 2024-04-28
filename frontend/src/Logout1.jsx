import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useLogout from './hooks/useLogout';
import { ToastContainer, toast } from "react-toastify";

const Logout1 = () => {

  const navigate=useNavigate();
  const logout=useLogout();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    let isAuth = localStorage.getItem('email');
    if (isAuth && isAuth !== 'undefined') {
      navigate('/logout1');
      window.history.pushState(null, null, '/logout1');
      window.addEventListener('popstate', handlePopState);
      const usertype = "muse";
        const handleSuccess = (msg) =>
            toast.success(msg, {
            position: "top-right",
        });
        const signOut = async () => {
            const { message } = await logout(usertype);
            console.log("in frontend++++"+message);
            if (message) {
                console.log("inside handling mssg");
                handleSuccess(message);
                navigate(`/${usertype}/login`);
            }
        };
        signOut();
    }
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  const handlePopState = (event) => {
    event.preventDefault();
    // Handle the back button event here, e.g., prevent going back
    window.history.pushState(null, null, '/logout1');
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
      <ToastContainer/>
    </div>
  );
};

export default Logout1;