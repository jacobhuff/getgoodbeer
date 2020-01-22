import React, { useContext, useState } from 'react';
import UntappdContext from '../../context/untappd/untappdContext';
import { useHistory } from 'react-router-dom';
import { Spinner } from '../layout/Spinner';

export const Search = () => {
  // History
  let history = useHistory();

  // Context
  const untappdContext = useContext(UntappdContext);
  const { getRecommendedBeers, loading } = untappdContext;

  // State
  const [username, setUsername] = useState('');

  // Functions
  const onChange = e => {
    setUsername(e.target.value);
  };
  const onClick = e => {
    if (e.target.value === '') {
      e.target.placeholder = '';
    }
  };
  const onSubmit = e => {
    e.preventDefault();

    if (username === '') {
      // alert user to fill in all fields
      alert('Please fill in all fields.');
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          successFunction,
          errorFunction
        );
      } else {
        alert(
          'Geolocation is not enabled in your browser. Please use a browser which supports it.'
        );
      }
    }
  };

  // If location is found
  const successFunction = async position => {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    await getRecommendedBeers(username, lat, long);
    setUsername('');

    // Redirect
    let redirectURL = `/${username}/beers`;
    history.push(redirectURL);
  };

  // If location is not found
  const errorFunction = async position => {
    alert(
      'We could not successfully access your location to recommend local beers.'
    );
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className='search-container'>
        <p>Enter your Untappd username</p>
        <form onSubmit={onSubmit}>
          <input
            onClick={onClick}
            onChange={onChange}
            autoComplete='off'
            type='text'
            name='username'
            placeholder='Username...'
            value={username}
            className='search-input'
          />
          <input value='Search' type='submit' className='search-submit' />
        </form>
      </div>
    );
  }
};
