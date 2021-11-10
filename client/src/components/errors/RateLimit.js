import React from 'react';
import { Link } from 'react-router-dom';

export const RateLimit = () => {
  return (
    <div className='error-message'>
      <i className='error-icon fas fa-frown'></i>
      <h1>
        Untappd cannot handle any more requests at this time. Please try again
        later.
      </h1>
      <Link to='/'>
        <button>Home</button>
      </Link>
    </div>
  );
};
