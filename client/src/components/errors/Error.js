import React from 'react';
import { Link } from 'react-router-dom';

export const Error = () => {
  return (
    <div className='error-message'>
      <h1>There was an error processing your request.</h1>
      <Link to='/'>
        <button>Try Again</button>
      </Link>
    </div>
  );
};
