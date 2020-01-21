import React from 'react';

export const Beer = ({ data }) => {
  return (
    <div className='beer-card'>
      <img alt={data.beer.beer_name} src={data.beer.beer_label} />
      <p className='beer-name'>{data.beer.beer_name}</p>
      <p className='beer-style'>{data.beer.beer_style}</p>
      <p className='brewery-name'>{data.brewery.brewery_name}</p>
      <p className='checkin-location'>
        <span>{data.venue.venue_name}</span>
        {data.venue.location.venue_address}{' '}
        {data.venue.location.venue_city !== ''
          ? data.venue.location.venue_city +
            ', ' +
            data.venue.location.venue_state
          : data.venue.location.venue_state}
      </p>
      {data.venue.contact.venue_url !== undefined && (
        <a
          className='brewery-website'
          href={data.brewery.contact.url}
          target='_blank'
          rel='noopener noreferrer'
        >
          Visit Website
        </a>
      )}
    </div>
  );
};
