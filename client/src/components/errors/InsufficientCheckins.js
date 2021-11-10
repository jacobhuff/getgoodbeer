import React from 'react';
import { Link } from 'react-router-dom';

export const InsufficientCheckins = () => {
  return (
    <div className='error-message'>
      <i className='error-icon fas fa-exclamation-triangle'></i>
      <h1>You have not checked in enough beers to give recommendations</h1>
      <Link to='/'>
        <button>Home</button>
      </Link>
    </div>
  );
};
