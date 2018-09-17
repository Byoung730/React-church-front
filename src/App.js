import React, { Component, Fragment } from "react";
import { Route } from "react-router-dom";
import { CssBaseline, withStyles } from "@material-ui/core";
import "./App.css";
import Home from "./pages/Home";
import AppHeader from "./components/AppHeader";
import Expenses from "./components/Expenses";
import Income from "./components/Income";
import People from "./components/People";
import Maps from "./components/Maps";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      incomes: [],
      expenses: [],
      people: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:3001/expenses").then(response => {
      response.json().then(expensesData => {
        this.setState({
          expenses: expensesData
        });
      });
    });
    fetch("http://localhost:3001/income").then(response => {
      response.json().then(incomesData => {
        this.setState({
          incomes: incomesData
        });
      });
    });
    fetch("http://localhost:3001/people").then(response => {
      response.json().then(peopleData => {
        this.setState({
          people: peopleData
        });
      });
    });
  }

  render() {
    return (
      <Fragment>
        <AppHeader />
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/expense"
          component={() => <Expenses expenseList={this.state.expenses} />}
        />
        <Route
          exact
          path="/income"
          component={() => <Income incomeList={this.state.incomes} />}
        />
        <Route
          exact
          path="/people"
          component={() => <People peopleList={this.state.people} />}
        />
        <Route exact path="/maps" component={Maps} />
      </Fragment>
    );
  }
}

export default App;
