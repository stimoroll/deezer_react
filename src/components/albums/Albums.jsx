import React from 'react';

const Albums = ({albums_list}) => {
  return (
    <ul>
      {
        albums_list.map(album => <li><Album albumInfo={album} /></li>)
      }
    </ul>
  );
}