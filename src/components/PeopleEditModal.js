import React, { Component } from "react";
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
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";

class PeopleEditModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "PeopleEditor",
      email: "",
      first_name: "",
      last_name: "",
      address: "",
      phone: "",
      staff: "",
      gender: "",
      date_joined: "",
      birthdate: "",
      allow_texts: ""
    };
    // this.handleSave = this.handleSave.bind(this);
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     email: nextProps.email,
  //     first_name: nextProps.first_name,
  //     last_name: nextProps.last_name,
  //     address: nextProps.address,
  //     phone: nextProps.phone,
  //     staff: nextProps.staff,
  //     gender: nextProps.gender,
  //     date_joined: nextProps.date_joined,
  //     birthdate: nextProps.birthdate,
  //     marital_status: nextProps.martial_status,
  //     allow_texts: nextProps.allow_texts
  //   });
  // }
  //
  // emailHandler(e) {
  //   this.setState({ email: e.target.value });
  // }
  //
  // firstNameHandler(e) {
  //   this.setState({ first_name: e.target.value });
  // }
  //
  // lastNameHandler(e) {
  //   this.setState({ last_name: e.target.value });
  // }
  //
  // addressHandler(e) {
  //   this.setState({ address: e.target.value });
  // }
  //
  // phoneHandler(e) {
  //   this.setState({ phone: e.target.value });
  // }
  //
  // staffHandler(e) {
  //   this.setState({ staff: e.target.value });
  // }
  //
  // genderHandler(e) {
  //   this.setState({ gender: e.target.value });
  // }
  //
  // dateJoinedHandler(e) {
  //   this.setState({ date_joined: e.target.value });
  // }
  //
  // birthdateHandler(e) {
  //   this.setState({ birthdate: e.target.value });
  // }
  //
  // maritalStatusHandler(e) {
  //   this.setState({ marital_status: e.target.value });
  // }
  //
  // allowTextsHandler(e) {
  //   this.setState({ allow_texts: e.target.value });
  // }
  //
  // handleSave() {
  //   const item = this.state;
  //   this.props.saveModalDetails(item);
  // }

  componentDidMount() {
    console.log("COMPONENT HAS MOUNTED");
    let that = this;
    fetch("http://localhost:3001/people").then(function(response) {
      response.json().then(function(data) {
        let people = that.state.people;
        people.concat(data);
        that.setState({
          people: data
        });
      });
    });
  }

  render() {
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

    const styles = theme => ({
      modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
      modalCard: {
        width: "90%",
        maxWidth: 500
      },
      modalCardContent: {
        display: "flex",
        flexDirection: "column"
      },
      marginTop: {
        marginTop: 2 * theme.spacing.unit
      }
    });

    // const PeopleEditor = ({ classes, info, onSave, history }) =>

    //   render() {
    //     return (
    //       <div
    //         className="modal fade"
    //         id="peopleEditModal"
    //         tabIndex="-1"
    //         role="dialog"
    //         aria-labelledby="peopleEditModalLabel"
    //         aria-hidden="true"
    //       >
    //         <div className="modal-dialog" role="document">
    //           <div className="modal-content">
    //             <div className="modal-header">
    //               <h5 className="modal-title" id="exampleModalLabel">
    //                 Edit Person
    //               </h5>
    //               <button
    //                 type="button"
    //                 className="close"
    //                 data-dismiss="modal"
    //                 aria-label="Close"
    //               >
    //                 <span aria-hidden="true">&times;</span>
    //               </button>
    //             </div>
    //             <div className="modal-body">
    //               <p>
    //                 <span className="modal-lable">Email:</span>
    //                 <input
    //                   value={this.state.email}
    //                   onChange={e => this.emailHandler(e)}
    //                 />
    //               </p>
    //               <p>
    //                 <span className="modal-lable">First Name:</span>
    //                 <input
    //                   value={this.state.first_name}
    //                   onChange={e => this.firstNameHandler(e)}
    //                 />
    //               </p>
    //               <p>
    //                 <span className="modal-lable">Last Name:</span>
    //                 <input
    //                   value={this.state.last_name}
    //                   onChange={e => this.lastNameHandler(e)}
    //                 />
    //               </p>
    //               <p>
    //                 <span className="modal-lable">Address:</span>
    //                 <input
    //                   value={this.state.address}
    //                   onChange={e => this.addressHandler(e)}
    //                 />
    //               </p>
    //               <p>
    //                 <span className="modal-lable">Phone Number:</span>
    //                 <input
    //                   value={this.state.phone}
    //                   onChange={e => this.phoneHandler(e)}
    //                 />
    //               </p>
    //               <p>
    //                 <span className="modal-lable">Staff:</span>
    //                 <input
    //                   value={this.state.staff}
    //                   onChange={e => this.staffHandler(e)}
    //                 />
    //               </p>
    //               <p>
    //                 <span className="modal-lable">Gender:</span>
    //                 <input
    //                   value={this.state.genderHandler}
    //                   onChange={e => this.genderHandler(e)}
    //                 />
    //               </p>
    //               <p>
    //                 <span className="modal-lable">Day Joined:</span>
    //                 <input
    //                   value={this.state.date_joined}
    //                   onChange={e => this.dateJoinedHandler(e)}
    //                 />
    //               </p>
    //               <p>
    //                 <span className="modal-lable">Birthdate:</span>
    //                 <input
    //                   value={this.state.birthdate}
    //                   onChange={e => this.birthdateHandler(e)}
    //                 />
    //               </p>
    //               <p>
    //                 <span className="modal-lable">Marital Status:</span>
    //                 <input
    //                   value={this.state.marital_status}
    //                   onChange={e => this.maritalStatusHandler(e)}
    //                 />
    //               </p>
    //               <p>
    //                 <span className="modal-lable">Allow Texts:</span>
    //                 <input
    //                   value={this.state.allow_texts}
    //                   onChange={e => this.allowTextsHandler(e)}
    //                 />
    //               </p>
    //             </div>
    //             <div className="modal-footer">
    //               <button
    //                 type="button"
    //                 className="btn btn-secondary"
    //                 data-dismiss="modal"
    //               >
    //                 Close
    //               </button>
    //               <button
    //                 type="button"
    //                 className="btn btn-primary"
    //                 data-dismiss="modal"
    //                 onClick={() => {
    //                   this.handleSave();
    //                 }}
    //               >
    //                 Save changes
    //               </button>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     );
    //   }
  }
}

export default PeopleEditModal;
