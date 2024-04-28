import React,{useEffect} from "react"
import MinNavbar1 from "./minnavbar1"
import Footer from "../Footer"
import Transportation from "../Transportation"
import Check from "../Check"
import { useNavigate } from "react-router-dom"
function FinanceMain(){
    const navigate = useNavigate();

  useEffect(() => {
    let isAuth = localStorage.getItem('email');
    if (isAuth && isAuth !== 'undefined') {
      navigate('/minfolder/finance');

      // Prevent going back to the previous page
      window.history.pushState(null, null, '/minfolder/finance');
      window.addEventListener('popstate', handlePopState);
    }

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  const handlePopState = (event) => {
    event.preventDefault();
    window.history.pushState(null, null, '/minfolder/finance');
  };
    return (<>
        <div>
            <h1>Finance</h1>
            <MinNavbar1/>
            <Transportation/>
            <Check/>
            <Footer/>
        </div>
    </>)
}

export default FinanceMain;