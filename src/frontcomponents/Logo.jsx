import React from "react";
import "./Logo.css";
import SkylinksLogo from "../assets/SkylinksLogo.png";

const Logo = props => {
  return (
    <div id="logo">
      <p>
        <img className="plane" src={SkylinksLogo} alt="plane"></img> SKYLINKS
      </p>
    </div>
  );
};

export default Logo;
