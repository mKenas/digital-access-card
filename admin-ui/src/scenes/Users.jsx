import React, { useEffect, useContext, useState } from "react";
import { AddBox, Edit, Delete } from "@material-ui/icons";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink, Redirect } from "react-router-dom";
import { userContext, smartLockContext, uiContext } from "@/store";
import { getSmartLocks } from "@/actions/smartLockActions";
import EnhancedMaterialTable from "@/components/EnhancedMaterialTable";
import {
  openAddDialog,
  openDeleteDialog,
  openEditDialog
} from "@/actions/uiActions";
import useDidMountEffect from "@/extensions/useDidMountEffect";
import { useSnackbar } from "notistack";
import {
  AddUserDialog,
  EditUserDialog,
  DeleteUserDialog
} from "@/components/usersList";
import {
  getUser,
  getUsers,
  getUserSmartLocks,
  setSelectedUserId
} from "@/actions/userActions";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import {Button} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    padding: theme.spacing(3)
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3)
  }
}));

const userColumns = [
  { title: "User Id", field: "id", sorting: false },
  {
    title: "Display Name",
    field: "displayName",
    defaultSort: "asc"
  },
  {
    title: "Status",
    field: "status"
  },
  {
    title: "Creation Date",
    field: "creationDate",
    type: "datetime"
  }
];

const Users = () => {
  const classes = useStyles();
  const [userState, userDispatch] = useContext(userContext);
  const {
    users,
    didInvalidate,
    loading,
    selectedUserId,
    error: userError
  } = userState;
  const [smartLockState, smartLockDispatch] = useContext(smartLockContext);

  const [uiState, uiDispatch] = useContext(uiContext);
  const [redirect, setRedirect] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleAddUserClick = () => {
    uiDispatch(openAddDialog);
    smartLockDispatch(getSmartLocks);
  };

  const handleViewUserClick = userId => {
    userDispatch(dispatch => setSelectedUserId(dispatch, userId));
    setRedirect(true);
  };

  const handleEditUserClick = userId => {
    userDispatch(dispatch => setSelectedUserId(dispatch, userId));
    userDispatch(dispatch => getUser(dispatch, userId));
    userDispatch(dispatch => getUserSmartLocks(dispatch, userId));
    smartLockDispatch(getSmartLocks);

    uiDispatch(openEditDialog);
  };

  const handleDeleteUserClick = userId => {
    userDispatch(dispatch => setSelectedUserId(dispatch, userId));
    uiDispatch(openDeleteDialog);
  };

  useEffect(() => {
    userDispatch(getUsers);
  }, []);

  useEffect(() => {
    if (didInvalidate) {
      userDispatch(getUsers);
    }
  }, [didInvalidate]);

  useDidMountEffect(() => {
    if (userError) {
      enqueueSnackbar(userError.message, {
        variant: "error"
      });
    }
  }, [userError]);

  return (
    <>
      {!redirect ? (
        <div className={classes.root}>
          <Breadcrumbs aria-label="breadcrumb">
            <Button component={RouterLink} to="/dashboard">
              Dashboard
            </Button>
            <Button component={RouterLink} to="/users">
              Users
            </Button>
          </Breadcrumbs>
          <Paper className={classes.paper}>
            <EnhancedMaterialTable
              isLoading={loading}
              columns={userColumns}
              data={users}
              actions={[
                {
                  icon: () => <AddBox fontSize="large" />,
                  tooltip: "Add",
                  onClick: () => handleAddUserClick(),
                  isFreeAction: true
                },
                {
                  icon: Edit,
                  tooltip: "Edit",
                  onClick: (event, rowData) => {
                    event.stopPropagation();
                    handleEditUserClick(rowData.id);
                  }
                },
                {
                  icon: Delete,
                  tooltip: "Delete",
                  onClick: (event, rowData) => {
                    event.stopPropagation();
                    console.log(rowData.id);
                    handleDeleteUserClick(rowData.id);
                  }
                }
              ]}
              onRowClick={(event, rowData) => {
                console.log(rowData.id);
                handleViewUserClick(rowData.id);
              }}
            />
            <AddUserDialog />
            <EditUserDialog />
            <DeleteUserDialog />
          </Paper>
        </div>
      ) : (
        <Redirect push to={{ pathname: `/users/${selectedUserId}` }} />
      )}
    </>
  );
};

export default Users;
