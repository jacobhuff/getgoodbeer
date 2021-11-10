import React, { useContext } from 'react';
import UntappdContext from '../../context/untappd/untappdContext';
import { Beer } from './Beer';
import { Error } from '../errors/Error';
import { Redirect } from 'react-router-dom';
import { RateLimit } from '../errors/RateLimit';
import { InsufficientCheckins } from '../errors/InsufficientCheckins';
import { NoCheckins } from '../errors/NoCheckins';
import { ProfileNotFound } from '../errors/ProfileNotFound';
import { Link } from 'react-router-dom';

export const BeerList = () => {
  // Context
  const untappdContext = useContext(UntappdContext);
  const { recommendedBeers } = untappdContext;

  if (
    Object.entries(recommendedBeers).length === 0 &&
    recommendedBeers.constructor === Object
  ) {
    return <Redirect to='/' />;
  } else if (recommendedBeers === 'ERROR') {
    return <Error />;
  } else if (recommendedBeers === 'INSUFFICIENT_CHECKINS') {
    return <InsufficientCheckins />;
  } else if (recommendedBeers === 'NO_CHECKINS') {
    return <NoCheckins />;
  } else if (recommendedBeers === 'RATE_LIMIT_REACHED') {
    return <RateLimit />;
  } else if (recommendedBeers === 'PROFILE_NOT_FOUND') {
    return <ProfileNotFound />;
  } else {
    return (
      <div className='container'>
        <div className='beer-list-header'>
          <div className='info'>
            Here are some recommendations based off your top three favorite
            styles.
          </div>
          <div className='home'>
            <Link to='/'>
              <button>Home</button>
            </Link>
          </div>
        </div>
        {recommendedBeers.map((beer, i) => (
          <div key={i}>
            <Beer data={beer} num={i} />
          </div>
        ))}
      </div>
    );
  }
};
