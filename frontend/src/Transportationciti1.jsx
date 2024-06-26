import React, { useEffect, useState } from 'react';
import Carousel from './SliderDataTransport';
import axios from 'axios';
import './Transportation.css';
// const nodemailer = require('nodemailer');
import { ToastContainer, toast } from "react-toastify";


function Transportationciti1() {
  const [editIndex, setEditIndex] = useState(-1)
  const [budgetData, setBudgetData] = useState([]);
  const [editedBudget, setEditedBudget] = useState(0)
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [complaint, setComplaint] = useState('');
  const [disable,setDisabled]=useState(false);

  useEffect(()=>{
    (async ()=>{
      try {
        const response = await axios.get('http://localhost:8000/duse/daddbudget');
        const data = response.data.budgetData;
        setBudgetData(data)
      } catch (error) {
        
      }
    })()
  }, [])

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleSort = (value) => {
    setSortBy(value);
  };

  const handleComplaint = (event) => {
    setComplaint(event.target.value);
  };

  useEffect(()=>{
    if (sortBy === 'allocatedbudget') {
      setBudgetData(oldData => {
        const newData = [...oldData];
        newData.sort((a, b) => b.allocatedbudget - a.allocatedbudget)
        return newData
      })
    } else if (sortBy === 'usedbudget') {
      setBudgetData(oldData => {
        const newData = [...oldData];
        newData.sort((a, b) => b.usedbudget - a.usedbudget)
        return newData;
      })
    }else{
      setBudgetData(oldData => {
        const newData = [...oldData];
        newData.sort((a, b) => a.name.localeCompare(b.name))
        return newData;
    })
    }
          
    }, [sortBy])

  const sortedData = budgetData.length>0 ? budgetData.sort((a, b) => {
    if (sortBy === 'allocatedbudget') {
      return b.allocatedbudget - a.allocatedbudget;
    } else if (sortBy === 'usedbudget') {
      return b.usedbudget - a.usedbudget;
    } else {
      return a.serialNumber - b.serialNumber;
    }
  }) : [];

  const filteredData = budgetData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Render the table rows using the filteredData
  {filteredData.map((item, index) => (
    <tr key={index}>
      <td>{item.name}</td>
      <td>{item.allocatedbudget}</td>
      <td>{editIndex === index ? (
        <>
          <input 
            type='number' 
            min={0}
            max={item.allocatedbudget - item.usedbudget} 
            value={editedBudget} 
            onChange={(e) => setEditedBudget(parseInt(e.target.value))} 
            placeholder="enter new data" 
          />
          <button onClick={() => handleSaveNewData(item.allocatedbudget, item.usedbudget, item.name)}>save</button>
        </>
      ) : (
        <p>{item.usedbudget}</p>
      )}</td>
      <td> 
        <button
          style={{
            padding: '5px 10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
          }}
          onClick={() => handleEdit(index)}
        >add
        </button>
      </td>
    </tr>
  ))}

  const handleEdit=async (index)=>{
    setEditIndex(index);
    // setEditedBudget(filteredData[index].)
    // setEditedDistrict(filteredData[index].districtName)
    // index.preventDefault();
    // try{
    //   const response = await axios.post("http://localhost:8000/duse/daddbudget",{
    //     name: editedDistrict,
    //     usedbudget: editedBudget,
    //   });
    // navigate("/minfolder/minhome");
    // }
    // catch(error){
    //   console.log(error);
    // }
  }

  const handleSaveNewData =async  (allocatedbudget,usedbudget,districtName)=>{
    console.log(usedbudget, allocatedbudget, editedBudget)
    if(editedBudget + usedbudget > allocatedbudget){
      alert("cannot be updated")
    
    } else{
      const newUsedBudget = editedBudget + usedbudget;
      try{
          const response = await axios.post("http://localhost:8000/duse/daddbudget",{
            name: districtName,
            usedbudget: newUsedBudget,
          });
        }
        catch(error){
          console.log(error);
        }
      setBudgetData(oldData=>oldData.map((data)=>{
        if(data.name === districtName){
          return {
            ...data, usedbudget: newUsedBudget
          }
        } else{
          return data;
        }
      }))
    }
    setEditIndex(-1)
    

  }

  const handleEmailSubmit = async () => {
    try{
      console.log("inside this");
      // const emailTo = localStorage.getItem("email")
      setDisabled(true)
      toast.success("Sending Email, Please wait!", {
        position: "top-right",
    });
      const response=await axios.post("http://localhost:8000/cuse/send-email",{
        complaint:complaint,
        mail:localStorage.getItem("email")
      });
      toast.success("Email Sent", {
        position: "top-right",
    });
    setComplaint("");
    setDisabled(false);
  }catch(error){
    console.log("error sending mail");
    setDisabled(false);
  }
  };


  return (
    <div className="app">
      {/* <Header /> */}
      {/* <Carousel /> */}
      <ToastContainer/>
      <h1>Finance Sector</h1>
      <img src="../public/finance.jpg" alt="finance image" className="background-image" />
      <div className="transport-container">
        <h2>Budget Table</h2>
        <div className="search-sort-container">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by district name..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="sort-container">
            <label htmlFor="sort-select">Sort by:</label>
            <select id="sort-select" value={sortBy} onChange={(e) => handleSort(e.target.value)}>
              <option value="">Default</option>
              <option value="allocatedbudget">Allocated Budget</option>
              <option value="usedbudget">Used Budget</option>
            </select>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>District Name</th>
              <th>Allocated Budget</th>
              <th>Used Budget</th>
            </tr>
          </thead>
          <tbody>
  {budgetData.map((item, index) => (
    <tr key={index}>
      <td>{item.name}</td>
      <td>{item.allocatedbudget}</td>
      <td>{editIndex===index ? <>
      <input type='number' min={0}
              max={item.allocatedbudget - item.usedbudget} value={editedBudget} onChange={(e)=>setEditedBudget(parseInt(e.target.value))} placeholder="enter new data"></input>
      <button onClick={()=>handleSaveNewData(item.allocatedbudget, item.usedbudget, item.name)}>save</button></> :<p>{item.usedbudget}</p>}</td>
      <td> 
      </td>
    </tr>
  ))}
</tbody>
        </table>
        <div className="complaint-container">
          <h3 style={{"color":"black"}}>Submit a Complaint</h3>
          <textarea
            placeholder="Enter your complaint here..."
            value={complaint}
            onChange={handleComplaint}
          />
          {complaint !== "" &&(
            <button disabled={disable} onClick={handleEmailSubmit}  style={disable?{"backgroundColor":"grey",cursor: "not-allowed"}:{}}>
              Submit
            </button>
          )}

        </div>
      </div>
    </div>
  );
}

export default Transportationciti1;