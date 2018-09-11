import React from "react";
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

const PeopleEditor = ({ classes, info, onSave, history }) => (
  <Form initialValues={info} onSubmit={onSave}>
    {({ handleSubmit }) => (
      <Modal className={classes.modal} onClose={() => history.goBack()} open>
        <Card className={classes.modalCard}>
          <form onSubmit={handleSubmit}>
            <CardContent className={classes.modalCardContent}>
              <Field name="email">
                {({ input }) => (
                  <TextField label="Email" autoFocus {...input} />
                )}
              </Field>
              <Field name="id">
                {({ input }) => (
                  <TextField
                    className={classes.marginTop}
                    label="ID (integer)"
                    {...input}
                  />
                )}
              </Field>
              <Field name="first_name">
                {({ input }) => (
                  <TextField
                    className={classes.marginTop}
                    label="First Name"
                    {...input}
                  />
                )}
              </Field>
              <Field name="last_name">
                {({ input }) => (
                  <TextField
                    className={classes.marginTop}
                    label="Last Name"
                    {...input}
                  />
                )}
              </Field>
              <Field name="address">
                {({ input }) => (
                  <TextField
                    className={classes.marginTop}
                    label="Address"
                    {...input}
                  />
                )}
              </Field>
              <Field name="phone">
                {({ input }) => (
                  <TextField
                    className={classes.marginTop}
                    label="Phone Number"
                    {...input}
                  />
                )}
              </Field>
              <Field name="staff">
                {({ input }) => (
                  <TextField
                    className={classes.marginTop}
                    label="Staff (true/false)"
                    {...input}
                  />
                )}
              </Field>
              <Field name="gender">
                {({ input }) => (
                  <TextField
                    className={classes.marginTop}
                    label="Gender"
                    {...input}
                  />
                )}
              </Field>
              <Field name="date_joined">
                {({ input }) => (
                  <TextField
                    className={classes.marginTop}
                    label="Date Joined"
                    {...input}
                  />
                )}
              </Field>
              <Field name="birthdate">
                {({ input }) => (
                  <TextField
                    className={classes.marginTop}
                    label="Birthdate"
                    {...input}
                  />
                )}
              </Field>
              <Field name="martial_status">
                {({ input }) => (
                  <TextField
                    select
                    className={classes.marginTop}
                    label="Marital Status"
                    InputProps={{
                      startAdornment: <InputAdornment position="start" />
                    }}
                    {...input}
                  >
                    {status.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              </Field>
              <Field name="allow_texts">
                {({ input }) => (
                  <TextField
                    className={classes.marginTop}
                    label="Allow Texts(true/false)"
                    {...input}
                  />
                )}
              </Field>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" type="submit">
                Save
              </Button>
              <Button size="small" onClick={() => history.goBack()}>
                Cancel
              </Button>
            </CardActions>
          </form>
        </Card>
      </Modal>
    )}
  </Form>
);

export default compose(
  withRouter,
  withStyles(styles)
)(PeopleEditor);
