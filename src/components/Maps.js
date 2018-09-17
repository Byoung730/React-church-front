import React, { Component } from "react";
import "ol/ol.css";
import { Map as newMap, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { Typography } from "@material-ui/core";

export default class Maps extends Component {
  render() {
    const maps = new newMap({
      target: "maps",
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    });
    return (
      <div>
        <style>
          {`
    maps {
      width: 400px;
      height: 400px;
    }`}
        </style>
        <Typography variant="display1" align="center" gutterBottom={true}>
          Zoom in(+/-) and adjust(click and drag) to find your location and
          route
        </Typography>
        <Typography variant="display1" align="center" gutterBottom={true}>
          You may need to refresh this page if there is a slow data connection
        </Typography>
        <div id="maps" />
      </div>
    );
  }
}
