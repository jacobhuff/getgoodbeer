import React from 'react';
import { Link } from 'react-router-dom';

export const ProfileNotFound = () => {
  return (
    <div className='error-message'>
      <i className='error-icon fas fa-frown'></i>
      <h1>Sorry, that profile does not exist.</h1>
      <Link to='/'>
        <button>Home</button>
      </Link>
    </div>
  );
};
