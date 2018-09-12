import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import {
  withStyles,
  Typography,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Card,
  CardContent,
  CardActions,
  Modal,
  Button,
  TextField
} from "@material-ui/core";
import { Form, Field } from "react-final-form";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Delete as DeleteIcon, Add as AddIcon } from "@material-ui/icons";
import { find, orderBy } from "lodash";
import { compose } from "recompose";

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
  constructor(props, context) {
    super(props, context);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.showEditModal = this.showEditModal.bind(this);

    this.state = {
      loading: true,
      people: [],
      show: false,
      formdata: [],
      email: "",
      first_name: "",
      last_name: "",
      address: "",
      phone: "",
      staff: "",
      gender: "",
      date_joined: "",
      birthdate: "",
      marital_status: "",
      allow_texts: ""
    };
  }

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
      people: await this.fetch("get", "/people")
    });
  }

  handleClose() {
    this.setState({ show: "false" });
  }

  handleShow() {
    this.setState({ show: "true" });
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

  showModal() {
    this.setState({ show: true });
  }

  showEditModal(event, i) {
    const recordToEdit = this.state.formdata.filter((item, index) => {
      return index === i;
    })[0];

    this.setState({
      show: true,
      email: recordToEdit.email,
      first_name: recordToEdit.first_name,
      last_name: recordToEdit.last_name,
      address: recordToEdit.address,
      phone: recordToEdit.phone,
      staff: recordToEdit.staff,
      gender: recordToEdit.gender,
      date_joined: recordToEdit.date_joined,
      birthdate: recordToEdit.birthdate,
      marital_status: recordToEdit.marital_status,
      allow_texts: recordToEdit.allow_texts
    });
  }

  hideModal() {
    this.setState({
      show: false,
      email: "",
      first_name: "",
      last_name: "",
      address: "",
      phone: "",
      staff: "",
      gender: "",
      date_joined: "",
      birthdate: "",
      marital_status: "",
      allow_texts: ""
    });
  }

  handleInputChange(event) {
    // update the input that changed
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const formItem = {
      email: this.state.email,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      address: this.state.address,
      phone: this.state.phone,
      staff: this.state.staff,
      gender: this.state.gender,
      date_joined: this.state.date_joined,
      birthdate: this.state.birthdate,
      marital_status: this.state.marital_status,
      allow_texts: this.state.allow_texts
    };

    if (
      this.state.email === "" ||
      this.state.first_name === "" ||
      this.state.last_name === ""
    ) {
      alert("Please fill mandatory field");
    } else {
      if (
        this.state.formdata.filter(item => item.name === formItem.name).length >
        0
      ) {
        // update item
        this.setState(prevState => ({
          formdata: prevState.formdata.map(item => {
            if (item.name === formItem.name) return formItem;
            else return item;
          })
        }));
      } else {
        // add new item
        this.setState(prevState => ({
          formdata: prevState.formdata.concat(formItem)
        }));
      }

      alert("form submitted: ");

      this.setState({
        email: "",
        first_name: "",
        last_name: "",
        address: "",
        phone: "",
        staff: "",
        gender: "",
        date_joined: "",
        birthdate: "",
        marital_status: "",
        allow_texts: ""
      });
    }
    event.preventDefault();
  }

  // renderPeopleEditor = ({
  //   match: {
  //     params: { id }
  //   }
  // }) => {
  //   if (this.state.loading) return null;
  //   const people = find(this.state.people, { id: Number(id) });
  //
  //   if (!people && id !== "new") return <Redirect to="/people" />;
  //
  //   return <PeopleEditor people={people} onSave={this.savePeople} />;
  // };

  render() {
    const { classes } = this.props;
    const onSave = this.savePeople();
    const status = [
      {
        value: "single",
        label: "Single"
      },
      {
        value: "engaged",
        label: "Engaged"
      },
      {
        value: "married",
        label: "Married"
      },
      {
        value: "divorced",
        label: "Divorced"
      },
      {
        value: "widow/widower",
        label: "Widow/Widower"
      },
      {
        value: "separated",
        label: "Separated"
      }
    ];

    return (
      <Fragment>
        <Typography variant="display1">People Manager</Typography>
        {this.state.people.length > 0 ? (
          <Paper elevation={1} className={classes.people}>
            <List>
              {orderBy(this.state.people, ["last_name"], ["asc"]).map(
                people => (
                  <ListItem
                    key={people.id}
                    button
                    onClick={() => this.showEditModal(people)}
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
          onClick={this.handleShow}
        >
          <AddIcon />
        </Button>

        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          className={classes.modal}
          open
        >
          <Card className={classes.modalCard}>
            <Form onSubmit={this.handleSubmit}>
              <CardContent className={classes.modalCardContent}>
                <Field
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                >
                  <TextField label="Email" autoFocus />
                </Field>
                <Field name="first_name">
                  <TextField
                    value={this.state.first_name}
                    onChange={this.handleInputChange}
                    className={classes.marginTop}
                    label="First Name"
                  />
                  )}
                </Field>
                <Field name="last_name">
                  <TextField
                    value={this.state.last_name}
                    onChange={this.handleInputChange}
                    className={classes.marginTop}
                    label="Last Name"
                  />
                </Field>
                <Field name="address">
                  <TextField
                    value={this.state.address}
                    onChange={this.handleInputChange}
                    className={classes.marginTop}
                    label="Address"
                  />
                  )}
                </Field>
                <Field name="phone">
                  <TextField
                    value={this.state.phone}
                    onChange={this.handleInputChange}
                    className={classes.marginTop}
                    label="Phone Number"
                  />
                </Field>
                <Field name="staff">
                  <TextField
                    value={this.state.staff}
                    onChange={this.handleInputChange}
                    className={classes.marginTop}
                    label="Staff (true/false)"
                  />
                </Field>
                <Field name="gender">
                  <TextField
                    value={this.state.gender}
                    onChange={this.handleInputChange}
                    className={classes.marginTop}
                    label="Gender"
                  />
                </Field>
                <Field name="date_joined">
                  <TextField
                    value={this.state.date_joined}
                    onChange={this.handleInputChange}
                    className={classes.marginTop}
                    label="Date Joined"
                  />
                </Field>
                <Field name="birthdate">
                  <TextField
                    value={this.state.birthdate}
                    onChange={this.handleInputChange}
                    className={classes.marginTop}
                    label="Birthdate"
                  />
                </Field>
                <Field name="marital_status">
                  <TextField
                    select
                    className={classes.marginTop}
                    value={this.state.marital_status}
                    onChange={this.handleInputChange}
                    label="Marital Status"
                    InputProps={{
                      startAdornment: <InputAdornment position="start" />
                    }}
                  >
                    {status.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Field>
                <Field name="allow_texts">
                  <TextField
                    value={this.state.allow_texts}
                    onChange={this.handleInputChange}
                    className={classes.marginTop}
                    label="Allow Texts(true/false)"
                  />
                </Field>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" type="submit">
                  Save
                </Button>
                <Button size="small" onClick={this.handleClose()}>
                  Cancel
                </Button>
              </CardActions>
            </Form>
          </Card>
        </Modal>
      </Fragment>
    );
  }
}

export default compose(withStyles(styles))(PeopleManager);
