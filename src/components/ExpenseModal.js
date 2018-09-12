import React, { Component } from "react";
import { Form, FormControl, Col, Modal, ButtonToolbar } from "react-bootstrap";
import { Button, Typography, Table, FormGroup } from "@material-ui/core";

class ExpenseModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      amount: "",
      date: "",
      show: false,
      formdata: []
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
    const recordToEdit = this.state.formdata.filter((item, index) => {
      return index === i;
    })[0];

    this.setState({
      show: true,

      name: recordToEdit.name,
      description: recordToEdit.description,
      amount: recordToEdit.amount,
      date: recordToEdit.date
    });
  }

  hideModal() {
    this.setState({
      show: false,
      name: "",
      description: "",
      amount: "",
      date: ""
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
      name: this.state.name,
      description: this.state.description,
      amount: this.state.amount,
      date: this.state.date
    };

    if (
      this.state.name === "" ||
      this.state.amount === "" ||
      this.state.date === ""
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
        name: "",
        description: "",
        amount: "",
        date: ""
      });
    }
    event.preventDefault();
  }

  deleteExpense(i) {
    alert("are you sure you want to Delete this item ?");
    this.setState({
      formdata: this.state.formdata.filter((item, index) => {
        return index !== i;
      })
    });
  }

  render() {
    const reducer = (accumulator, currentValue) => accumulator + currentValue; // TODO: sum total
    var expenseAmountArray = [0];
    if (this.state.formdata.length > 0) {
      var expenseAmountArray = this.state.formdata.map(item => {
        return Number(item.amount);
      });
    }
    let total = expenseAmountArray.reduce(reducer);
    console.log(total);
    return (
      <div>
        <Typography variant="display1">Expense Manager</Typography>
        <Typography variant="display1">Total Expenses: ${total}</Typography>
        <ButtonToolbar>
          <Button bsStyle="primary" onClick={this.showModal}>
            Add Expenses
          </Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Expense</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.formdata.map((item, i) => (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.amount}</td>
                  <td>{item.date}</td>
                  <td>
                    <Button
                      bsStyle="warning"
                      onClick={e => this.showEditModal(e, i)}
                    >
                      Update
                    </Button>
                    <Button
                      bsStyle="danger"
                      onClick={() => this.deleteExpense(i)}
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
          >
            <Modal.Header closeButton>
              <Modal.Title
                id="contained-modal-title-lg "
                className="text-center"
              >
                Add Expenses
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form horizontal onSubmit={this.handleSubmit}>
                <FormGroup controlId="formHorizontalEmail">
                  <Col smOffset={4} sm={4}>
                    <FormControl
                      type="Text"
                      placeholder="name"
                      name="name"
                      value={this.state.name}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalPassword">
                  <Col smOffset={4} sm={4}>
                    <FormControl
                      type="description"
                      placeholder="description"
                      name="description"
                      value={this.state.description}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalPassword">
                  <Col smOffset={4} sm={4}>
                    <FormControl
                      type="amount"
                      placeholder="amount"
                      name="amount"
                      value={this.state.amount}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalPassword">
                  <Col smOffset={4} sm={4}>
                    <FormControl
                      type="date"
                      placeholder="date"
                      name="date"
                      value={this.state.date}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col smOffset={5} sm={4}>
                    <Button type="submit" bsStyle="primary">
                      Add
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            </Modal.Body>
          </Modal>
        </ButtonToolbar>
      </div>
    );
  }
}
export default ExpenseModal;
