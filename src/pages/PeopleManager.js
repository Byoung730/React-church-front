import React, { Component, Fragment } from "react";
import { withRouter, Route, Redirect, Link } from "react-router-dom";
import {
  withStyles,
  Typography,
  Button,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";
import { Delete as DeleteIcon, Add as AddIcon } from "@material-ui/icons";
import { find, orderBy } from "lodash";
import { compose } from "recompose";

import PeopleEditor from "../components/PeopleEditor";
// import People from "../components/People";

const styles = theme => ({
  people: {
    marginTop: 2 * theme.spacing.unit
  },
  fab: {
    position: "absolute",
    bottom: 3 * theme.spacing.unit,
    right: 3 * theme.spacing.unit,
    [theme.breakpoints.down("xs")]: {
      bottom: 2 * theme.spacing.unit,
      right: 2 * theme.spacing.unit
    }
  }
});

const API = process.env.REACT_APP_API || "http://localhost:3001";

class PeopleManager extends Component {
  state = {
    loading: true,
    people: []
  };

  componentDidMount() {
    this.getPeople();
  }

  async fetch(method, endpoint, body) {
    try {
      const response = await fetch(`${API}${endpoint}`, {
        method,
        body: body && JSON.stringify(body),
        headers: {
          "content-type": "application/json",
          accept: "application/json"
        }
      });
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async getPeople() {
    this.setState({
      loading: false,
      people: await this.fetch("get", "/api/people")
    });
  }

  savePeople = async people => {
    people.id = 1;
    if (people.email) {
      await this.fetch("post", `/people/${people.id}`, people);
    } else {
      await this.fetch("get", "/people", people);
    }

    this.props.history.goBack();
    this.getPeople();
  };

  async deletePeople(people) {
    if (
      window.confirm(`Are you sure you want to delete "${people.first_name}"`)
    ) {
      await this.fetch("delete", `/people/${people.person_id}`);
      this.getPeople();
    }
  }

  renderPeopleEditor = ({
    match: {
      params: { id }
    }
  }) => {
    if (this.state.loading) return null;
    const people = find(this.state.people, { id: Number(id) });

    if (!people && id !== "new") return <Redirect to="/people" />;

    return <PeopleEditor people={people} onSave={this.savePeople} />;
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Typography variant="display1">People Manager</Typography>
        {this.state.people.length > 0 ? (
          <Paper elevation={1} className={classes.people}>
            <List>
              {orderBy(this.state.people, ["last_name"], ["asc"]).map(
                people => (
                  <ListItem
                    key={people.person_id}
                    button
                    component={Link}
                    to={`/people/${people.person_id}`}
                  >
                    <ListItemText
                      primary={people.first_name + " " + people.last_name}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        onClick={() => this.deletePeople(people)}
                        color="inherit"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                )
              )}
            </List>
          </Paper>
        ) : (
          !this.state.loading && (
            <Typography variant="subheading">No people to display</Typography>
          )
        )}
        <Button
          variant="fab"
          color="secondary"
          aria-label="add"
          className={classes.fab}
          component={Link}
          to="/people/new"
        >
          <AddIcon />
        </Button>
        <Route exact path="/people/:id" render={this.renderPeopleEditor} />
      </Fragment>
    );
  }
}

export default compose(
  withRouter,
  withStyles(styles)
)(PeopleManager);
