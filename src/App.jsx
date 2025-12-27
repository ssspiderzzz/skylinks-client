import { useState, useEffect, useCallback } from "react";
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

const App = () => {
  const [departureFs, setDepartureFs] = useState(""); //single
  const [arrivalFs, setArrivalFs] = useState(""); //single
  const [departureAirport, setDepartureAirport] = useState(""); //single
  const [arrivalAirport, setArrivalAirport] = useState(""); //list
  const [schedule, setSchedule] = useState("");
  const [waypoints, setWaypoints] = useState([]);
  const [realFlightPosition, setRealFlightPosition] = useState(0);

  const fetchData = useCallback(async () => {
    if (!departureFs) return;
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/airports/${departureFs}`);
      if (data) {
        setDepartureAirport(data.departure);
        setArrivalAirport(data.arrival);
      }
    } catch (error) {
      console.error("Failed to fetch airport data:", error);
    }
  }, [departureFs]);

  const fetchFlightSchedule = useCallback(async () => {
    if (departureAirport?.fs && arrivalAirport?.length === 1) {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/schedules/from/${departureAirport.fs}/to/${arrivalAirport[0].fs}`
        );
        setSchedule(data || "");
      } catch (error) {
        console.error("Failed to fetch schedule:", error);
      }
    }
  }, [departureAirport, arrivalAirport]);

  const fetchWaypoints = useCallback(async () => {
    if (departureFs && arrivalFs) {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/real/from/${departureFs}/to/${arrivalFs}`
        );
        setWaypoints(data || []);
      } catch (error) {
        console.error("Failed to fetch waypoints:", error);
      }
    }
  }, [departureFs, arrivalFs]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  useEffect(() => {
    fetchFlightSchedule();
    fetchWaypoints();
  }, [arrivalFs, fetchFlightSchedule, fetchWaypoints]);

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
      <SearchForm
        getArrival={arrivals}
        getDepartures={getDepartures}
        onClear={onClear}
      />
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
