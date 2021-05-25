import React from 'react';

const SarchInfo = ({ search_term }) => {
  const label = `Search results for "${search_term}"`
  return (
    <li>{label}:</li>
  );
}

export default SarchInfo;