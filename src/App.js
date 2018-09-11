import React, { Fragment } from "react";
// import axios from "axios";
// import logo from "./logo.svg";
import { Route } from "react-router-dom";
import { CssBaseline, withStyles } from "@material-ui/core";
import "./App.css";
// import People from "./components/People";
import Home from "./pages/Home";
import PeopleManager from "./pages/PeopleManager";
import AppHeader from "./components/AppHeader";

// axios.defaults.baseURL = "http://localhost:3001/api";

const styles = theme => ({
  main: {
    padding: 3 * theme.spacing.unit,
    [theme.breakpoints.down("xs")]: {
      padding: 2 * theme.spacing.unit
    }
  }
});

const App = ({ classes }) => (
  <Fragment>
    <CssBaseline />
    <AppHeader />
    <main className={classes.main}>
      <Route exact path="/" component={Home} />
      <Route exact path="/people" component={PeopleManager} />
    </main>
  </Fragment>
);

export default withStyles(styles)(App);
