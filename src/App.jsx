import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import ThreeContainer from "./threejs/ThreeContainer";
import RouteList from "./frontcomponents/RouteList";
import SearchForm from "./frontcomponents/SearchForm";
import ResetButton from "./frontcomponents/ResetButton";
import ScheduleListTable from "./frontcomponents/ScheduleListTable";
import Logo from "./frontcomponents/Logo";
import Slider from "./frontcomponents/Slider";
import Loading from "./frontcomponents/Loading";

const App = () => {
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState(""); //list
  const [departureFs, setDepartureFs] = useState(""); //single
  const [arrivalAirportFs, setArrivalAirportFs] = useState("");
  const [schedule, setSchedule] = useState("");
  const [waypoints, setWaypoints] = useState([]);
  const [realFlightPosition, setRealFlightPosition] = useState(0);

  useEffect(() => {
    const fetchData = () => {
      if (departureFs)
        axios.get(`https://skylinks.herokuapp.com/api/airports/${departureFs}`).then((response) => {
          if (response.data) {
            setDepartureAirport(response.data.departure);
            setArrivalAirport(response.data.arrival);
          }
        });
    };

    fetchData();
  }, [departureFs]);

  useEffect(() => {
    const fetchFlightSchedule = () => {
      if (arrivalAirport.length === 1)
        axios
          .get(
            `https://skylinks.herokuapp.com/api/schedules/from/${departureAirport.fs}/to/${arrivalAirport[0].fs}`
          )
          .then((response) => {
            if (response.data) {
              setSchedule(response.data);
            }
          });
    };
    const fetchWaypoints = () => {
      let departure = "";
      let arrival = "";
      if (departureFs && arrivalAirportFs) {
        departure = departureFs;
        arrival = arrivalAirportFs;
        axios
          .get(`https://skylinks.herokuapp.com/api/real/from/${departure}/to/${arrival}`)
          .then((response) => {
            if (response.data) {
              setWaypoints(response.data);
            }
          });
      }
    };
    fetchFlightSchedule();
    fetchWaypoints();
  }, [arrivalAirportFs, departureFs, arrivalAirport, departureAirport]);

  const arrivals = () => {};

  const getDepartures = (departureAirportCode) => {
    if (departureAirportCode === departureFs) {
      if (departureFs)
        axios.get(`https://skylinks.herokuapp.com/api/airports/${departureFs}`).then((response) => {
          if (response.data) {
            setDepartureAirport(response.data.departure);
            setArrivalAirport(response.data.arrival);
          }
        });
      setDepartureFs("");
      setWaypoints([]);
    }
    setDepartureFs(departureAirportCode.toUpperCase());
  };

  const onSelect = (selected_arrival) => {
    setArrivalAirport([selected_arrival]);
    setArrivalAirportFs([selected_arrival.fs][0]);
  };

  const onClear = () => {
    setDepartureAirport("");
    setArrivalAirport("");
    setSchedule("");
    setDepartureFs("");
    setArrivalAirportFs("");
    setWaypoints([]);
  };

  return (
    <>
      <Loading />
      <Logo />
      <ScheduleListTable
        newDeparture={departureAirport}
        newArrival={arrivalAirport}
        newSchedule={schedule}
      ></ScheduleListTable>
      <RouteList
        newDeparture={departureAirport}
        newArrival={arrivalAirport}
        getDepartures={getDepartures}
        onSelect={onSelect}
      ></RouteList>
      <ResetButton onClear={onClear}></ResetButton>
      <SearchForm getArrival={arrivals} getDepartures={getDepartures} />
      {waypoints.length > 0 ? (
        <Slider
          realFlightPosition={realFlightPosition}
          setRealFlightPosition={setRealFlightPosition}
          waypoints={waypoints}
        />
      ) : null}
      <ThreeContainer
        waypoints={waypoints}
        realFlightPosition={realFlightPosition}
        newDeparture={departureAirport}
        newArrival={arrivalAirport}
      />
    </>
  );
};

export default App;
