import React, { useEffect, useState, useRef } from 'react';

const AutoComplete = ({changeCallback, handleSearchListClick, data}) => {
  const input_ref = useRef();
  const [input_value, setInputValue] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    // debouncedSendQuery(e.target.value);
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
  return (
    <form className="autocomplete">
      <input
          type="text"
          className="input__search"
          value={input_value}
          ref={input_ref}
          palceholder="Start typing for search ..."
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        {(input_value && input_value.length > 0)  &&
          <ul>
            <li>Search results:</li>
            {data && data.map(record => <li
              key={record.id}
              onClick={() => handleSearchListClick(record.id)}>{record.name}</li>)}
          </ul>
        }
      </form>
  );
}

export default AutoComplete;