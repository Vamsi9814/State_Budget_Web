import React, { useEffect, useState } from 'react';
import Carousel from './SliderDataTransport';
import axios from 'axios';
import Header from './components/Header';
import './Transportation.css';

function Transportation3() {
  const [editIndex, setEditIndex] = useState(-1)
  const [budgetData, setBudgetData] = useState([
    // { serialNumber: 1, districtName: 'Khammam', allocatedbudget: 10000, usedbudget: 8000 },
    // { serialNumber: 2, districtName: 'Badradri', allocatedbudget: 15000, usedbudget: 12000 },
    // { serialNumber: 3, districtName: 'Ranagreddy', allocatedbudget: 20000, usedbudget: 18000 },
    // { serialNumber: 4, districtName: 'Karimnagar', allocatedbudget: 25000, usedbudget: 22000 },
    // { serialNumber: 5, districtName: 'Adilabad', allocatedbudget: 18000, usedbudget: 15000 },
    // { serialNumber: 6, districtName: 'Nalgonda', allocatedbudget: 22000, usedbudget: 20000 },
    // { serialNumber: 7, districtName: 'Warangal', allocatedbudget: 30000, usedbudget: 28000 },
    // { serialNumber: 8, districtName: 'District H', allocatedbudget: 17000, usedbudget: 14000 },
  ]);
  const [editedBudget, setEditedBudget] = useState(0)
  const [editedDistrict, setEditedDistrict] = useState('')
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [complaint, setComplaint] = useState('');

  useEffect(()=>{
    (async ()=>{
      try {
        const response = await axios.get('http://localhost:8000/duse3/daddbudget3');
        const data = response.data.budgetData;
        setBudgetData(data)
      } catch (error) {
        
      }
    })()
  }, [])

  const handleSearch = (event) => {
    setSearchTerm(event.target.value?.toLowerCase());
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
        newData.sort((a, b) => a.districtName.localeCompare(b.districtName))
        return newData;
    })
    }
          
    }, [sortBy])

  // const sortedData = budgetData.length>0 ? budgetData.sort((a, b) => {
  //   if (sortBy === 'allocatedbudget') {
  //     return b.allocatedbudget - a.allocatedbudget;
  //   } else if (sortBy === 'usedbudget') {
  //     return b.usedbudget - a.usedbudget;
  //   } else {
  //     return a.serialNumber - b.serialNumber;
  //   }
  // }) : [];

  const filteredData = budgetData.filter(item =>
    item?.districtName?.toLowerCase().includes(searchTerm?.toLowerCase())
  );
  
  // Render the table rows using the filteredData
  {filteredData.map((item, index) => (
    <tr key={index}>
      <td>{item.districtName}</td>
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
          <button onClick={() => handleSaveNewData(item.allocatedbudget, item.usedbudget, item.districtName)}>save</button>
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
    //   const response = await axios.post("http://localhost:8000/duse3/daddbudget3",{
    //     districtName: editedDistrict,
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
          const response = await axios.post("http://localhost:8000/duse3/daddbudget3",{
            districtName: districtName,
            usedbudget: newUsedBudget,
          });
        }
        catch(error){
          console.log(error);
        }
      setBudgetData(oldData=>oldData.map((data)=>{
        if(data.districtName === districtName){
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
    try {
      const response = await axios.post('http://localhost:8000/cuse/send-email', { // Assuming your backend is running on port 3001
      complaint // Assuming `complaint` is defined elsewhere in your component
      });
      if (response.ok) {
        console.log('Email sent successfully');
      } else {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div>
      {/* <Header /> */}
      <Carousel />
      <div className="transport-container">
        <h2>Budget Table</h2>
        <div className="search-sort-container">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by district districtName..."
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
              <th>District districtName</th>
              <th>Allocated Budget</th>
              <th>Used Budget</th>
            </tr>
          </thead>
          <tbody>
  {budgetData.map((item, index) => (
    <tr key={index}>
      <td>{item.districtName}</td>
      <td>{item.allocatedbudget}</td>
      <td>{editIndex===index ? <>
      <input type='number' min={0}
              max={item.allocatedbudget - item.usedbudget} value={editedBudget} onChange={(e)=>setEditedBudget(parseInt(e.target.value))} placeholder="enter new data"></input>
      <button onClick={()=>handleSaveNewData(item.allocatedbudget, item.usedbudget, item.districtName)}>save</button></> :<p>{item.usedbudget}</p>}</td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
    </div>
  );
}

export default Transportation3;