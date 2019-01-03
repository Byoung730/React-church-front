import React from "react";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  withStyles
} from "@material-ui/core";

import { Link } from "react-router-dom";

const styles = {
  flex: {
    flex: 1
  }
};

const AppHeader = ({ classes }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="display2" color="inherit">
        Parish Management
      </Typography>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Button color="inherit" component={Link} to="/">
        Home
      </Button>
      &nbsp;&nbsp;
      <Button color="inherit" component={Link} to="/expense">
        Expenses
      </Button>
      &nbsp;&nbsp;
      <Button color="inherit" component={Link} to="/income">
        Income
      </Button>
      &nbsp;&nbsp;
      <Button color="inherit" component={Link} to="/people">
        People
      </Button>
      &nbsp;&nbsp;
      <Button color="inherit" component={Link} to="/maps">
        Maps
      </Button>
      <div className={classes.flex} />
      <Button color="inherit" disabled>
        Login
      </Button>
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(AppHeader);
