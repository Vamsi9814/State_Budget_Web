import React, { useState, useEffect } from 'react';
import Carousel from './SliderDataTransport';
import axios from 'axios';
import './Transportation.css';

function Transportation2() {
  const [editIndex, setEditIndex] = useState(-1);
  const [budgetData, setBudgetData] = useState([]);
  const [editedBudget, setEditedBudget] = useState(0);
  const [editedDistrict, setEditedDistrict] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [complaint, setComplaint] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('http://localhost:8000/duse2/daddbudget2');
        const data = response.data.budgetData;
        setBudgetData(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleSort = (value) => {
    setSortBy(value);
  };

  const handleComplaint = (event) => {
    setComplaint(event.target.value);
  };

  useEffect(() => {
    if (sortBy === 'allocatedbudget') {
      setBudgetData((oldData) => {
        const newData = [...oldData];
        newData.sort((a, b) => b.allocatedbudget - a.allocatedbudget);
        return newData;
      });
    } else if (sortBy === 'usedbudget') {
      setBudgetData((oldData) => {
        const newData = [...oldData];
        newData.sort((a, b) => b.usedbudget - a.usedbudget);
        return newData;
      });
    } else {
      setBudgetData((oldData) => {
        const newData = [...oldData];
        newData.sort((a, b) => a.districtName.localeCompare(b.districtName));
        return newData;
      });
    }
  }, [sortBy]);

  const filteredData = budgetData.filter((item) =>
    item.districtName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = async (index) => {
    setEditIndex(index);
    setEditedBudget(filteredData[index].usedbudget);
    setEditedDistrict(filteredData[index].districtName);
  };

  const handleSaveNewData = async (allocatedBudget, usedBudget, districtName) => {
    if (editedBudget + usedBudget > allocatedBudget) {
      alert('Cannot be updated: New used budget exceeds allocated budget');
      return;
    }

    const newUsedBudget = editedBudget + usedBudget;
    try {
      const response = await axios.post('http://localhost:8000/duse2/daddbudget2', {
        districtName,
        usedbudget: newUsedBudget,
      });
      setBudgetData((oldData) =>
        oldData.map((data) =>
          data.districtName === districtName
            ? { ...data, usedbudget: newUsedBudget }
            : data
        )
      );
    } catch (error) {
      console.error(error);
    }
    setEditIndex(-1);
  };

  const handleEmailSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/cuse/send-email', {
        complaint,
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.districtName}</td>
                <td>{item.allocatedbudget}</td>
                <td>
                  {editIndex === index ? (
                    <>
                      <input
                        type="number"
                        min={0}
                        max={item.allocatedbudget - item.usedbudget}
                        value={editedBudget}
                        onChange={(e) => setEditedBudget(parseInt(e.target.value))}
                        placeholder="enter new data"
                      />
                      <button onClick={() => handleSaveNewData(item.allocatedbudget, item.usedbudget, item.districtName)}>
                        save
                      </button>
                    </>
                  ) : (
                    <p>{item.usedbudget}</p>
                  )}
                </td>
                <td>
                  <button
                    style={{
                      padding: '5px 10px',
                      backgroundColor: editIndex === index ? '#007bff' : '#001060', // Change button color for editing
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleEdit(index)}
                  >
                    {editIndex === index ? 'Update' : 'Edit'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transportation2;