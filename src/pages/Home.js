import React from "react";
import logo from "../logo.svg";
import churchImage from "../church_image.jpg";
import { Typography } from "@material-ui/core";

export default () => (
  <div>
    <style>
      {`
      img {
        display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
      }`}
    </style>
    <Typography align="center" gutterBottom={true} variant="display4">
      Welcome!
    </Typography>
    <img src={logo} className="App-logo" alt="logo" />
    <Typography align="center" gutterBottom={true} variant="display1">
      Feel free to use the navigation bar at the top of the screen to manage
      your data...Enjoy!
    </Typography>
    <img src={churchImage} />
  </div>
);
