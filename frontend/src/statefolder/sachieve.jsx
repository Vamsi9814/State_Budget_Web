import React from 'react';
//import "..components/SApp.css";

function SAchieve() {
  const achievements = [
    { title: 'Education', description: 'Increased literacy rate by 10% in the last 5 years.' },
    { title: 'Healthcare', description: 'Built 20 new hospitals and improved medical facilities across the state.' },
    { title: 'Infrastructure', description: 'Constructed 1000 km of new roads and upgraded transportation networks.' },
    { title: 'Economy', description: 'Attracted significant investments and fostered entrepreneurship, leading to job growth.' },
  ];

  return (
    <div className="App">
      <h1>Our State's Achievements</h1>
      <div className="achievements-container">
        {achievements.map((achievement, index) => (
          <div className="achievement-card" key={index}>
            <h3>{achievement.title}</h3>
            <p>{achievement.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SAchieve;
