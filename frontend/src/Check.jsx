import React, { useContext, useEffect } from 'react';
import AuthContext from './context/AuthProvider';

export default function Check() {
       const [email, setEmail] = React.useState(null)
    useEffect(()=>{
        setEmail(localStorage.getItem("email"))
        console.log(localStorage.getItem("email"))
    },[])

  if (!email) {
    return <p>Not logged in</p>;
  }

  return (
    <div>
      <p>Welcome, {email}!</p>
    </div>
  );
}