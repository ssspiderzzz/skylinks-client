import React, { useState, useEffect } from "react";
import axios from "axios";
import "antd/dist/antd.css";
import "./App.css";
import ThreeContainer from "./threejs/ThreeContainer";
import RouteList from "./frontcomponents/RouteList";
import SearchForm from "./frontcomponents/SearchForm";
import ScheduleListTable from "./frontcomponents/ScheduleListTable";
import Logo from "./frontcomponents/Logo";
import Slider from "./frontcomponents/Slider";
import Loading from "./frontcomponents/Loading";

const baseUrl = "https://skylinks-api.onrender.com";

const App = () => {
  const [departureFs, setDepartureFs] = useState(""); //single
  const [arrivalFs, setArrivalFs] = useState(""); //single
  const [departureAirport, setDepartureAirport] = useState(""); //single
  const [arrivalAirport, setArrivalAirport] = useState(""); //list
  const [schedule, setSchedule] = useState("");
  const [waypoints, setWaypoints] = useState([]);
  const [realFlightPosition, setRealFlightPosition] = useState(0);

  useEffect(() => {
    fetchData();
  }, [departureFs]);

  useEffect(() => {
    fetchFlightSchedule();
    fetchWaypoints();
  }, [arrivalFs]);

  const fetchData = () => {
    if (departureFs)
      axios.get(`${baseUrl}/api/airports/${departureFs}`).then((response) => {
        if (response.data) {
          setDepartureAirport(response.data.departure);
          setArrivalAirport(response.data.arrival);
        }
      });
  };

  const fetchFlightSchedule = () => {
    if (arrivalAirport.length === 1)
      axios
        .get(
          `${baseUrl}/api/schedules/from/${departureAirport.fs}/to/${arrivalAirport[0].fs}`
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
    if (departureFs && arrivalFs) {
      departure = departureFs;
      arrival = arrivalFs;
      axios
        .get(`${baseUrl}/api/real/from/${departure}/to/${arrival}`)
        .then((response) => {
          if (response.data) {
            setWaypoints(response.data);
          }
        });
    }
  };

  const arrivals = () => {};

  const getDepartures = (departureAirportCode) => {
    if (departureAirportCode === departureFs) {
      fetchData();
      setDepartureFs("");
      setWaypoints([]);
    }
    setDepartureFs(departureAirportCode.toUpperCase());
  };

  const onSelect = (selected_arrival) => {
    setArrivalAirport([selected_arrival]);
    setArrivalFs([selected_arrival.fs][0]);
  };

  const onClear = () => {
    setDepartureAirport("");
    setArrivalAirport("");
    setSchedule("");
    setDepartureFs("");
    setArrivalFs("");
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
      <SearchForm getArrival={arrivals} getDepartures={getDepartures} onClear={onClear} />
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
