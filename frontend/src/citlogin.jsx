import './Login.css';
import './components/Header'
import './Footer'
import {useState} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function CitLogin(){

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


    const verifydata = async (event) => {
      event.preventDefault();
      try {
        const result = await axios.post("http://localhost:8000/cuse/citlogin", {
         
           email:email, password:password 
        });
        console.log(result);
    
        if (result) {
          
          if (result.data.success) {
            // Login successful, navigate to the desired page
            navigate('/citfolder/cithome');
          } else {
            // Login failed, display the error message
            console.log(error);
            alert(response.message);
          }
        } else {
          // Request failed
          console.log("error found");
          //const errorData = await result.json();
          //alert(`Error: ${errorData.message}`);
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
              <h2 className="fw-bold mb-5">Sign up now</h2>
              <form onSubmit={verifydata}>
                
                <div className="form-outline mb-4">
                  <input type="email" id="mailid" className="form-control" value={email} onChange={(event)=>setEmail(event.target.value)}/>
                  <label className="form-label" htmlFor="mailid" onclick="takeemail">Email address</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" id="form3Example4" className="form-control" value={password} onChange={(event)=>setPassword(event.target.value)}/>
                  <label className="form-label" htmlFor="form3Example4" onclick="takepassword">Password</label>
                </div>

                <button type="submit" className="btn btn-primary btn-block mb-4" onclick="verifydata">Login In</button>

                <div class="google-btn">
                    <div class="google-icon-wrapper">
                        <img class="google-icon" src="/google image.png"/>
                    </div>
                    <p class="btn-text"><b>Sign in with Google</b></p>
                </div>
                <div class="si-aadhar">
                    <div class="aa-icon-wrapper">
                        <img class="aadhar-icon" src="/aadhar.png"/>
                    </div>
                    <p class="btn-text"><b>Sign in with Aadhaar </b></p>
                </div>

                <p>Do Not have an account?</p>
                <a href="./citregister.jsx">Create an account</a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>


        </>
    );
}

export default CitLogin;