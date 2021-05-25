import React, { useEffect, useState, useRef } from 'react';
import SearchInfo from './SearchInfo';

const AutoComplete = ({changeCallback, handleSearchListClick, data, resultCount = 0}) => {
  const input_ref = useRef();
  const [input_value, setInputValue] = useState(null);
  const [displayed_value, setDisplayedValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setDisplayedValue(e.target.value);
    changeCallback(e.target.value);
  }

  const handleKeyDown = (e) => {
    //TODO: arrow key to change active list element
    //TODO: esc - close auto
    //TODO: enter - accept choice if li choosen or first
  }

  useEffect(() => {
    input_ref.current.focus();
  }, []);
  
  useEffect(() => {
  }, [input_value]);
  return (
    <form className="autocomplete">
      <input
          type="text"
          className="input__search"
          value={displayed_value}
          ref={input_ref}
          palceholder="Start typing for search ..."
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        {(input_value && input_value.length > 0)  &&
          <ul>
            <SearchInfo key="info" search_term={displayed_value} />
            {data && data.map(record => <li
              key={record.id}
              onClick={() => handleSearchListClick(record.id)}>{record.name}</li>)}
          </ul>
        }
      </form>
  );
}

export default AutoComplete;