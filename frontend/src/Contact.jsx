import "./contact.css";
import Header from "./components/Header";

export default function Contact() {
  function fok() {
    var j = document.getElementById("arr");
    j.style.backgroundImage =
      "url(https://cdn.iconscout.com/icon/premium/png-64-thumb/chevron-arrow-3883460-3231250.png)";
  }

  function kof() {
    var j = document.getElementById("arr");
    j.style.backgroundImage =
      "url(https://cdn.iconscout.com/icon/free/png-64/right-arrow-1438234-1216195.png)";
  }

  function gok() {
    let j = document.getElementById("brr");
    j.style.backgroundImage =
      "url(https://cdn.iconscout.com/icon/premium/png-64-thumb/chevron-arrow-3883460-3231250.png)";
  }

  function kog() {
    let j = document.getElementById("brr");
    j.style.backgroundImage =
      "url(https://cdn.iconscout.com/icon/free/png-64/right-arrow-1438234-1216195.png)";
  }

  function hok() {
    let j = document.getElementById("crr");
    j.style.backgroundImage =
      "url(https://cdn.iconscout.com/icon/premium/png-64-thumb/chevron-arrow-3883460-3231250.png)";
  }

  function koh() {
    let j = document.getElementById("crr");
    j.style.backgroundImage =
      "url(https://cdn.iconscout.com/icon/free/png-64/right-arrow-1438234-1216195.png)";
  }

  window.onscroll = function () {
    jet();
  };

  function jet() {
    var ilake = document.getElementById("head");
    ilake.style.top = "0px";
    ilake.style.position = "sticky";
  }

  window.addEventListener("scroll", () => {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
      var wnd = window.innerHeight;
      var rtop = reveals[i].getBoundingClientRect().top;
      var rpoint = 100;

      if (rtop < wnd - rpoint) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  });
  return (
    <>
    <Header/>
    <div className="App">
      <nav>
        <div>
          <a href="mailto: gvsvvs.22@gmail.com">
            <img
              src="https://cdn.iconscout.com/icon/free/png-64/email-letter-envelope-message-38065.png"
              alt="G-mail"
            />
            <span
              style={{
                color: "white",
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
              }}
            >
              gvsvvs.22@gmail.com
            </span>
          </a>
          <a href="tel: +91 123456789">
            <img
              src="https://cdn.iconscout.com/icon/premium/png-64-thumb/telephone-41-117249.png"
              alt=""
            />
            <span
              style={{
                color: "white",
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
              }}
            >
              +91 123456789
            </span>
          </a>
        </div>
        <div>
          <a href={{}}>
            <img
              src="https://cdn.iconscout.com/icon/free/png-64/instagram-1868978-1583142.png"
              alt=""
            />
          </a>
          <a href={{}}>
            <img
              src="https://cdn.iconscout.com/icon/free/png-64/facebook-logo-3771014-3147631.png"
              alt=""
            />
          </a>
          <a href={{}}>
            <img
              src="https://cdn.iconscout.com/icon/free/png-64/linkedin-162-498418.png"
              alt=""
            />
          </a>
          <a href={{}}>
            <img
              src="https://cdn.iconscout.com/icon/free/png-64/telegram-2752057-2284874.png"
              alt=""
            />
          </a>
        </div>
      </nav>
      <header id="head">
        <a href={{}}>
          <span>
            {/* <img
              src="https://www.ecerasystem.com/ecerasystem/images/eslogo.png"
              alt="Logo"
            /> */}
          </span>
          <span id="c_name">Transparency Connect</span>
        </a>
        {/* <ul>
          <li>
            <a href={{}}>Home</a>
          </li>
          <li>
            <a href={{}} onMouseOver={gok} onMouseLeave={kog}>
              Register/Sign In
            </a>
            <div id="brr"></div>
          </li>
          <li>
            <a href={{}} onMouseOver={fok} onMouseLeave={kof}>
              Services
            </a>
            <div id="arr"></div>
          </li>
          <li>
            <a href={{}}>Contact Us</a>
          </li>
        </ul> */}
      </header>
      <main>
        <div id="front">
          <h1 style={{ textAlign: "center" }}>Welcome</h1>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/about-us-1805547-1537820.png"
            alt="font"
          />
          <p>
            " Our goal is to make a transparent connection between people and government which also allows people to raise any complaints if found and also these complaints will be identified by a team which not under influence of any political party.
            People can see budget provided or allocated to their area."
          </p>
        </div>
{/* 
        <div id="first" className="reveal">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/growing-business-by-digital-marketing-4217800-3501667.png"
            alt=""
          />
        </div> */}
        <div id="fifth" className="reveal">
          <h1>State Budget</h1>
          <div>
            <a href={{}}>
              <img
                src="https://cdn.iconscout.com/icon/premium/png-64-thumb/address-blue-circle-location-map-marker-navigation-icon-45868.png"
                alt=" "
              />
              <span>
                <h3>Address</h3>
                <p>Ganesh Nagar,Tadepalligudem</p>
              </span>
            </a>
            <a href={{}}>
              <img
                src="https://cdn.iconscout.com/icon/free/png-64/phone-2666572-2212584.png"
                alt=" "
              />
              <span>
                <h3>Phone</h3>
                <p>+91 1234567890</p>
              </span>
            </a>
            <a href={{}}>
              <img
                src="https://cdn.iconscout.com/icon/free/png-64/gmail-2489176-2082900.png"
                alt=" "
              />
              <span>
                <h3>E-mail</h3>
                <p>gvsvvs.22@gmail.com</p>
              </span>
            </a>
          </div>
        </div>
      </main>

      <footer
        style={{ display: "flex", "justify-content": "space-around" }}
        id="foote"
      >
        <ul>
          <li>
            <a href={{}}>About Us</a>
          </li>
        </ul>
        <ul>
          <li>
            <a href={{}}>Training</a>
          </li>
          <li>
            <a href={{}}>FAQs</a>
          </li>
        </ul>
        <div>
          <h2>Conatact Us</h2>
          <span>
            <a href={{}}>
              <img
                src="https://cdn.iconscout.com/icon/free/png-64/instagram-188-498425.png"
                alt=" "
              />
            </a>
            <a href={{}}>
              <img
                src="https://cdn.iconscout.com/icon/free/png-64/facebook-262-721949.png"
                alt=" "
              />
            </a>
            <a href={{}}>
              <img
                src="https://cdn.iconscout.com/icon/free/png-64/whatsapp-43-189795.png"
                alt=" "
              />
            </a>
          </span>
          <span>
            <a href={{}}>
              <img
                src="https://cdn.iconscout.com/icon/free/png-64/telegram-2752057-2284874.png"
                alt=" "
              />
            </a>
            <a href={{}}>
              <img
                src="https://cdn.iconscout.com/icon/free/png-64/linkedin-162-498418.png"
                alt=" "
              />
            </a>
          </span>
          <a
            href="tel: 123456789"
            style={{
              color: "white",
              fontSize: "1.3em",
              letterSpacing: "2px",
              textAlign: "center",
              textDecoration: "none",
              fontWeight: "bolder",
              marginTop: "20px"
            }}
          >
            Telephone No: +91 1234567890
          </a>
        </div>
      </footer>
      <p
        style={{
          color: "white",
          textAlign: "center",
          background: "rgb(27, 27, 27)",
          padding: "10px 0px"
        }}
      >
        &copy;Copyright <b>transparency_connect</b>. All Rights Reserved
      </p>
    </div>
    </>
  );
}
