import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './App.css';

const search_endpint = (search) => `https://proxy.kpoplawski.repl.co/search/${search}`;

function App() {
  const input_ref = useRef()
  const [search_query, setSearchQuery] = useState('enya');
  const [input_value, setInputValue] = useState('');

  const handleInputChange = (e) => {
    console.log(e);
    setInputValue(e.target.value);
    setSearchQuery(e.target.value);
  }
  useEffect(() => {
    // if (search_query && search_query.length > 0) {
      axios.get(search_endpint(search_query))
        .then(response => console.log(response))
        .catch(error => console.log(error));
    // }
  }, [search_query])
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

      </header>
    </div>
  );
}

export default App;
