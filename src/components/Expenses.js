import React, { Component } from "react";
import { Form, FormControl, Col, Modal, ButtonToolbar } from "react-bootstrap";
import { Button, Typography, Table, FormGroup } from "@material-ui/core";
import SearchInput, { createFilter } from "react-search-input";

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
      expenses: this.props.expenseList,
      searchTerm: "",
      searchField: this.props.searchField
    };

    this.searchUpdated = this.searchUpdated.bind(this);
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
    console.log("is it in there? ", allIds.includes(this.state.id));
    if (
      this.state.item === "" ||
      this.state.description === "" ||
      this.state.amount === "" ||
      this.state.date === ""
    ) {
      alert("Please input all fields");
    } else {
      if (allIds.includes(this.state.id)) {
        // update item

        const request = new Request("http://localhost:3001/api/expenses/:id", {
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
          .catch(err => {
            console.log(err);
          });

        alert("Expense updated!");
      } else {
        // add new item

        event.preventDefault();

        const request = new Request("http://localhost:3001/api/new-expense", {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          body: JSON.stringify(formItem)
        });
        let that = this;
        let expenses = that.state.expenses;
        expenses.push(formItem);
        that.setState({
          formdata: expenses
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

        alert("Expense submitted!");

        this.setState({
          item: "",
          description: "",
          amount: "",
          date: ""
        });

        event.preventDefault();
      }
    }
  }

  searchUpdated(term) {
    this.setState({ searchTerm: term });
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
    const items = this.state.expenses;
    if (items && items.length > 0) {
      const allItems = this.state.expenses.map(expense => expense.item);
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      var expenseAmountArray = [0];
      if (this.state.expenses.length > 0) {
        var expenseAmountArray = this.state.expenses.map(item => {
          return Number(item.amount);
        });
      }
      let total = expenseAmountArray.reduce(reducer);
      let cleanTotal = total.toFixed(2);
      const KEYS_TO_FILTERS = allItems;
      const filteredList = allItems.filter(
        createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
      );
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
              Expense Manager
            </Typography>
            <Typography variant="display1" gutterBottom={true}>
              Total Expenses: ${cleanTotal}
            </Typography>
            <div>
              <SearchInput
                className="search-input"
                onChange={this.searchUpdated}
              />
              {filteredList.map(i => {
                return <div className="filteredStuff" key={i} />;
              })}
            </div>
            <ButtonToolbar>
              <Button variant="raised" color="primary" onClick={this.showModal}>
                Add Expenses
              </Button>
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
                      <td>${expense.amount}</td>
                      <td>{expense.date}</td>
                      <td>{expense.id}</td>
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
                          onClick={() => this.removeExpense(expense.id)}
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
                    Add/edit Expenses
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body class="col-md-6 col-md-offset-3">
                  <Form horizontal onSubmit={this.handleSubmit}>
                    <FormGroup>
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
                    <FormGroup>
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
                    <FormGroup>
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
                    <FormGroup>
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
export default ExpenseModal;
