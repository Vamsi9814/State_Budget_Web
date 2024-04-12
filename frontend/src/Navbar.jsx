import "./Navbar.css"
import { Link } from "react-router-dom";
import Footer from "./Footer";

function Navbar() {
  return (
    <>
<div className="bar">
  <div className="heading" >
    {/* <img src="/public/budget.jpg" alt="budget image" /> */}
    <img src="./stateimage.png" alt="state image" />
    <h1>Telangana State Budget</h1>
  </div>
  <div>
  <nav className="navbar navbar-expand-lg bg-light">
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
          <Link  to="/register" className="nav-link">REGISTER</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">LOGIN</Link>
          </li>
          <li className="nav-item">
          <Link  to="/contact" className="nav-link">Contact</Link>
          </li>
          <li className="nav-item">
          <Link  to="/gallery" className="nav-link">Gallery</Link>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Ministries
            </a>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" to="transportation">Transportation</Link></li>
              <li><Link className="dropdown-item" to="transportation">Education</Link></li>
              <li><Link className="dropdown-item" to="transportation">IT</Link></li>
              <li><Link className="dropdown-item" to="transportation">Sports</Link></li>
              <li><Link className="dropdown-item" to="transportation">Rural Development</Link></li>
              <li><Link className="dropdown-item" to="transportation">Health</Link></li>
              {/* <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#">Something else here</a></li> */}
            </ul>
          </li>
          {/* <li class="nav-item">
      <a class="nav-link disabled">Disabled</a>
    </li> */}
        </ul>
        {/* <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form> */}
      </div>
    </div>
  </nav>
  </div>
</div>
    </>
  );
}

export default Navbar;