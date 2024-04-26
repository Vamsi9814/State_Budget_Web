import './Login.css';
import './components/Header'
import './Footer'
import {useState} from "react";
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import useAuth from "./hooks/useAuth";
function StateLogin(){
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  // const location = useLocation();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [aadharNumber, setAadharNumber] = useState("");
    function takefname(event){
      setFirstName(
        event.target.value
      )
    }

    function takelname(event){
      setLastName(
        event.target.value
      )
    }

    function takeemail(event){
      setEmail(
        event.target.value
      )
    }

    function takepassword(event){
      setPassword(
        event.target.value
      )
    }

    function takeaadhar(event){
      setAadharNumber(
        event.target.value
      )
    }

    const location = useLocation();
  

  const verifydata = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/suse/statelogin", {
         email:email, password:password 
      },{withCredentials:true});
      console.log(response.data);
      const {success,message}=response.data;
        if (success) {
          const { accessToken, user } = response.data;
          console.log(response.data);
          localStorage.setItem("email", user);

          const from = location.state?.from?.pathname || `/statefolder/statehome`;
          setAuth({ user, accessToken });
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
      {/* Background image */}
      <div
        className="p-5 bg-image"
        style={{
          backgroundImage: "url('https://mdbootstrap.com/img/new/textures/full/171.jpg')",
          height: '200px'
        }}
      />
      {/* Background image */}

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
              <h2 className="fw-bold mb-5">Authority Login</h2>
              <form onSubmit={verifydata}>

                <div className="form-outline mb-4">
                  <input type="email" id="form2Example4" className="form-control" onChange={(event)=>setEmail(event.target.value)}/>
                  <label className="form-label" htmlFor="mailid" onclick="takeemail">Email address</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" id="form3Example4" className="form-control" onChange={(event)=>setPassword(event.target.value)}/>
                  <label className="form-label" htmlFor="form3Example4" onclick="takepassword">Password</label>
                </div>


                <button type="submit" className="btn btn-primary btn-block mb-4">Log In</button>


              </form>
            </div>
          </div>
        </div>
      </div>
    </section>


        </>
    );
  }


export default StateLogin;

// async function verifydata(event, userData) {
    //   event.preventDefault();
    //   try {
    //       const { email, password } = userData; // Destructure email and password from userData
    //       const result = await fetch("http://localhost:8000/suse/statelogin", {
    //         email:email, password:password // Send email and password in the request body
    //       });

    //       navigate('/statefolder/statehome')
    //       const response = await result.json(); // Parse the response JSON
    //       // Handle successful login response
    //       console.log("Login successful:", response);
    //       // Do something with the response, such as redirecting the user or updating UI
    //   } catch (error) {
    //       // Handle login error
    //       console.error("Login failed:", error);
    //       // Optionally, display an error message to the user
    //   }