import React, { useEffect, useRef, useState } from "react";
import ThreeEntryPoint from "./ThreeEntryPoint";

export default function ThreeContainer(props) {
  const [state, setState] = useState(null);

  let threeMount = useRef(null);
  useEffect(() => {
    const sceneManager = ThreeEntryPoint(threeMount);
    setState(sceneManager);
  }, []);

  useEffect(() => {
    if (props.realFlightPosition && props.waypoints.length > 0) {
      state.updatePosition(props.realFlightPosition, props.waypoints);
    }
  }, [props.realFlightPosition]);

  if (state) {
    state.clear();
    state.addEntity({
      departure: props.newDeparture,
      arrival: props.newArrival,
      waypoints: props.waypoints,
    });
    if (props.waypoints.length === 0) {
      state.clearAirPlane3d();
    }
  }

  const style = {
    height: "100vh",
    overflow: "hidden",
    zIndex: "0",
  };

  return <div style={style} ref={(ref) => (threeMount = ref)} />;
}
