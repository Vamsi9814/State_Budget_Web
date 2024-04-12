import './Login.css';
import './components/Header'
import './Footer'
import {useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function StateRegister(){

    const [stateName, setStateName] = useState("");
    const [stateid, setStateId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [aadharNumber, setAadharNumber] = useState("");
    const navigate = useNavigate();
    function takefname(event){
      setstateName(
        event.target.value
      )
    }

    function takelname(event){
      setstateid(
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

    const handleAadharChange = (e) => {
      (event)=>setAadharNumber(event.target.value)
      const { value } = e.target;
      if (/^\d{0,12}$/.test(value)) { // Allow input up to 12 digits
        setInputValue(value);
      }
      else{
        alert("InValid Format");
      }
    };

    const handlePasswordChange = (event) => {
      (event)=>setPassword(event.target.value);
      const passwordValue = event.target.value;
      const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/;
  
      if (passwordPattern.test(passwordValue)) {
        setPassword(passwordValue);
      }
    };


    // const postdata = async(e)=>{
    //   e.preventDefault();
    //   try{
    //   const response=await axios.post("http://localhost:8000/suse/stateregister",{
    //     statename: stateName,
    //     stateid: stateid,
    //     email: email,
    //     password: password,
    //     aadharnumber: aadharNumber,
    //   });//.then(()=> console.log("enjoy pandagowww")).catch((err)=> console.log(err))
    //   navigate('/statefolder/statehome')
    // }
    // catch(err){
    //   console.log("error found",err);
    // }
    // };

    const postdata = async(e)=>{
      e.preventDefault();
      try{
      const response= await axios.post("http://localhost:8000/suse/stateregister",{
        statename: stateName,
        stateid: stateid,
        email: email,
        password: password,
        aadharnumber: aadharNumber,
      });
      //const data = response.data;
      //console.log(data);
      navigate('/statefolder/statehome');
    }catch(err){
        console.log("error caught",err);
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
              <form onSubmit={postdata}>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <input type="text" id="form3Example1" required="true" className="form-control" onChange={(event)=>setStateName(event.target.value)}/>
                      {/* {console.log(document.getElementById("form3Example1").value)} */}
                      <label className="form-label" htmlFor="form3Example1" onclick="takefname">State Name</label>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <input type="text" id="form3Example2" className="form-control" required="true" onChange={(event)=>setStateId(event.target.value)}/>
                      <label className="form-label" htmlFor="form3Example2" onclick="takelname">State Id</label>
                    </div>
                  </div>
                </div>

                <div className="form-outline mb-4">
                  <input type="email" id="mailid" className="form-control" required="true" onChange={(event)=>setEmail(event.target.value)}/>
                  <label className="form-label" htmlFor="mailid" onclick="takeemail">Email address</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" id="form3Example4" className="form-control" required="true" onChange={(event)=>setPassword(event.target.value)}/>
                  <label className="form-label" htmlFor="form3Example4" onclick="takepassword">Password</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="number" id="aadhar" className="form-control" required="true" onChange={(event)=>setAadharNumber(event.target.value)}/>
                  <label className="form-label" htmlFor="aadhar" onclick="takeaadhar">Aadhar Number</label>
                </div>

                <button type="submit" className="btn btn-primary btn-block mb-4">Sign up</button>

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
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

        </>
    );
}

export default StateRegister;