import { useState,setState } from "react";
function Budget(){

    const [amount,setAmount]=useState("");

    
    const addamount = async(e)=>{
        e.preventDefault();
        const response= await axios.post("http://localhost:8000/buse/addbudget",{
          amount: amount,
        });
        const data = response.data;
        console.log(data);
        navigate('/statefolder/budget');
        setRedirectUrl(data.redirectUrl);
      };
    return(
        <>
            <div className="form-outline mb-4">
                <input type="password" id="form3Example4" className="form-control" required="true" value={amount} onChange={(event)=>setAmount(event.target.value)}/>
                <label className="form-label" htmlFor="form3Example4">Budget</label>
            </div>
            <button type="submit" className="btn btn-primary btn-block mb-4" onClick={addamount}>Submit</button>
        </>
    )
}

export default Budget;