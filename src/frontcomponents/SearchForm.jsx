import React, { useState } from "react";
import "./SearchForm.css";

const SearchForm = (props) => {
  const [inputState, setInputState] = useState("");

  return (
    <div className="searchFormContainer">
      <span className="searchInputButtonWrapper">
        <span className="searchInputWrapper">
          <input
            onChange={(event) => setInputState(event.target.value)}
            placeholder='Try "YVR"'
          ></input>
        </span>
        <span className="searchButtonWrapper">
          <button onClick={() => props.getDepartures(inputState)}>Search</button>
        </span>
      </span>
    </div>
  );
};

export default SearchForm;
