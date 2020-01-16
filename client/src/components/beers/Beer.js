import React from 'react';

export const Beer = ({ data }) => {
  return (
    <div>
      <p>{data.beer.beer_name}</p>
    </div>
  );
};
