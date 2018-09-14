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

// import React from "react";
// import {
//   withStyles,
//   Card,
//   CardContent,
//   CardActions,
//   Modal,
//   Button,
//   TextField
// } from "@material-ui/core";
// import { compose } from "recompose";
// import { withRouter } from "react-router-dom";
// import { Form, Field } from "react-final-form";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import MenuItem from "@material-ui/core/MenuItem";
//
// const status = [
//   {
//     value: "single",
//     label: "Single"
//   },
//   {
//     value: "engaged",
//     label: "Engaged"
//   },
//   {
//     value: "married",
//     label: "Married"
//   },
//   {
//     value: "divorced",
//     label: "Divorced"
//   },
//   {
//     value: "widow/widower",
//     label: "Widow/Widower"
//   },
//   {
//     value: "separated",
//     label: "Separated"
//   }
// ];
//
// const styles = theme => ({
//   modal: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   modalCard: {
//     width: "90%",
//     maxWidth: 500
//   },
//   modalCardContent: {
//     display: "flex",
//     flexDirection: "column"
//   },
//   marginTop: {
//     marginTop: 2 * theme.spacing.unit
//   }
// });
//
// const PeopleEditor = ({ classes, info, onSave, history }) => (
//   <Form initialValues={info} onSubmit={onSave}>
//     {({ handleSubmit }) => (
//       <Modal className={classes.modal} onClose={() => history.goBack()} open>
//         <Card className={classes.modalCard}>
//           <form onSubmit={handleSubmit}>
//             <CardContent className={classes.modalCardContent}>
//               <Field name="email">
//                 {({ input }) => (
//                   <TextField label="Email" autoFocus {...input} />
//                 )}
//               </Field>
//               <Field name="id">
//                 {({ input }) => (
//                   <TextField
//                     className={classes.marginTop}
//                     label="ID (integer)"
//                     {...input}
//                   />
//                 )}
//               </Field>
//               <Field name="first_name">
//                 {({ input }) => (
//                   <TextField
//                     className={classes.marginTop}
//                     label="First Name"
//                     {...input}
//                   />
//                 )}
//               </Field>
//               <Field name="last_name">
//                 {({ input }) => (
//                   <TextField
//                     className={classes.marginTop}
//                     label="Last Name"
//                     {...input}
//                   />
//                 )}
//               </Field>
//               <Field name="address">
//                 {({ input }) => (
//                   <TextField
//                     className={classes.marginTop}
//                     label="Address"
//                     {...input}
//                   />
//                 )}
//               </Field>
//               <Field name="phone">
//                 {({ input }) => (
//                   <TextField
//                     className={classes.marginTop}
//                     label="Phone Number"
//                     {...input}
//                   />
//                 )}
//               </Field>
//               <Field name="staff">
//                 {({ input }) => (
//                   <TextField
//                     className={classes.marginTop}
//                     label="Staff (true/false)"
//                     {...input}
//                   />
//                 )}
//               </Field>
//               <Field name="gender">
//                 {({ input }) => (
//                   <TextField
//                     className={classes.marginTop}
//                     label="Gender"
//                     {...input}
//                   />
//                 )}
//               </Field>
//               <Field name="date_joined">
//                 {({ input }) => (
//                   <TextField
//                     className={classes.marginTop}
//                     label="Date Joined"
//                     {...input}
//                   />
//                 )}
//               </Field>
//               <Field name="birthdate">
//                 {({ input }) => (
//                   <TextField
//                     className={classes.marginTop}
//                     label="Birthdate"
//                     {...input}
//                   />
//                 )}
//               </Field>
//               <Field name="martial_status">
//                 {({ input }) => (
//                   <TextField
//                     select
//                     className={classes.marginTop}
//                     label="Marital Status"
//                     InputProps={{
//                       startAdornment: <InputAdornment position="start" />
//                     }}
//                     {...input}
//                   >
//                     {status.map(option => (
//                       <MenuItem key={option.value} value={option.value}>
//                         {option.label}
//                       </MenuItem>
//                     ))}
//                   </TextField>
//                 )}
//               </Field>
//               <Field name="allow_texts">
//                 {({ input }) => (
//                   <TextField
//                     className={classes.marginTop}
//                     label="Allow Texts(true/false)"
//                     {...input}
//                   />
//                 )}
//               </Field>
//             </CardContent>
//             <CardActions>
//               <Button size="small" color="primary" type="submit">
//                 Save
//               </Button>
//               <Button size="small" onClick={() => history.goBack()}>
//                 Cancel
//               </Button>
//             </CardActions>
//           </form>
//         </Card>
//       </Modal>
//     )}
//   </Form>
// );
//
// export default compose(
//   withRouter,
//   withStyles(styles)
// )(PeopleEditor);

// import React, { Component } from "react";
// import {
//   withStyles,
//   Card,
//   CardContent,
//   CardActions,
//   Modal,
//   Button,
//   TextField
// } from "@material-ui/core";
// import { compose } from "recompose";
// import { withRouter } from "react-router-dom";
// import { Form, Field } from "react-final-form";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import MenuItem from "@material-ui/core/MenuItem";
//
// class PeopleEditModal extends Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       title: "PeopleEditor",
//       email: "",
//       first_name: "",
//       last_name: "",
//       address: "",
//       phone: "",
//       staff: "",
//       gender: "",
//       date_joined: "",
//       birthdate: "",
//       marital_status: "",
//       allow_texts: ""
//     };
//     // this.handleSave = this.handleSave.bind(this);
//   }
//
//   // componentWillReceiveProps(nextProps) {
//   //   this.setState({
//   //     email: nextProps.email,
//   //     first_name: nextProps.first_name,
//   //     last_name: nextProps.last_name,
//   //     address: nextProps.address,
//   //     phone: nextProps.phone,
//   //     staff: nextProps.staff,
//   //     gender: nextProps.gender,
//   //     date_joined: nextProps.date_joined,
//   //     birthdate: nextProps.birthdate,
//   //     marital_status: nextProps.martial_status,
//   //     allow_texts: nextProps.allow_texts
//   //   });
//   // }
//   //
//   // emailHandler(e) {
//   //   this.setState({ email: e.target.value });
//   // }
//   //
//   // firstNameHandler(e) {
//   //   this.setState({ first_name: e.target.value });
//   // }
//   //
//   // lastNameHandler(e) {
//   //   this.setState({ last_name: e.target.value });
//   // }
//   //
//   // addressHandler(e) {
//   //   this.setState({ address: e.target.value });
//   // }
//   //
//   // phoneHandler(e) {
//   //   this.setState({ phone: e.target.value });
//   // }
//   //
//   // staffHandler(e) {
//   //   this.setState({ staff: e.target.value });
//   // }
//   //
//   // genderHandler(e) {
//   //   this.setState({ gender: e.target.value });
//   // }
//   //
//   // dateJoinedHandler(e) {
//   //   this.setState({ date_joined: e.target.value });
//   // }
//   //
//   // birthdateHandler(e) {
//   //   this.setState({ birthdate: e.target.value });
//   // }
//   //
//   // maritalStatusHandler(e) {
//   //   this.setState({ marital_status: e.target.value });
//   // }
//   //
//   // allowTextsHandler(e) {
//   //   this.setState({ allow_texts: e.target.value });
//   // }
//   //
//   // handleSave() {
//   //   const item = this.state;
//   //   this.props.saveModalDetails(item);
//   // }
//
//   componentDidMount() {
//     console.log("COMPONENT HAS MOUNTED");
//     let that = this;
//     fetch("http://localhost:3001/people").then(function(response) {
//       response.json().then(function(data) {
//         let people = that.state.people;
//         people.concat(data);
//         that.setState({
//           people: data
//         });
//       });
//     });
//   }
//
//   render() {
//     const status = [
//       {
//         value: "single",
//         label: "Single"
//       },
//       {
//         value: "engaged",
//         label: "Engaged"
//       },
//       {
//         value: "married",
//         label: "Married"
//       },
//       {
//         value: "divorced",
//         label: "Divorced"
//       },
//       {
//         value: "widow/widower",
//         label: "Widow/Widower"
//       },
//       {
//         value: "separated",
//         label: "Separated"
//       }
//     ];
//
//     const styles = theme => ({
//       modal: {
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center"
//       },
//       modalCard: {
//         width: "90%",
//         maxWidth: 500
//       },
//       modalCardContent: {
//         display: "flex",
//         flexDirection: "column"
//       },
//       marginTop: {
//         marginTop: 2 * theme.spacing.unit
//       }
//     });
//
//     // const PeopleEditor = ({ classes, info, onSave, history }) =>
//
//     //   render() {
//     //     return (
//     //       <div
//     //         className="modal fade"
//     //         id="peopleEditModal"
//     //         tabIndex="-1"
//     //         role="dialog"
//     //         aria-labelledby="peopleEditModalLabel"
//     //         aria-hidden="true"
//     //       >
//     //         <div className="modal-dialog" role="document">
//     //           <div className="modal-content">
//     //             <div className="modal-header">
//     //               <h5 className="modal-title" id="exampleModalLabel">
//     //                 Edit Person
//     //               </h5>
//     //               <button
//     //                 type="button"
//     //                 className="close"
//     //                 data-dismiss="modal"
//     //                 aria-label="Close"
//     //               >
//     //                 <span aria-hidden="true">&times;</span>
//     //               </button>
//     //             </div>
//     //             <div className="modal-body">
//     //               <p>
//     //                 <span className="modal-lable">Email:</span>
//     //                 <input
//     //                   value={this.state.email}
//     //                   onChange={e => this.emailHandler(e)}
//     //                 />
//     //               </p>
//     //               <p>
//     //                 <span className="modal-lable">First Name:</span>
//     //                 <input
//     //                   value={this.state.first_name}
//     //                   onChange={e => this.firstNameHandler(e)}
//     //                 />
//     //               </p>
//     //               <p>
//     //                 <span className="modal-lable">Last Name:</span>
//     //                 <input
//     //                   value={this.state.last_name}
//     //                   onChange={e => this.lastNameHandler(e)}
//     //                 />
//     //               </p>
//     //               <p>
//     //                 <span className="modal-lable">Address:</span>
//     //                 <input
//     //                   value={this.state.address}
//     //                   onChange={e => this.addressHandler(e)}
//     //                 />
//     //               </p>
//     //               <p>
//     //                 <span className="modal-lable">Phone Number:</span>
//     //                 <input
//     //                   value={this.state.phone}
//     //                   onChange={e => this.phoneHandler(e)}
//     //                 />
//     //               </p>
//     //               <p>
//     //                 <span className="modal-lable">Staff:</span>
//     //                 <input
//     //                   value={this.state.staff}
//     //                   onChange={e => this.staffHandler(e)}
//     //                 />
//     //               </p>
//     //               <p>
//     //                 <span className="modal-lable">Gender:</span>
//     //                 <input
//     //                   value={this.state.genderHandler}
//     //                   onChange={e => this.genderHandler(e)}
//     //                 />
//     //               </p>
//     //               <p>
//     //                 <span className="modal-lable">Day Joined:</span>
//     //                 <input
//     //                   value={this.state.date_joined}
//     //                   onChange={e => this.dateJoinedHandler(e)}
//     //                 />
//     //               </p>
//     //               <p>
//     //                 <span className="modal-lable">Birthdate:</span>
//     //                 <input
//     //                   value={this.state.birthdate}
//     //                   onChange={e => this.birthdateHandler(e)}
//     //                 />
//     //               </p>
//     //               <p>
//     //                 <span className="modal-lable">Marital Status:</span>
//     //                 <input
//     //                   value={this.state.marital_status}
//     //                   onChange={e => this.maritalStatusHandler(e)}
//     //                 />
//     //               </p>
//     //               <p>
//     //                 <span className="modal-lable">Allow Texts:</span>
//     //                 <input
//     //                   value={this.state.allow_texts}
//     //                   onChange={e => this.allowTextsHandler(e)}
//     //                 />
//     //               </p>
//     //             </div>
//     //             <div className="modal-footer">
//     //               <button
//     //                 type="button"
//     //                 className="btn btn-secondary"
//     //                 data-dismiss="modal"
//     //               >
//     //                 Close
//     //               </button>
//     //               <button
//     //                 type="button"
//     //                 className="btn btn-primary"
//     //                 data-dismiss="modal"
//     //                 onClick={() => {
//     //                   this.handleSave();
//     //                 }}
//     //               >
//     //                 Save changes
//     //               </button>
//     //             </div>
//     //           </div>
//     //         </div>
//     //       </div>
//     //     );
//     //   }
//   }
// }
//
// export default PeopleEditModal;

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
