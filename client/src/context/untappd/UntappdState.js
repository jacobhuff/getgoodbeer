import React, { useReducer } from 'react';
import axios from 'axios';
import UntappdContext from './untappdContext';
import UntappdReducer from './untappdReducer';
import { SET_LOADING, GET_USER_BEERS } from '../types';

const UntappdState = props => {
  const initialState = {
    loading: false,
    userBeers: {}
  };

  const [state, dispatch] = useReducer(UntappdReducer, initialState);

  // Set Loading
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  // Get Summoner Stats
  const getUserBeers = async (username, lat, long) => {
    setLoading();

    const url = encodeURI(
      `/api?url=https://api.untappd.com/v4/user/beers/${username}&lat=${lat}&long=${long}`
    );

    try {
      const userBeers = await axios.get(url);

      console.log('DATA: ' + JSON.stringify(userBeers.data.response.checkins));

      // dispatch({
      //   type: GET_USER_BEERS,
      //   payload: userBeers.data
      // });
    } catch (err) {
      console.log('ERROR: ' + err);
    }
  };

  return (
    <UntappdContext.Provider
      value={{
        loading: state.loading,
        userBeers: state.userBeers,
        setLoading,
        getUserBeers
      }}
    >
      {props.children}
    </UntappdContext.Provider>
  );
};

export default UntappdState;
