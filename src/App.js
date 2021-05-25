import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import endpoints from './config/endpoints';
import { deezerService } from './services/deezer';
import AutoComplete from './components/search/Autocomplete';

import './App.css';

function App() {
  
  const [search_query, setSearchQuery] = useState(null);
  const [result_count, setResultCount] = useState(0);
  const [setArtistDetials] = useState(null);
  const debouncedSendQuery = _.throttle(setSearchQuery, 300);
  const [filtered_list, fillFilteredResult] = useState(null);

  const filterResult = (result_list, query) => {
    return result_list.filter(item => {
      const match = item.name.match(new RegExp(`^(${query})`,'ig'));
      return match !== null;
    }
    ).slice(0,5);
  }

  const handleSearchListClick = (id) => {
    deezerService(id, endpoints.artist, setArtistDetials);
  }

  useEffect(() => {
    if (search_query && search_query.length > 1) {
      const fillResultWithFilter = (result) => {
        const res = filterResult(result, search_query);
        // fillResultList(result);
        fillFilteredResult(res);
        setResultCount(result ? result.length : 0);
      }
      deezerService(search_query, endpoints.searchex, fillResultWithFilter);
    }
  }, [search_query]);


  return (
    <div className="App">
      <header className="App-header">
        <AutoComplete
          changeCallback={debouncedSendQuery}
          resultCount={result_count}
          data={filtered_list}
          handleSearchListClick={handleSearchListClick}
        />
      </header>
    </div>
  );
}

export default App;
