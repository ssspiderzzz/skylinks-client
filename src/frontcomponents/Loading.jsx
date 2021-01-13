import React, { useState } from "react";
import loadingGif from "../assets/loading.svg";
import "./Loading.css";
import { useSelector } from "react-redux";
import SkylinksLogo from "../assets/SkylinksLogo.png";

export default function Loading(props) {
  const [launch, setLaunch] = useState(false);
  const loadingStatus = useSelector((state) => state);
  const loadingPercentage = (
    (loadingStatus.itemsLoaded / loadingStatus.itemsTotal) *
    100
  ).toFixed();
  const loadingVisibility = launch ? "hidden" : "visible";
  const loadingOpacity = loadingStatus.loadingCompleted ? (launch ? 0 : 0.8) : 1;
  return (
    <React.Fragment>
      <div style={{ opacity: loadingOpacity, visibility: loadingVisibility }} className="loading">
        <p className="loadingLineOne">
          Welcome to
          <span className="loadingSkylinks">Skylinks</span>
        </p>
        <p className="loadingLineTwo">Thank you for your patience</p>
        <p className="loadingLineThree">We are preparing for take-off</p>

        {!loadingStatus.loadingCompleted && (
          <>
            <img className="loadingGif" src={loadingGif} alt="loadingGif" />
            <div className="outterBar">
              <div className="innerBar" style={{ width: `${loadingPercentage}%` }}>
                <img className="loadingLogo" src={SkylinksLogo} alt="plane" />
              </div>
            </div>
          </>
        )}
        {loadingStatus.loadingCompleted && (
          <div className="loadingButton">
            <div
              className="button"
              onClick={() => {
                setLaunch(true);
              }}
            >
              <p>
                <span className="bg"></span>
                <span className="base"></span>
                <span className="text">Start now!</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
