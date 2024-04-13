import React from "react"
import MinNavbar1 from "./minnavbar1"
import Footer from "../Footer"
import Transportation from "../Transportation"
import Check from "../Check"
function FinanceMain(){
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