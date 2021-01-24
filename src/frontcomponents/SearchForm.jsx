import React from "react";
import { Input } from "antd";

import "antd/dist/antd.css";
import "./SearchForm.css";

const SearchForm = (props) => {
  const { Search } = Input;

  return (
    <div className="searchFormContainer">
      <span className="searchInputButtonWrapper">
        <span className="searchInputWrapper">
          <input></input>
        </span>
        <span className="searchButtonWrapper">
          <button>Search</button>
        </span>
      </span>
      {/* <Search
        allowClear
        id="searchTextInput"
        placeholder='Try "YVR"'
        enterButton="Search"
        size="large"
        onChange={(value) => {
          console.log(value);
        }}
        onSearch={(value, event) => {
          event.preventDefault();
          props.getDepartures(value);
        }}
      /> */}
    </div>
  );
};

export default SearchForm;
