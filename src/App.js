import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import _ from 'lodash';
import './App.css';

const search_endpint = (search) => `https://proxy.kpoplawski.repl.co/search/${search}`;
const artist_endpint = (artist) => `https://proxy.kpoplawski.repl.co/artist/${artist}`;

function App() {
  const input_ref = useRef()
  // const [search_query, setSearchQuery] = useState('');
  const [search_query, setSearchQuery] = useState('kult');
  const [input_value, setInputValue] = useState('');
  const [artist_details, setArtistDetials] = useState(null);

  const debouncedSendQuery = _.throttle(setSearchQuery, 2000);

  const [result_list, fillResultList] = useState(null);
  // const [result_list, fillResultList] = useState([]);

  const searchArtistService = _.throttle((search_query, callback) => {
    axios.get(search_endpint(search_query))
      .then(response => {
        callback(response.data.data);
        // console.log(response.data.data);
      })
      .catch(error => console.log(error));
  }, 1000);

  const getArtistService = _.throttle((artist_id, callback) => {
      axios.get(artist_endpint(artist_id))
        .then(response => {
          callback(response.data.data);
          // console.log(response.data.data);
        })
        .catch(error => console.log(error));
  }, 300);

  const handleInputChange = (e) => {
    console.log(e);
    setInputValue(e.target.value);

    debouncedSendQuery(e.target.value);
  }

  const handleSearchListClick = (id) => {
    getArtistService(id, setArtistDetials);
  }

  useEffect(() => {
    if (search_query && search_query.length > 0) {
      searchArtistService(search_query, fillResultList);
    }
  }, [search_query]);

  useEffect(() => {
    input_ref.current.focus();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <input
          type="text"
          className="input__search"
          value={input_value}
          ref={input_ref}
          onChange={handleInputChange}
        />
        {result_list &&
          <ul>
            {result_list.map(record => <li
              key={record.id}
              onClick={() => handleSearchListClick(record.id)}>{record.name}</li>)}
          </ul>
        }

      </header>
    </div>
  );
}

export default App;
