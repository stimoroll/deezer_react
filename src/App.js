import React, { useEffect, useState, useRef } from 'react';
import _ from 'lodash';
import endpoints from './config/endpoints';
import { deezerService } from './services/deezer';

import './App.css';

const SarchInfo = ({search_term}) => {
  const label = `Search results for "${search_term}"`
  return (
    <h2></h2>
  );
}

const AutoComplete = () => {
  //Sarch here ( assigement 1)
  return (
    <></>
  );
}


function App() {
  const input_ref = useRef()
  const [search_query, setSearchQuery] = useState(null);
  // const [search_query, setSearchQuery] = useState('kult');
  const [input_value, setInputValue] = useState(null);
  const [artist_details, setArtistDetials] = useState(null);

  const debouncedSendQuery = _.throttle(setSearchQuery, 2000);

  const [result_list, fillResultList] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    debouncedSendQuery(e.target.value);
  }

  const handleSearchListClick = (id) => {
    deezerService(id, endpoints.artist, setArtistDetials);
  }

  useEffect(() => {
    if (search_query && search_query.length > 0) {
      deezerService(search_query, endpoints.search, fillResultList);
    }
  }, [search_query]);

  useEffect(() => {
    input_ref.current.focus();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <form className="autocomplete">
        <input
          type="text"
          className="input__search"
          value={input_value}
          ref={input_ref}
          palceholder="Start typing for search ..."
          onChange={handleInputChange}
        />
        {(search_query && search_query.length > 0)  &&
          <ul>
            <li>Search results:</li>
            {result_list && result_list.map(record => <li
              key={record.id}
              onClick={() => handleSearchListClick(record.id)}>{record.name}</li>)}
          </ul>
        }
      </form>
      </header>
    </div>
  );
}

export default App;
