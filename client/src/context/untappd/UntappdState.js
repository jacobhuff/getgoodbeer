import React, { useReducer } from 'react';
import axios from 'axios';
import UntappdContext from './untappdContext';
import UntappdReducer from './untappdReducer';
import { SET_LOADING, GET_RECOMMENDED_BEERS } from '../types';

const UntappdState = props => {
  const initialState = {
    loading: false,
    recommendedBeers: {}
  };

  const [state, dispatch] = useReducer(UntappdReducer, initialState);

  // Set Loading
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  // Get Summoner Stats
  const getRecommendedBeers = async (username, lat, long) => {
    setLoading();

    const url = encodeURI(
      `/api?url=https://api.untappd.com/v4/user/beers/${username}&lat=${lat}&long=${long}`
    );

    try {
      const recommendedBeers = await axios.get(url);

      dispatch({
        type: GET_RECOMMENDED_BEERS,
        payload: recommendedBeers.data
      });
    } catch (err) {}
  };

  return (
    <UntappdContext.Provider
      value={{
        loading: state.loading,
        recommendedBeers: state.recommendedBeers,
        setLoading,
        getRecommendedBeers
      }}
    >
      {props.children}
    </UntappdContext.Provider>
  );
};

export default UntappdState;
