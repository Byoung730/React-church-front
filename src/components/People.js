import React, { Component } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import {
  withStyles,
  Card,
  CardContent,
  CardActions,
  Modal,
  Button,
  TextField
} from "@material-ui/core";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import { Form, Field } from "react-final-form";

class People extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "People",
      people: []
    };
  }

  componentDidMount() {
    console.log("COMPONENT HAS MOUNTED");
    let that = this;
    fetch("http://localhost:3001/expenses").then(function(response) {
      response.json().then(function(expensesData) {
        let expenses = that.state.expenses;
        people.concat(expensesData);
        that.setState({
          expenses: expensesData
        });
      });
    });
  }

  addPeople = event => {
    let that = this;
    event.preventDefault();
    const people_data = {
      email: this.refs.email.value,
      first_name: this.refs.first_name.value,
      last_name: this.refs.last_name.value
    };
    const request = new Request("http://localhost:3001/api/new-people", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(people_data)
    });

    let people = that.state.people;
    people.push(people_data);
    that.setState({
      people: people
    });

    fetch(request)
      .then(response => {
        response.json().then(data => {});
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  removePerson = id => {
    let that = this;
    let people = this.state.people;
    let person = people.find(person => {
      return person.id === id;
    });

    const request = new Request("http://localhost:3001/api/remove/" + id, {
      method: "DELETE"
    });

    fetch(request).then(response => {
      people.splice(people.indexOf(person), 1);
      that.setState({
        people: people
      });
      response.json().then(data => {
        console.log(data);
      });
    });
  };

  render() {
    let title = this.state.title;
    let people = this.state.people;
    return (
      <div className="People">
        <h1>{title}</h1>
        <form ref="peopleForm">
          <input type="text" ref="email" placeholder="Email" />
          <input type="text" ref="first_name" placeholder="First name" />
          <input type="text" ref="last_name" placeholder="Last Name" />
          <button onClick={this.addPeople.bind(this)}>Add Person</button>
        </form>
        <ul>
          {people.map(people => (
            <li key={people.id}>
              {people.first_name} {people.last_name}
              <button onClick={this.removePerson.bind(this, people.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default People;
