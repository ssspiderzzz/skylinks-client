import React from "react";
import "./ProgressBar.css";

export default function ProgressBar(props) {
  return (
    <div className='outterBar'>
      <div className='innerBar' style={{ width: `${props.loadingPercentage}%` }}>
        <span>{props.loadingPercentage}%</span>
      </div>
    </div>
  );
}