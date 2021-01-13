import React from "react";
import { Input } from "antd";

import "antd/dist/antd.css";
import "./SearchForm.css";

const SearchForm = (props) => {
  const { Search } = Input;

  return (
    <div className="searchFormContainer">
      <Search
        allowClear
        id="searchTextInput"
        placeholder='Try "YVR"'
        enterButton="Search"
        size="large"
        onSearch={(value, event) => {
          event.preventDefault();
          props.getDepartures(value);
        }}
      />
    </div>
  );
};

export default SearchForm;
