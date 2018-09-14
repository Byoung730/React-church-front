import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import { CssBaseline, withStyles } from "@material-ui/core";
import "./App.css";
import Home from "./pages/Home";
import AppHeader from "./components/AppHeader";
import ExpenseModal from "./components/ExpenseModal";
import IncomeModal from "./components/IncomeModal";

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
      <Route exact path="/expense" component={ExpenseModal} />
      <Route exact path="/income" component={IncomeModal} />
    </main>
  </Fragment>
);

export default withStyles(styles)(App);
