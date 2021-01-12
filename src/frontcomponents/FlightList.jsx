import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import TextField from "@material-ui/core/TextField";
import ListItemText from "@material-ui/core/ListItemText";
import PlaneLogo from "../assets/PlaneLogo.svg";
import RightArrow from "../assets/RightArrow.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "beige",
    border: "3px outset #1C6EA4",
    borderRadius: "8px",
    boxShadow: "20px 16px 44px -16px rgba(101,101,102,1)",
    position: "absolute",
  },
}));

export default function FlightList(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        {props.flights.map((flight) => {
          return (
            <>
              <TextField></TextField>
              <ListItem className={classes.mainContainer} button>
                <ListItemIcon>
                  <img src={PlaneLogo} height="44" width="44" />
                </ListItemIcon>

                <ListItemText primary={`${flight.airline}`} />

                <ListItemText>
                  {flight.departure} <img src={RightArrow} height="12" width="12" />{" "}
                  {flight.arrival}
                </ListItemText>
              </ListItem>
            </>
          );
        })}
      </List>
    </div>
  );
}
