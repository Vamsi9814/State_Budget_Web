import { useState } from "react";
function BudgetMin(){

    const [eduamount,setEduAmount] = useState("");
    const [finamount,setFinAmount] = useState("");
    const [urbamount,setUrbAmount] = useState("");

    const dealamount = async(e)=>{
        e.preventDefault();
        const response= await axios.post("http://localhost:8000/bud/handlebudget",{
          amount: amount,
        });
        const data = response.data;
        console.log(data);
        navigate('/statefolder/budgetmin');
        setRedirectUrl(data.redirectUrl);
    }
    return (
        <>
            <div className="form-outline mb-4">
                <input type="password" id="form3Example4" className="form-control" required="true" value={eduamount} onChange={(event)=>setEduAmount(event.target.value)}/>
                <label className="form-label" htmlFor="form3Example4">Education Budget</label>

                <input type="password" id="form3Example4" className="form-control" required="true" value={urbamount} onChange={(event)=>setUrbAmount(event.target.value)}/>
                <label className="form-label" htmlFor="form3Example4">Urban Budget</label>

                <input type="password" id="form3Example4" className="form-control" required="true" value={finamount} onChange={(event)=>setFinAmount(event.target.value)}/>
                <label className="form-label" htmlFor="form3Example4">Finance Budget</label>
            </div>
            <button type="submit" className="btn btn-primary btn-block mb-4" onClick={dealamount}>Submit</button>
        </>
    )
}

export default BudgetMin;