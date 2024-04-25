import { useState } from 'react'
import {BrowserRouter, Route,Routes} from 'react-router-dom';
import './App.css'
// import Head from './Head';
//import Transportation from './Transportation';
import Transportationciti1 from './Transportationciti1';
import Transportationciti2 from './Transportationciti2';
import Transportationciti3 from './Transportationciti3';
import PseudoHome from './PseudoHome';
import Home from './Home';
import Contact from './Contact';
import Navbar from './Navbar';
import LoginAs from './Loginas';
import RegisterAs from './registeras';
import Transportation from './Transportation';
import About from "./About";
import Gallery from "./gallery";
import CitHome from "./citfolder/cithome";
import MinHome from "./minfolder/minhome";
import EduMain from './minfolder/education';
import EduAchi from './minfolder/eachi';
import EduDev from './minfolder/edev';
import EduGallery from './minfolder/egallery';
import FinanceMain from './minfolder/finance';
import HealthMain from './minfolder/health';
import FinAchi from './minfolder/fachi';
import FinDev from './minfolder/fdev';
import FinanceGallery from './minfolder/fgallery';
import UrbanMain from './minfolder/urban';
import UrbanAchi from './minfolder/uachi';
import UrbanDev from './minfolder/udev';
import UrbanGallery from './minfolder/ugallery';
import StateHome from "./statefolder/statehome";
import Achieve from './statefolder/achieve';
import Budget from './statefolder/budget';
import BudgetMin from './statefolder/budgetmin';
import PersistLogin from "./components/PersistLogin"
import RequireAuth from './components/RequireAuth';


const ROLE = {
  Citizen: 0,
  Minister: 1,
};

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PseudoHome/>}/>
        <Route path="/" element={<Navbar/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/login" element={<LoginAs />}/>
        <Route path="/register" element={<RegisterAs/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/gallery" element={<Gallery/>}/>


        <Route element={<PersistLogin usertype={"cuse"} />}>
          <Route element={<RequireAuth allowedRole={ROLE.Citizen} />}>
            <Route path="/citfolder/cithome" element={<Home/>}/>
            <Route path="/citizen/finance" element={<Transportationciti1/>}/>
            <Route path="/citizen/education" element={<Transportationciti2/>}/>
            <Route path="/citizen/health" element={<Transportationciti3/>}/>
            </Route>
          </Route>
          <Route element={<PersistLogin usertype={"muse"} />}>
          <Route element={<RequireAuth allowedRole={ROLE.Minister} />}>
            <Route path="/minfolder/education" element={<EduMain/>}/>
            <Route path="/minfolder/eachi" element={<EduAchi/>}/>
            <Route path="/minfolder/edev" element={<EduDev/>}/>
            <Route path="/minfolder/egallery" element={<EduGallery/>}/>
            <Route path="/minfolder/finance" element={<FinanceMain/>}/>
            <Route path="/minfolder/health" element={<HealthMain/>}/>
            <Route path="/minfolder/fachi" element={<FinAchi/>}/>
            <Route path="/minfolder/fdev" element={<FinDev/>}/>
            <Route path="/minfolder/fgallery" element={<FinanceGallery/>}/>
            <Route path="/minfolder/uachi" element={<UrbanAchi/>}/>
            <Route path="/minfolder/udev" element={<UrbanDev/>}/>
            <Route path="/minfolder/urban" element={<UrbanGallery/>}/>
            <Route path="/minfolder/urban" element={<UrbanMain/>}/>
            <Route path="/minfolder/minhome" element={<MinHome/>}/>
          </Route>
          </Route>
        <Route path="/statefolder/statehome" element={<StateHome/>}/>
        <Route path="/statefolder/achieve" element={<Achieve/>}/>
        <Route path="/statefolder/budget" element={<Budget/>}/>
        <Route path="/statefolder/budgetmin" element={<BudgetMin/>}/>
      </Routes>
    </BrowserRouter>
    {/* <Transportation/> */}
    </>

  )
}

export default App;
