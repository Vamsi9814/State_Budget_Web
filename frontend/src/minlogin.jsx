import './Login.css';
import './components/Header'
import './Footer'
import {useState} from "react";
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import useAuth from "./hooks/useAuth";
function MinLogin(){
  const { setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
  

  const verifydata = async (event) => {
    event.preventDefault();
    try {
      console.log("frontend");
      const response = await axios.post("http://localhost:8000/muse/minlogin", {
         email:email, password:password 
      },{withCredentials:true});
      console.log(response.data);
      const {success,message}=response.data;
        if (success) {
          const { accessToken, role,user } = response.data;
          console.log(response.data);
          localStorage.setItem("email", user);

          const from = location.state?.from?.pathname || `/minfolder/${user.substring(0,user.length-20)}`;
      // handleSuccess(message);
          setAuth({ user,role, accessToken });
          setTimeout(() => {
            navigate(from, { replace: true });
          }, 500);
        } else {
          handleError(message);
        } 
    } catch (error) {
      // Handle network or other errors
      console.error("Login failed:", error);
      alert("An error occurred during login. Please try again later.");
    }
  };


    return(
        <>
    <section className="text-center">
      <div
        className="p-5 bg-image"
        style={{
          backgroundImage: "url('https://mdbootstrap.com/img/new/textures/full/171.jpg')",
          height: '200px'
        }}
      />

      <div
        className="card mx-4 mx-md-5 shadow-5-strong"
        style={{
          marginTop: '-100px',
          background: 'hsla(0, 0%, 100%, 0.8)',
          backdropFilter: 'blur(30px)'
        }}
      >
        <div className="card-body py-5 px-md-5">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8">
              <h2 className="fw-bold mb-5">Minister Login</h2>
              <form onSubmit={verifydata}>

                <div className="form-outline mb-4">
                  <input type="email" id="form2Example4" className="form-control" value={email} onChange={(event)=>setEmail(event.target.value)}/>
                  <label className="form-label" htmlFor="mailid" onclick="takeemail">Email address</label>
                </div>
              

                <div className="form-outline mb-4">
                  <input type="password" id="form3Example4" className="form-control" value={password} onChange={(event)=>setPassword(event.target.value)}/>
                  <label className="form-label" htmlFor="form3Example4" onclick="takepassword">Password</label>
                </div>


                <button type="submit" className="btn btn-primary btn-block mb-4" onClick={verifydata}>Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
        </>
    );
}

export default MinLogin;