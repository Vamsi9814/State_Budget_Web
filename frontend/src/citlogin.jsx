import './Login.css';
import './components/Header'
import {GoogleLoginButton} from "react-social-login-buttons";
import {LoginSocialGoogle} from "reactjs-social-login";
import './Footer'
import {useState} from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import useAuth from "./hooks/useAuth";

function CitLogin(){
  const { setAuth } = useAuth();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [aadharNumber, setAadharNumber] = useState("");
    const navigate = useNavigate();
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
      localStorage.setItem("email", event.target.value)
      console.log("in set-email");
      console.log(localStorage.getItem("email"));
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
    const from = location.state?.from?.pathname || `/citfolder/cithome`;

    const verifydata = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post("http://localhost:8000/cuse/citlogin", {
         
           email:email, password:password 
        },{withCredentials:true});
        console.log(response.data);
        const {success,message}=response.data;
    
          
          if (success) {

            const { accessToken, role, user } = response.data;
            localStorage.setItem("email", user);
            console.log(localStorage.getItem("email"));
        // handleSuccess(message);
            setAuth({ user, role, accessToken });
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
              <h2 className="fw-bold mb-5">Citizen Login</h2>
              <form onSubmit={verifydata}>
                
                <div className="form-outline mb-4">
                  <input type="email" id="form2Example4" className="form-control" value={email} onChange={(event)=>setEmail(event.target.value)}/>
                  <label className="form-label" htmlFor="mailid" onclick="takeemail">Email address</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" id="form3Example4" className="form-control" value={password} onChange={(event)=>setPassword(event.target.value)}/>
                  <label className="form-label" htmlFor="form3Example4" onclick="takepassword">Password</label>
                </div>

                <button type="submit" className="btn btn-primary btn-block mb-4" onclick="verifydata">Login</button>


                {/* <div class="google-btn">
                    <div class="google-icon-wrapper">
                        <img class="google-icon" src="/google image.png"/>
                    </div>
                    <p class="btn-text"><b>Sign in with Google</b></p>
                </div> */}

                <p id="paragraph">Do Not have an account?</p>
                <Link to="/register">Create an account</Link>
              </form>
              
              {/* <LoginSocialGoogle
                    client_id={"644726226180-33su7jphh1vhhldktq70h1q32b2f4ell.apps.googleusercontent.com"}
                    scope="openid profile email"
                    discoveryDocs="claims_supported"
                    access_type="offline"
                    onResolve={({ provider, data }) => {
                      console.log(provider, data);
                    }}
                    onReject={(err) => {
                      console.log(err);
                    }}
                  >
                    {/*  <GoogleLoginButton /> */}
                  {/* </LoginSocialGoogle>  */}
            </div>
          </div>
        </div>
      </div>
    </section>


        </>
    );
}

export default CitLogin;