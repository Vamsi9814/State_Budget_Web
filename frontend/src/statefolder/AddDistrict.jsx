import React, { useState } from 'react';
import axios from 'axios';
import './AddDistrict.css';

const AddDistrictForm = () => {
  const [districtName, setDistrictName] = useState('');
  const [budget1, setBudget1] = useState(0);
  const [budget2, setBudget2] = useState(0);
  const [budget3, setBudget3] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/suse/adddistrict', {
        districtName,
        budget1,
        budget2,
        budget3,
      });
      console.log(response.data);
      // Reset form fields after successful submission
      setDistrictName('');
      setBudget1(0);
      setBudget2(0);
      setBudget3(0);
    } catch (error) {
      console.error('Error adding district:', error);
    }
  };

  return (
    <div
      className="add-district-form"
      style={{ display: 'flex', flexDirection: 'column', marginTop: '0px' }}
    >
      <h2>Add District</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="districtName">
            District Name
          </label>
          </div><div>
          <input
            type="text"
            id="districtName"
            value={districtName}
            onChange={(e) => setDistrictName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="budget1">
            Finance Allocated Budget
          </label>
        </div><div>
          <input
            type="number"
            id="budget1"
            value={budget1}
            onChange={(e) => setBudget1(parseInt(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="budget2">
            Education Allocated Budget
          </label>
        </div>
        <div>
          <input
            type="number"
            id="budget2"
            value={budget2}
            onChange={(e) => setBudget2(parseInt(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="budget3">
            Health Allocated Budget
          </label>
          </div><div>
          <input
            type="number"
            id="budget3"
            value={budget3}
            onChange={(e) => setBudget3(parseInt(e.target.value))}
            required
          />
        </div>
        <button type="submit">Add District</button>
      </form>
    </div>
  );
};

export default AddDistrictForm;