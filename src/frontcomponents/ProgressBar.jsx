import React from "react";
import loadingGif from "../assets/loading.svg"
import "./ProgressBar.css";

export default function ProgressBar(props) {
  return (
    <React.Fragment>
      <div>
        <img src={loadingGif} alt="loadingGif"/>
      </div>
      <div className='outterBar'>
        <div className='innerBar' style={{ width: `${props.loadingPercentage}%` }}>
          <span>{props.loadingPercentage}%</span>
        </div>
      </div>
    </React.Fragment>
  );
}