import React from "react";
import "./Logo.css";
import SkylinksLogo from "../assets/SkylinksLogo.png";

const Logo = (props) => {
  return (
    <div id="logo">
      <p>
        <img className="titleLogo" src={SkylinksLogo} alt="skylinksLogo"></img> SKYLINKS
      </p>
    </div>
  );
};

export default Logo;
