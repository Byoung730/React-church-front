import React, { Component } from "react";
import { Form, FormControl, Col, Modal, ButtonToolbar } from "react-bootstrap";
import { Button, Typography, Table, FormGroup } from "@material-ui/core";
import _ from "lodash";

class ExpenseModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: "",
      description: "",
      amount: "",
      date: "",
      id: "",
      show: false,
      formdata: [],
      expenses: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.showEditModal = this.showEditModal.bind(this);
  }

  componentDidMount() {
    let that = this;
    fetch("http://localhost:3001/expenses").then(response => {
      response.json().then(expensesData => {
        let expenses = that.state.expenses;
        expenses.concat(expensesData);
        console.log("expenses: ", expenses);
        that.setState({
          expenses: expensesData
        });
      });
    });
  }

  showModal() {
    this.setState({ show: true });
  }

  showEditModal(event, i) {
    const recordToEdit = this.state.expenses.filter((item, index) => {
      return index === i;
    })[0];

    this.setState({
      show: true,
      item: recordToEdit.item,
      description: recordToEdit.description,
      amount: recordToEdit.amount,
      date: recordToEdit.date,
      id: recordToEdit.id
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
      id: this.state.id
    };
    const allIds = this.state.expenses.map(expense => expense.id);
    console.log("allIds: ", allIds);
    console.log("formItem: ", formItem);
    if (
      this.state.item === "" ||
      this.state.description === "" ||
      this.state.amount === "" ||
      this.state.date === ""
    ) {
      alert("Please input all fields");
    } else {
      console.log("is it in there? ", _.contains(allIds, this.state.id));
      if (_.contains(allIds, this.state.id)) {
        // update item
        const request = new Request("http://localhost:3001/api/expense/:id", {
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

        this.setState(prevState => ({
          formdata: prevState.formdata.map(expense => {
            if (expense.item === formItem.item) return formItem;
            else return expense;
          })
        }));
      } else {
        // add new item

        event.preventDefault();
      }
      const request = new Request("http://localhost:3001/api/new-expense", {
        method: "POST",
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

      // this.setState(prevState => ({
      //   formdata: prevState.formdata.concat(formItem)
      // }));
    }

    alert("Expense submitted!");

    // let that = this;
    // fetch("http://localhost:3001/expenses").then(response => {
    //   response.json().then(expensesData => {
    //     let expenses = that.state.expenses;
    //     expenses.concat(expensesData);
    //     console.log("expenses: ", expenses);
    //     that.setState({
    //       expenses: expensesData
    //     });
    //   });
    // });

    this.setState({
      item: "",
      description: "",
      amount: "",
      date: ""
    });

    event.preventDefault();
  }

  removeExpense = id => {
    alert("Are you sure you want to Delete this expense?");
    let that = this;
    let expenses = this.state.expenses;
    let expense = expenses.find(expense => {
      return expense.id === id;
    });

    const request = new Request(
      "http://localhost:3001/api/remove-expense/" + id,
      {
        method: "DELETE"
      }
    );

    console.log(id);
    fetch(request).then(response => {
      expenses.splice(expenses.indexOf(expense), 1);
      that.setState({
        expenses: expenses
      });
      response.json().then(data => {
        console.log(data);
      });
    });
  };

  // deleteExpense(i) {
  //   alert("Are you sure you want to Delete this expense?");
  //   this.setState({
  //     formdata: this.state.formdata.filter((item, index) => {
  //       return index !== i;
  //     })
  //   });
  // }

  render() {
    const reducer = (accumulator, currentValue) => accumulator + currentValue; // TODO: sum total
    var expenseAmountArray = [0];
    if (this.state.expenses.length > 0) {
      var expenseAmountArray = this.state.expenses.map(item => {
        return Number(item.amount);
      });
    }
    let total = expenseAmountArray.reduce(reducer);
    let cleanTotal = total.toFixed(2);
    return (
      <div>
        <style>
          {`
            td {
              border: 3px solid black;
            }`}
        </style>
        <div>
          <Typography variant="display1">Expense Manager</Typography>
          <Typography variant="display1">
            Total Expenses: ${cleanTotal}
          </Typography>
          <ButtonToolbar>
            <Button onClick={this.showModal}>Add Expenses</Button>
            <Table>
              <thead>
                <tr>
                  <th>Expense</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>ID</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.expenses.map((expense, i) => (
                  <tr key={i}>
                    <td>{expense.item}</td>
                    <td>{expense.description}</td>
                    <td>{expense.amount}</td>
                    <td>{expense.date}</td>
                    <td>{expense.id}</td>
                    <td>
                      <Button onClick={e => this.showEditModal(e, i)}>
                        Update
                      </Button>
                      <Button onClick={() => this.removeExpense(expense.id)}>
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
                      <Button type="submit">Add</Button>
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
}
export default ExpenseModal;
