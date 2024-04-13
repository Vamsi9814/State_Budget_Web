import './Login.css';
import './components/Header'
import './Footer'
import {useState} from "react";
import { useNavigate } from 'react-router-dom';
function StateLogin(){

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


    async function verifydata(event, userData) {
      event.preventDefault();
      try {
          const { email, password } = userData; // Destructure email and password from userData
          const result = await fetch("http://localhost:8000/suse/statelogin", {
            email:email, password:password // Send email and password in the request body
          });

          navigate('/statefolder/statehome')
          const response = await result.json(); // Parse the response JSON
          // Handle successful login response
          console.log("Login successful:", response);
          // Do something with the response, such as redirecting the user or updating UI
      } catch (error) {
          // Handle login error
          console.error("Login failed:", error);
          // Optionally, display an error message to the user
      }
  }

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
              <h2 className="fw-bold mb-5">Sign up now</h2>
              <form onSubmit={verifydata}>

                <div className="form-outline mb-4">
                  <input type="email" id="mailid" className="form-control" onChange={(event)=>setEmail(event.target.value)}/>
                  <label className="form-label" htmlFor="mailid" onclick="takeemail">Email address</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" id="form3Example4" className="form-control" onChange={(event)=>setPassword(event.target.value)}/>
                  <label className="form-label" htmlFor="form3Example4" onclick="takepassword">Password</label>
                </div>


                <button type="submit" className="btn btn-primary btn-block mb-4">Log In</button>

                <div class="google-btn">
                    <div class="google-icon-wrapper">
                        <img class="google-icon" src="/google image.png"/>
                    </div>
                    <p class="btn-text"><b>Sign in with Google</b></p>
                </div>

                <p>Do Not have an account?</p>
                <a href="./stateregister.jsx">Create an account</a>
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