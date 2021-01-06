import React from "react";
import loadingGif from "../assets/loading.svg"
import "./Loading.css";
import { useSelector } from 'react-redux'
import SkylinksLogo from "../assets/SkylinksLogo.png";

export default function Loading(props) {
  const loadingStatus = useSelector(state => state)
  const loadingPercentage = ((loadingStatus.itemsLoaded / loadingStatus.itemsTotal) * 100).toFixed()
  const loadingOpacity = loadingPercentage === 100 ? 0 : 1
  return (
    <React.Fragment>
      {!loadingStatus.loadingCompleted && 
        <div style={{opacity:loadingOpacity}}className='loading'> 
          <p className='loadingLineOne'>Welcome to 
            <span className='loadingSkylinks'>Skylinks</span>
          </p>
          <p className='loadingLineTwo'>Thank you for your patience</p>
          <p className='loadingLineThree'>We are preparing for take-off</p>
          <img className ='loadingGif' src={loadingGif} alt="loadingGif"/>
          <div className='outterBar'>
            <div className='innerBar' style={{ width: `${loadingPercentage}%` }}>
              <img className="loadingLogo" src={SkylinksLogo} alt="plane" />
            </div>
          </div>
        </div>
      }
    </React.Fragment>
  );
}