import React from "react";
import './SliderTransport.css'
function Carusol(){
return (

<>
<div id="carouselExampleFade" className="carousel slide carousel-fade">
  <div className="carousel-inner">
    <div className="carousel-item active another">
      <img src="../public/resize1.jpg" className="d-block w-50 " alt="..." />
    </div>
    <div className="carousel-item another">
      <img src="../public/train.jpeg" className="d-block w-50 " alt="..." />
    </div>
    <div className="carousel-item another">
      <img src="../public/aadhar.png" className="d-block w-50 "  alt="..." />
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true" />
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true" />
    <span className="visually-hidden">Next</span>
  </button>
</div>
</>
);
}
export default Carusol;