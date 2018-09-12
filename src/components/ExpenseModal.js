import React, { Component } from "react";
import { Form, FormControl, Col, Modal, ButtonToolbar } from "react-bootstrap";
import { Button, Typography, Table, FormGroup } from "@material-ui/core";

class ExpenseModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: "",
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

      item: recordToEdit.item,
      description: recordToEdit.description,
      amount: recordToEdit.amount,
      date: recordToEdit.date
    });
  }

  hideModal() {
    this.setState({
      show: false,
      item: "",
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
      item: this.state.item,
      description: this.state.description,
      amount: this.state.amount,
      date: this.state.date,
      id: Math.random().toFixed(8)
    };
    console.log("formItem: ", formItem);
    if (
      this.state.item === "" ||
      this.state.description === "" ||
      this.state.amount === "" ||
      this.state.date === ""
    ) {
      alert("Please input all fields");
    } else {
      if (
        this.state.formdata.filter(expense => expense.item === formItem.item)
          .length > 0
      ) {
        // update item
        this.setState(prevState => ({
          formdata: prevState.formdata.map(expense => {
            if (expense.item === formItem.item) return formItem;
            else return expense;
          })
        }));
      } else {
        // add new item
        this.setState(prevState => ({
          formdata: prevState.formdata.concat(formItem)
        }));
      }

      alert("Expense submitted!");

      this.setState({
        item: "",
        description: "",
        amount: "",
        date: ""
      });
    }
    event.preventDefault();
  }

  deleteExpense(i) {
    alert("Are you sure you want to Delete this expense?");
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
              {this.state.formdata.map((expense, i) => (
                <tr key={i}>
                  <td>{expense.item}</td>
                  <td>{expense.description}</td>
                  <td>{expense.amount}</td>
                  <td>{expense.date}</td>
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
                      placeholder="item"
                      name="item"
                      value={this.state.item}
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
