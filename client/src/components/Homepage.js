import React from 'react';
import Navbar from './Navbar';

function Homepage() {
  return (
    <div>
      <Navbar />
      <div style={{
        margin: '20px auto', 
        width: '80%', 
        height: '500px', 
        border: '2px solid black', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        flexDirection: 'column'
      }}>
        <h2>Stories:</h2>
        {/* Placeholder for stories */}
      </div>
    </div>
  );
}

export default Homepage;