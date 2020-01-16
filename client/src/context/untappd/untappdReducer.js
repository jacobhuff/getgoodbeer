import { SET_LOADING, GET_USER_BEERS } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_USER_BEERS:
      return {
        ...state,
        userBeers: action.payload
      };
    default:
      return state;
  }
};
