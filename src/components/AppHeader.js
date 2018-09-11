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
      <Typography variant="title" color="inherit">
        Community Builder
      </Typography>
      <Button color="inherit" component={Link} to="/">
        Home
      </Button>
      <Button color="inherit" component={Link} to="/people">
        People Manager
      </Button>
      <div className={classes.flex} />
      <Button color="inherit" disabled>
        Login
      </Button>
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(AppHeader);
