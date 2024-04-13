import React, { useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import { useNavigate,useLocation } from 'react-router-dom';


function PseudoHome() {
      const [activeMinistry, setActiveMinistry] = useState(null);
      const [activeSubOption, setActiveSubOption] = useState(null);
      const navigate = useNavigate();
      const handleMinistryClick = (ministry) => {
        
        setActiveMinistry(ministry);
        setActiveSubOption(null);
      };
    
      const handleSubOptionClick = (subOption) => {
        setActiveSubOption(subOption);
      };
    
      return (
        <>
        <div className="App">
          <header className="App-header">
            <img src="/stateimage.png" alt="state logo" style={{height:"150px",width:"150px"}}/>
            <nav>
              <div className="logo">
                <h1>Telangana State Budget</h1>
              </div>
              <ul>
              <li className="nav-item">
                <Link  to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                <Link  to="/aboutus" className="nav-link">About Us</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
                <li className="nav-item">
                <Link  to="/contact" className="nav-link">Contact</Link>
                </li>
                <li>
                  <Link to="/login" className="nav-item">Ministries</Link>
                  {/* <div className="dropdown-content">
                    <Link to="/citizen/finance"
                      className={`dropdown-item${activeMinistry === 'finance' ? ' active' : ''}`}
                      onClick={() => handleMinistryClick('finance')}
                    >
                      Finance
                    </Link>
                    <Link to="/citizen/education"
                      className={`dropdown-item${activeMinistry === 'education' ? ' active' : ''}`}
                      onClick={() => handleMinistryClick('education')}
                    >
                      Education
                    </Link>
                    <Link to="/citizen/health"
                      className={`dropdown-item${activeMinistry === 'health' ? ' active' : ''}`}
                      onClick={() => handleMinistryClick('health')}
                    >
                      Health
                    </Link>
                  </div> */}
                </li>
              </ul>
            </nav>
          </header>
        </div>
      <main>
        <section className="hero">
          <div className="hero-content">
            <h2>Transparent Budget</h2>
            <p>Ensuring fiscal responsibility and efficient resource allocation.</p>
            <a href="#" className="btn">Learn More</a>
          </div>
          <div className="hero-image">
            {/* <img src={heroImage} alt="Hero" /> */}
          </div>
        </section>

        <section className="stats">
          <div className="stat">
            <h3>Total Budget</h3>
            <p className="amount">$100B</p>
          </div>
          <div className="stat">
            <h3>Revenue</h3>
            <p className="amount">$80B</p>
          </div>
          <div className="stat">
            <h3>Expenditure</h3>
            <p className="amount">$95B</p>
          </div>
        </section>

        <section className="budget-division">
          <h2>Budget Division</h2>
          <div className="sectors">
            <div className="sector education">
              <div className="sector-icon">
                {/* <img src={educationIcon} alt="Education" /> */}
              </div>
              <h3>Education</h3>
              <p>20% of the total budget is allocated to the education sector, ensuring quality learning opportunities for all citizens.</p>
            </div>
            <div className="sector healthcare">
              <div className="sector-icon">
                {/* <img src={healthcareIcon} alt="Healthcare" /> */}
              </div>
              <h3>Healthcare</h3>
              <p>15% of the total budget is dedicated to the healthcare sector, providing accessible and affordable medical services.</p>
            </div>
            <div className="sector infrastructure">
              <div className="sector-icon">
                {/* <img src={infrastructureIcon} alt="Infrastructure" /> */}
              </div>
              <h3>Agriculture</h3>
              <p>25% of the total budget is allocated to agricultural development, building robust transportation, utilities, and public facilities.</p>
            </div>
            <div className="sector welfare">
              <div className="sector-icon">
                {/* <img src={welfareIcon} alt="Social Welfare" /> */}
              </div>
              <h3>Rural</h3>
              <p>10% of the total budget is dedicated to rural development programs, supporting underprivileged communities and ensuring a safety net.</p>
            </div>
            <div className="sector defense">
              <div className="sector-icon">
                {/* <img src={defenseIcon} alt="Defense" /> */}
              </div>
              <h3>Urban</h3>
              <p>20% of the total budget is allocated to the urban sector, in all sectors.</p>
            </div>
          </div>
        </section>

        <section className="mission">
          <h2>Our Mission</h2>
          <p>We are committed to responsible fiscal management, prioritizing the needs of our citizens, and fostering economic growth through strategic investments. Our transparent budgeting process ensures accountability and efficient resource allocation, enabling us to build a prosperous and sustainable future for our state.</p>
        </section>
      </main>

      <footer>
        <p>&copy; State Budget</p>
      </footer>
    </>
  );
}

export default PseudoHome;

