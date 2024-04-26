import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StatisticsCircle.css'; 
import AddDistrictForm from './AddDistrict';

const StatisticsCircle = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:8000/suse/budget');
        setData1(response.data.data1);
        setData2(response.data.data2);
        setData3(response.data.data3);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  const [showAdditionalGraphs, setShowAdditionalGraphs] = useState([false, false, false]);
    const [additionalData, setAdditionalData] = useState([]);

    const handleClick=()=>{
        <div></div>
    };

    const handleCircleClick = (index, arg) => {
        console.log(arg);
        const updatedShowAdditionalGraphs = [...showAdditionalGraphs];
        updatedShowAdditionalGraphs[index] = !updatedShowAdditionalGraphs[index];
        console.log(updatedShowAdditionalGraphs[index]);
        setShowAdditionalGraphs(updatedShowAdditionalGraphs);
        setAdditionalData(arg);
      };
      
      const isDataEmpty = !data1.length && !data2.length && !data3.length;
      return (
        <>
        <h1 style={{"fontWeight":"20px"}}>
            The Authority
        </h1>
        <div className="statistics-container">
      {isLoading || isDataEmpty ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="statistics-content">
          <div className="statistics-row">
            <div className="statistics-item">
              <h2>Finance</h2>
              {(() => {
                let sum = 0;
                let asum = 0;
                data1?.forEach((item) => {
                  sum += item.usedbudget;
                  asum += item.allocatedbudget;
                });
                return (
                  <div className="circle-progress-container">
                    <CircleProgress
                      value={(sum / asum) * 100}
                      text={`${((sum / asum) * 100).toFixed(2)}%`}
                      onClick={() => handleCircleClick(0, data1)}
                    />
                    {showAdditionalGraphs[0] && (
                      <div className="additional-graphs">
                        {data1.map((item, i) => (
                          <div key={`data1-${item.districtName}`} className="additional-graph">
                            <h3>{item.name}</h3>
                            <CircleProgress
                              value={(item.usedbudget / item.allocatedbudget) * 100}
                              text={`${((item.usedbudget / item.allocatedbudget) * 100).toFixed(2)}%`}
                              onClick={handleClick}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}
              </div>
              <div className="statistics-item">
            <h2>Education</h2>
              {(() => {
                let sum = 0;
                let asum = 0;
                data2?.forEach((item) => {
                  sum += item.usedbudget;
                  asum += item.allocatedbudget;
                });
                return (
                  <div className="circle-progress-container">
                    <CircleProgress
                      value={(sum / asum) * 100}
                      text={`${((sum / asum) * 100).toFixed(2)}%`}
                      onClick={() => handleCircleClick(1, data2)}
                    />
                    {showAdditionalGraphs[1] && (
                      <div className="additional-graphs">
                        {data2.map((item, i) => (
                          <div key={`data2-${item.districtName}`} className="additional-graph">
                            <h3>{item.districtName}</h3>
                            <CircleProgress
                              value={(item.usedbudget / item.allocatedbudget) * 100}
                              text={`${((item.usedbudget / item.allocatedbudget) * 100).toFixed(2)}%`}
                              onClick={handleClick}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}
              </div>
              <div className="statistics-item">
            <h2>Health</h2>
              {(() => {
                let sum = 0;
                let asum = 0;
                data3?.forEach((item) => {
                  sum += item.usedbudget;
                  asum += item.allocatedbudget;
                });
                return (
                  <div className="circle-progress-container">
                    <CircleProgress
                      value={(sum / asum) * 100}
                      text={`${((sum / asum) * 100).toFixed(2)}%`}
                      onClick={() => handleCircleClick(2, data3)}
                    />
                    {showAdditionalGraphs[2] && (
                      <div className="additional-graphs">
                        {data3.map((item, i) => (
                          <div key={`data3-${item.districtName}`} className="additional-graph">
                            <h3>{item.districtName}</h3>
                            <CircleProgress
                              value={(item.usedbudget / item.allocatedbudget) * 100}
                              text={`${((item.usedbudget / item.allocatedbudget) * 100).toFixed(2)}%`}
                              onClick={handleClick}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}
              </div>
          </div>
          </div>
        )}

      </div>
        <AddDistrictForm/>
      </>
    );
  };


  

const CircleProgress = ({ value, text, onClick }) => {
  const circumference = 2 * Math.PI * 50; // Adjust the radius as needed
  const strokeDashOffset = circumference - (value / 100) * circumference;
  const colorValue = (value / 100) * 255; // Convert percentage to a value between 0 and 255

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      <svg width="100" height="100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          stroke="#ddd"
          strokeWidth="10"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          stroke={`rgb(${colorValue}, ${255 - colorValue}, 0)`}
          strokeWidth="10"
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset: strokeDashOffset }}
          transform={`rotate(-90 50 50)`}
        />
        <text x="50" y="60" textAnchor="middle" fontSize="16" fill="#333">
          {text}
        </text>
      </svg>
    </div>
  );
};


export default StatisticsCircle;