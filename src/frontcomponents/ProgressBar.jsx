import React from "react";
import loadingGif from "../assets/loading.svg"
import "./ProgressBar.css";

export default function ProgressBar(props) {
  return (
    <React.Fragment>
      <div style={{width: window.innerWidth, height: window.innerHeight}}className='loading'> 
        <p className='loadingLineOne'>Welcome to <span className='loadingLogo'>Skylinks</span></p>
        <p className='loadingLineTwo'>Thank you for your patience</p>
        <p className='loadingLineThree'>We are preparing for take-off</p>
        <img src={loadingGif} alt="loadingGif"/>
        <div className='outterBar'>
          <div className='innerBar' style={{ width: `${props.loadingPercentage}%` }}>
            <span>{props.loadingPercentage}%</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}