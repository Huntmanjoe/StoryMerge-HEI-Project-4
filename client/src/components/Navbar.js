import React from 'react';

function Navbar() {
    return (
      <nav style={{
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '20px', 
        background: 'skyblue'
      }}>
        <h1>StoryMerge</h1>
        <button style={{
          padding: '10px 20px', 
          fontSize: '16px', 
          cursor: 'pointer'
        }}>Login</button>
      </nav>
    );
  }

export default Navbar;