import React, { Component } from "react";
import { Form, FormControl, Col, Modal, ButtonToolbar } from "react-bootstrap";
import { Button, Typography, Table, FormGroup } from "@material-ui/core";
import ReactSearch from "./ReactSearch";

class People extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      name: "",
      address: "",
      phone: "",
      date_joined: "",
      id: "",
      show: false,
      formdata: [],
      people: this.props.peopleList
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.showEditModal = this.showEditModal.bind(this);
  }

  showModal() {
    this.setState({ show: true });
  }

  showEditModal(event, i) {
    const recordToEdit = this.state.people.filter((item, index) => {
      return index === i;
    })[0];

    this.setState({
      show: true,
      email: recordToEdit.email,
      name: recordToEdit.name,
      address: recordToEdit.address,
      date_joined: recordToEdit.date_joined,
      id: recordToEdit.id,
      phone: recordToEdit.phone
    });
  }

  hideModal() {
    this.setState({
      show: false,
      email: "",
      name: "",
      address: "",
      date_joined: "",
      phone: ""
    });
  }

  handleInputChange(event) {
    console.log(event.target.value);
    // update the input that changed

    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const formItem = {
      email: this.state.email,
      name: this.state.name,
      address: this.state.address,
      date_joined: this.state.date_joined,
      id: this.state.id,
      phone: this.state.phone
    };
    const allIds = this.state.people.map(person => person.id);
    console.log("allIds: ", allIds);
    console.log("formItem: ", formItem);
    console.log("is it in there? ", allIds.includes(this.state.id));
    if (
      this.state.email === "" ||
      this.state.name === "" ||
      this.state.address === "" ||
      this.state.date_joined === "" ||
      this.state.phone === ""
    ) {
      alert("Please input all fields");
    } else {
      if (allIds.includes(this.state.id)) {
        // update item

        const request = new Request("http://localhost:3001/api/people/:id", {
          method: "PUT",
          headers: new Headers({ "Content-Type": "application/json" }),
          body: JSON.stringify(formItem)
        });
        let that = this;
        let formdata = that.state.formdata;
        formdata.push(formItem);
        that.setState({
          formdata: formdata
        });

        fetch(request)
          .then(response => {
            response.json().then(data => {});
          })
          .catch(function(err) {
            console.log(err);
          });

        alert("person updated!");

        this.setState(prevState => ({
          formdata: prevState.formdata.map(person => {
            if (person.item === formItem.item) return formItem;
            else return person;
          })
        }));
      } else {
        // add new item

        event.preventDefault();
        const request = new Request("http://localhost:3001/api/new-people", {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          body: JSON.stringify(formItem)
        });
        let that = this;
        let people = that.state.people;
        people.push(formItem);
        that.setState({
          formdata: people
        });

        fetch(request)
          .then(response => {
            response.json().then(data => {});
          })
          .catch(err => {
            console.log(err);
          });

        alert("person submitted!");

        this.setState({
          email: "",
          name: "",
          address: "",
          date_joined: "",
          id: "",
          phone: ""
        });

        event.preventDefault();
      }
    }
  }

  removeperson = id => {
    alert("Are you sure you want to Delete this person?");
    let that = this;
    let people = this.state.people;
    let person = people.find(person => {
      return person.id === id;
    });

    const request = new Request(
      "http://localhost:3001/api/remove-person/" + id,
      {
        method: "DELETE"
      }
    );

    console.log(id);
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
    const items = this.state.people;
    if (items && items.length > 0) {
      const allNames = items.map(person => person.name);
      return (
        <div>
          <style>
            {`
            td {
              border: 1px solid black;
              text-align: center
            }`}
          </style>
          <div>
            <Typography variant="display3" align="center" gutterBottom={true}>
              People Manager
            </Typography>
            <ReactSearch searchField={allNames} />
            <ButtonToolbar>
              <Button variant="raised" color="primary" onClick={this.showModal}>
                Add People
              </Button>
              <Table>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone Number</th>
                    <th>ID</th>
                    <th>Date Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.people.map((person, i) => (
                    <tr key={i}>
                      <td>{person.email}</td>
                      <td>{person.name}</td>
                      <td>{person.address}</td>
                      <td>{person.phone}</td>
                      <td>{person.id}</td>
                      <td>{person.date_joined}</td>
                      <td>
                        <Button
                          variant="raised"
                          color="primary"
                          onClick={e => this.showEditModal(e, i)}
                        >
                          Update
                        </Button>
                        <Button
                          variant="raised"
                          color="secondary"
                          onClick={() => this.removeperson(person.id)}
                        >
                          Delete
                        </Button>
                      </td>
                      <td />
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Modal
                {...this.props}
                show={this.state.show}
                onHide={this.hideModal}
                dialogClassName="custom-modal"
                class="col-md-6 col-md-offset-3"
              >
                <Modal.Header closeButton>
                  <Modal.Title
                    id="contained-modal-title-lg "
                    className="text-center"
                  >
                    Add/edit people
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body class="col-md-6 col-md-offset-3">
                  <Form horizontal onSubmit={this.handleSubmit}>
                    <FormGroup>
                      <Col smOffset={4} sm={4}>
                        <FormControl
                          type="Text"
                          placeholder="Email"
                          name="email"
                          value={this.state.email}
                          onChange={this.handleInputChange}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Col smOffset={4} sm={4}>
                        <FormControl
                          type="Text"
                          placeholder="Name"
                          name="name"
                          value={this.state.name}
                          onChange={this.handleInputChange}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Col smOffset={4} sm={4}>
                        <FormControl
                          type="Text"
                          placeholder="Address"
                          name="address"
                          value={this.state.address}
                          onChange={this.handleInputChange}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Col smOffset={4} sm={4}>
                        <FormControl
                          type="Text"
                          placeholder="Phone Number"
                          name="phone"
                          value={this.state.phone}
                          onChange={this.handleInputChange}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Col smOffset={4} sm={4}>
                        <FormControl
                          type="date"
                          placeholder="Date joined"
                          name="date_joined"
                          value={this.state.date_joined}
                          onChange={this.handleInputChange}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Col smOffset={5} sm={4}>
                        <Button variant="raised" color="primary" type="submit">
                          Submit
                        </Button>
                      </Col>
                    </FormGroup>
                  </Form>
                </Modal.Body>
              </Modal>
            </ButtonToolbar>
          </div>
        </div>
      );
    }

    return (
      <Typography variant="display1">
        Slow data connection...Please wait a moment and refresh the page
      </Typography>
    );
  }
}
export default People;
