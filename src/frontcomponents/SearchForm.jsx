import React, { useState } from "react";
import Fuse from "fuse.js";
import airportFullNames from "../assets/airportFullNames.json";
import "./SearchForm.css";
import ResetIcon from "../assets/ResetIcon.png";

const options = {
  shouldSort: true,
  distance: 300,
  threshold: 0.2,
  keys: ["airportName"],
};

const SearchForm = (props) => {
  const [inputState, setInputState] = useState("");
  const [fsCodeState, setFsCodeState] = useState("");
  const [dropDownListState, setDropDownListState] = useState(false);

  let airportNames = [];
  if (inputState) {
    const fuseName = new Fuse(airportFullNames, options);
    airportNames = fuseName.search(inputState).slice(0, 10);
  }

  console.log(airportNames);
  return (
    <React.Fragment>
      <div className="searchFormContainer">
        <span className="searchInputButtonWrapper">
          <span className="searchInputWrapper">
            <input
              value={inputState}
              onChange={(event) => {
                setInputState(event.target.value);
              }}
              onFocus={() => setDropDownListState(true)}
              placeholder="Search Airport Here"
            ></input>
          </span>
          <span className="searchButtonWrapper">
            <button
              onClick={() => {
                props.getDepartures(fsCodeState);
                setFsCodeState("");
              }}
            >
              Search
            </button>
          </span>
        </span>
        {dropDownListState && (
          <div className="dropdown-content">
            {airportNames.length > 0 ? (
              airportNames.map((airport) => {
                return (
                  <span
                    key={`${airport.item.fs}`}
                    onClick={() => {
                      setInputState(airport.item.airportName);
                      setFsCodeState(airport.item.fs);
                      setDropDownListState(false);
                    }}
                  >
                    {airport.item.airportName}
                  </span>
                );
              })
            ) : (
              <span key={`No Results`}>No Matches Found</span>
            )}
          </div>
        )}
      </div>
      <input
        className="reset"
        type="image"
        alt="Submit"
        src={ResetIcon}
        onClick={() => {
          props.onClear();
          setInputState("");
          setFsCodeState("");
          setDropDownListState(false);
        }}
      />
    </React.Fragment>
  );
};

export default SearchForm;
