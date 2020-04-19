import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button
} from "@material-ui/core";
import { Dashboard, People, Lock, AccountTree } from "@material-ui/icons";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

const Sidebar = props => {
  const classes = useStyles();
  const { open, toggleDrawer } = props;
  const listItems = [
    { text: "Dashboard", link: "/dashboard", icon: Dashboard },
    { text: "Users", link: "/users", icon: People },
    { text: "Groups", link: "/groups", icon: AccountTree },
    { text: "Smart locks", link: "/smart-locks", icon: Lock }
  ];
  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer()}
      onKeyDown={toggleDrawer()}>
      <List>
        {listItems.map(item => {
          const ItemIcon = item.icon;
          return (
            <ListItem
              button
              key={item.text}
              component={RouterLink}
              to={item.link}>
              <ListItemIcon>
                <ItemIcon />
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          );
        })}
      </List>
      <Divider />
    </div>
  );

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer()}>
        {sideList()}
      </Drawer>
    </div>
  );
};

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired
};

export default Sidebar;
