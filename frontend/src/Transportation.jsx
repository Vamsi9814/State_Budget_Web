import React, { useState, useEffect } from 'react';
import Carousel from './SliderDataTransport';
import axios from 'axios';
import './Transportation.css';
import Check from './Check';

function Transportation() {
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
        const response = await axios.get('http://localhost:8000/duse/daddbudget');
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
        newData.sort((a, b) => a.name.localeCompare(b.name));
        return newData;
      });
    }
  }, [sortBy]);

  const filteredData = budgetData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = async (index) => {
    setEditIndex(index);
    setEditedBudget(filteredData[index].usedbudget);
    setEditedDistrict(filteredData[index].name);
  };

  const handleSaveNewData = async (allocatedBudget, usedBudget, name) => {
    if (editedBudget + usedBudget > allocatedBudget) {
      alert('Cannot be updated: New used budget exceeds allocated budget');
      return;
    }

    const newUsedBudget = editedBudget + usedBudget;
    try {
      const response = await axios.post('http://localhost:8000/duse/daddbudget', {
        name,
        usedbudget: newUsedBudget,
      });
      setBudgetData((oldData) =>
        oldData.map((data) =>
          data.name === name
            ? { ...data, usedbudget: newUsedBudget }
            : data
        )
      );
    } catch (error) {
      console.error(error);
    }
    setEditIndex(-1);
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
                <td>{item.name}</td>
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
                      <button onClick={() => handleSaveNewData(item.allocatedbudget, item.usedbudget, item.name)}>
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
                      backgroundColor: editIndex === index ? '#007bff' : '#001060',
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
        <Check/>
      </div>
    </div>
  );
}

export default Transportation;