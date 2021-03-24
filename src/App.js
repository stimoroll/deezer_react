import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import endpoints from './config/endpoints';
import { deezerService } from './services/deezer';
import AutoComplete from './components/search/Autocomplete';

import './App.css';

/*
TODO: search input should dispaly: Search Here and count of result so
TODO: in proxy remove limit and move limit to inside of Autocomplete component
*/

const SarchInfo = ({search_term}) => {
  const label = `Search results for "${search_term}"`
  return (
    <h2></h2>
  );
}

function App() {
  
  const [search_query, setSearchQuery] = useState(null);
  // const [search_query, setSearchQuery] = useState('kult');
  const [input_value, setInputValue] = useState(null);
  const [artist_details, setArtistDetials] = useState(null);

  const debouncedSendQuery = _.throttle(setSearchQuery, 2000);

  const [result_list, fillResultList] = useState(null);



  const handleSearchListClick = (id) => {
    deezerService(id, endpoints.artist, setArtistDetials);
  }

  useEffect(() => {
    if (search_query && search_query.length > 0) {
      deezerService(search_query, endpoints.search, fillResultList);
    }
  }, [search_query]);


  return (
    <div className="App">
      <header className="App-header">
        <AutoComplete
          changeCallback={debouncedSendQuery}
          data={result_list}
          handleSearchListClick={handleSearchListClick}
        />
      </header>
    </div>
  );
}

export default App;
