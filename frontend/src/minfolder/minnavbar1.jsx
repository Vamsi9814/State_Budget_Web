import { Link } from "react-router-dom";
function MinNavbar1() {
    return (
      <>
  <div className="bar">
    <div className="heading" >
      {/* <img src="/public/budget.jpg" alt="budget image" /> */}
      <img src="../public/stateimage.png" alt="state image" style={{"borderRadius":"100px"}} />
      <h1>Telangana State Budget</h1>
    </div>
    <div>
    <nav className="navbar navbar-expand-lg bg-light" style={{"marginLeft":"370px","marginTop":"-65px","borderRadius":"10px","position":"fixed"}}>
      <div className="container-fluid">
        <Link  to="/" className="navbar-brand">TC</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <Link  to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
            <Link  to="/fachi" className="nav-link">Achievements</Link>
            </li>
            <li className="nav-item">
            <Link  to="/logout1" className="nav-link">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </div>
  </div>
      </>
    );
  }


export default MinNavbar1;