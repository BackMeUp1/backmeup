// Index.js
import React from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div>
      <h1>Welcome to Your Website</h1>
      <p>This is the landing page content.</p>
      <Link to="/login">
        <button>Sign In</button>
      </Link>
      <Link to="/signup">
        <button>Sign Up</button>
      </Link>
    </div>
  );
};

export default Index;
