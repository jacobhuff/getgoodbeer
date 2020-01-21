import React from 'react';
import { Link } from 'react-router-dom';

export const NoCheckins = () => {
  return (
    <div className='error-message'>
      <i className='error-icon fas fa-exclamation-triangle'></i>
      <h1>No beers have been checked in on that account</h1>
      <Link to='/'>
        <button>Home</button>
      </Link>
    </div>
  );
};
