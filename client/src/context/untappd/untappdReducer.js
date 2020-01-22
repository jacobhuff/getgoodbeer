import { SET_LOADING, GET_RECOMMENDED_BEERS } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_RECOMMENDED_BEERS:
      return {
        ...state,
        loading: false,
        recommendedBeers: action.payload
      };
    default:
      return state;
  }
};
