import React, { Component, Fragment } from "react";
import { Route } from "react-router-dom";
import { CssBaseline, withStyles } from "@material-ui/core";
import "./App.css";
import Home from "./pages/Home";
import AppHeader from "./components/AppHeader";
import ExpenseModal from "./components/ExpenseModal";
import IncomeModal from "./components/IncomeModal";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      incomes: [],
      expenses: []
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
  }

  render() {
    return (
      <Fragment>
        <AppHeader />
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/expense"
          component={() => <ExpenseModal expenseList={this.state.expenses} />}
        />
        <Route
          exact
          path="/income"
          component={() => <IncomeModal incomeList={this.state.incomes} />}
        />
      </Fragment>
    );
  }
}

export default App;
