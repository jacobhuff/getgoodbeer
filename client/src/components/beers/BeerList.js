import React, { useContext } from 'react';
import UntappdContext from '../../context/untappd/untappdContext';
import { Beer } from './Beer';
import { Error } from '../errors/Error';
import { Redirect } from 'react-router-dom';

export const BeerList = () => {
  // Context
  const untappdContext = useContext(UntappdContext);
  const { userBeers } = untappdContext;

  if (
    Object.entries(userBeers).length === 0 &&
    userBeers.constructor === Object
  ) {
    return <Redirect to='/' />;
  } else if (userBeers === 'ERROR') {
    return <Error />;
  } else {
    return (
      <div>
        {userBeers.map((beer, i) => (
          <div key={i}>
            <Beer data={beer} num={i} />
          </div>
        ))}
      </div>
    );
  }
};
