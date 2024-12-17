import React from 'react';
import '../index.css';

const Header = () => {
  return (
    <header style={{ backgroundColor: '#FFB6C1' }} className="shadow-md p-4">
      <div className="container mx-auto flex justify-center">
        <h1
          className="text-6xl text-center"
          style={{
            fontFamily: '"Pacifico", cursive',
            color: '#E6E6FA',
          }}
        >
          Well Read and Beyond
        </h1>
      </div>
    </header>
  );
};

export default Header;
