import React from 'react';
const FinAchi = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px',
    backgroundColor: '#f8f8f8',
  };

  const headingStyle = {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '40px',
    textAlign: 'center',
    color: '#007bff',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
    transition: 'text-shadow 0.3s ease-in-out',
  };

  const achievementGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gridGap: '40px',
    justifyContent: 'center',
  };

  const achievementStyle = {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  };

  const achievementHoverStyle = {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  };

  const achievementTitleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '16px',
    color: '#333',
    transition: 'color 0.3s ease-in-out',
  };

  const achievementDescriptionStyle = {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#555',
    transition: 'color 0.3s ease-in-out',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Finance Ministry Achievements</h1>
      <div style={achievementGridStyle}>
        <div style={{ ...achievementStyle, ':hover': achievementHoverStyle }}>
          <h2 style={achievementTitleStyle}>2nd Highest GDP per Capita</h2>
          <p style={achievementDescriptionStyle}>
            Among the states with population of 3 crore or more, our state stood second in terms of GDP per capita only next to Kerala.
          </p>
        </div>
        <div style={{ ...achievementStyle, ':hover': achievementHoverStyle }}>
          <h2 style={achievementTitleStyle}>Infrastructure Development</h2>
          <p style={achievementDescriptionStyle}>
            Completed several major infrastructure projects improving connectivity and quality of life.
          </p>
        </div>
        <div style={{ ...achievementStyle, ':hover': achievementHoverStyle }}>
          <h2 style={achievementTitleStyle}>Social Welfare Programs</h2>
          <p style={achievementDescriptionStyle}>
            Launched initiatives to support vulnerable populations, providing aid and assistance.
          </p>
        </div>
        <div style={{ ...achievementStyle, ':hover': achievementHoverStyle }}>
          <h2 style={achievementTitleStyle}>Economic Growth</h2>
          <p style={achievementDescriptionStyle}>
            Contributed to significant economic growth through strategic investments and reforms.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinAchi;