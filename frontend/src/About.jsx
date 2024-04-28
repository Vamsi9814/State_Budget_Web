import "./about.css";
// import Header from "./components/Header";

export default function AboutUs() {
  return (
    <>
      {/* <Header /> */}
      <div className="AboutUs">
        <header>
          <h1>About Transparency Connect</h1>
        </header>

        <main>
          <section className="mission">
            <div className="content">
              <h2>Our Mission</h2>
              <p>
                At Transparency Connect, our mission is to bridge the gap
                between the government and its citizens by promoting
                transparency and accountability. We believe that a well-informed
                and engaged society is the cornerstone of a thriving democracy.
              </p>
            </div>
          </section>

          <section className="vision">
            <div className="content">
              <h2>Our Vision</h2>
              <p>
                We envision a world where every citizen has access to accurate
                and comprehensive information about government operations,
                budgets, and decision-making processes. Our platform aims to
                empower individuals by providing them with the necessary tools
                to stay informed and actively participate in the governance of
                their communities.
              </p>
            </div>
          </section>

          <section className="approach">
            <div className="content">
              <h2>Our Approach</h2>
              <p>
                We leverage cutting-edge technology and data analytics to
                gather, analyze, and present government information in a
                user-friendly and accessible manner. Our team of dedicated
                professionals works tirelessly to ensure the accuracy and
                impartiality of the information we provide.
              </p>
              <p>
                Additionally, we offer a secure and transparent platform for
                citizens to raise complaints or concerns regarding government
                activities. Our independent review team, free from political
                influence, thoroughly investigates and addresses these issues,
                fostering accountability and trust in the system.
              </p>
            </div>
          </section>

          <section className="team">
            <div className="content">
              <h2>Our Team</h2>
              <p>
                At Transparency Connect, we are a diverse and passionate team of
                individuals united by our commitment to transparency and good
                governance. Our team comprises experts from various fields,
                including technology, data analysis, public policy, and
                community engagement.
              </p>
            </div>
          </section>

          <section className="join">
            <div className="content">
              <h2>Join Us</h2>
              <p>
                We invite you to join our mission and be part of the movement
                towards a more transparent and accountable society. Stay
                informed, engage with us, and together, we can create a better
                future for all.
              </p>
              <button>Get Involved</button>
            </div>
          </section>
        </main>

        <footer>
          <p>&copy; Transparency Connect {new Date().getFullYear()}</p>
        </footer>
      </div>
    </>
  );
}