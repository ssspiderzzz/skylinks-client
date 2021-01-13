import React from "react";
import { Input } from "antd";

import "antd/dist/antd.css";
import "./SearchForm.css";

const SearchForm = (props) => {
  const { Search } = Input;

  return (
    <div id="containerdiv">
      <Search
        allowClear
        id="textinput"
        placeholder='"YVR"'
        enterButton="Search"
        size="large"
        onSearch={(value, event) => {
          event.preventDefault();
          props.getDepartures(value);
        }}
      ></Search>
    </div>
  );
};

export default SearchForm;
