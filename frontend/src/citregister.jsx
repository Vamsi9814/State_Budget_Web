import './Login.css';
import './components/Header'
import './Footer'
import {useState} from "react";
//import { useHistory } from "react-router-dom";
import { useNavigate,useLocation } from 'react-router-dom';
//import fetch from 'node-fetch'
import axios from "axios";
import useAuth from "./hooks/useAuth";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CitRegister(){
  // const [redirectUrl, setRedirectUrl] = useState("");
  //const history = useHistory();
  const navigate = useNavigate();
  const { setAuth } = useAuth();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [aadharNumber, setAadharNumber] = useState("");
    const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
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

    const [errors, setErrors] = useState({
      name: '',
      email: '',
      password: ''
    });

    /*function handleChange(event){
      setFormData({
        ...formData,
        [name]: value
      });
      const {name,value} = event.target;
      if (name===firstname){

      }

    }*/
    const location = useLocation();
    const from = location.state?.from?.pathname || `/citfolder/cithome`;
    const postdata = async(e)=>{
      e.preventDefault();
      if (!handleFirstNameChange()) {
        alert("Please enter a valid first name (only letters).");
        return;
      }
    
      // Validate lastName
      if (!handleLastNameChange()) {
        alert("Please enter a valid last name (only letters).");
        return;
      }
    
      // Validate email
      if (!handleEmailChange()) {
        alert("Please enter a valid email address.");
        return;
      }
    
      // Validate password
      if (!handlePasswordChange()) {
        alert(
          "Please enter a valid password (at least 8 characters, including at least one letter and one number)."
        );
        return;
      }
    
      // Validate aadharNumber
      if (!handleAadharChange()) {
        alert("Please enter a valid 12-digit Aadhaar number.");
        return;
      }
      try{

      const response= await axios.post("http://localhost:8000/cuse/citregister",{
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password,
        aadharnumber: aadharNumber,
      });
      const data = response.data;
      //console.log(data);
      const { accessToken, role, user } = response.data;
            localStorage.setItem("email", user);
        // handleSuccess(message);
            setAuth({ user, role, accessToken });
            setTimeout(() => {
              navigate(from, { replace: true });
            }, 500);
    }catch(err){
        console.log("error caught");
      }
    };
    
    function handleFirstNameChange(){
      //(event)=>setFirstName(event.target.value);
      const value  = firstName;
      console.log(firstName);
      if (/^[A-Za-z]+$/.test(value)) {
        console.log("true");
        return true;
      }
      return false;
    };

    function handleLastNameChange(){
      //(event)=>setFirstName(event.target.value);
      console.log(lastName);
      if (/^[A-Za-z]+$/.test(lastName)) {
        setLastName(lastName);
        return true;
      }
      return false;
    };
    

    function handleAadharChange(){
      // (event)=>setAadharNumber(event.target.value)
      if (/^\d{12}$/.test(aadharNumber)) {
        setAadharNumber(aadharNumber);
        return true;
      }
      return false;
    };

    function handlePasswordChange(){
      // (event)=>setAadharNumber(event.target.value)
      if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
        setPassword(password);
        return true;
      }
      return false;
    };

    function handleEmailChange() {
      if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        setEmail(email); // Assuming you have a state variable named 'email' to store the email value
        return true;
      }
      return false;
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
              <form onSubmit={postdata}>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <input type="text" id="form3Example1" required="true" name="firstname" value={firstName} onChange={(event)=>setFirstName(event.target.value)} className="form-control"/>
                      <label className="form-label" htmlFor="form3Example1">First name</label>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <input type="text" id="form3Example2" required="true" value={lastName}  onChange={(event)=>setLastName(event.target.value)} className="form-control" />
                      <label className="form-label" htmlFor="form3Example2">Last name</label>
                    </div>
                  </div>
                </div>

                <div className="form-outline mb-4">
                  <input type="email" id="form3Example3" className="form-control" required="true" value={email} onChange={(event)=>setEmail(event.target.value)} />
                  <label className="form-label" htmlFor="mailid" >Email address</label>
                </div>

                <div className="form-outline mb-4">
      <input
        type={showPassword ? 'text' : 'password'}
        id="form3Example4"
        required={true}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className="form-control"
      />
      <label className="form-label" htmlFor="form3Example4">
        Password
      </label>
      <div>
      <button className="toggle-password-button" onClick={togglePasswordVisibility} style={{"borderRadius":"50px","height":"40px"}}>
        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} style={{"width":"20px","marginTop":"-7px","marginBottom":"10px","position":"absolute","marginLeft":"-10px"}}/>
      </button></div>
    </div>

                <div className="form-outline mb-4">
                  <input type="number" id="aadhar" required="true" value={aadharNumber}  onChange={(event)=>setAadharNumber(event.target.value)} className="form-control" />
                  <label className="form-label" htmlFor="aadhar">Aadhar Number</label>
                </div>


                <button type="submit" className="btn btn-primary btn-block mb-4">Sign up</button>

                {/* <div class="google-btn">
                    <div class="google-icon-wrapper">
                        <img class="google-icon" src="/google image.png"/>
                    </div>
                    <p class="btn-text"><b>Sign in with Google</b></p>
                </div>
                <div class="si-aadhar">
                    <div class="aa-icon-wrapper">
                        <img class="aadhar-icon" src="/aadhar.png"/>
                    </div>
                    <p class="btn-text"><b>Sign in with Aadhaar </b></p> */}
                {/* </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>


        </>
    );
}

export default CitRegister;