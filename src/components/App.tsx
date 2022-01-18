import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Alert } from "reactstrap";
import {
  getUsersRequest,
  createUserRequest,
  deleteUserRequest,
  usersError,
} from "../actions/users";
import { rootState } from "../reducers";
import NewUserForm from "./NewUserForm";
import UserList from "./UserList";

function App() {
  const users = useSelector((state: rootState) => state.users);
  const dispatch = useDispatch();

  const handleCreateUserSubmit = ({
    firstName,
    lastName,
  }: {
    firstName: string;
    lastName: string;
  }) => {
    dispatch(
      createUserRequest({
        firstName,
        lastName,
      })
    );
  };

  const handleDeleteUserClick = (userId: number) => {
    dispatch(deleteUserRequest(userId));
  };

  const handleCloseAlert = () => {
    dispatch(
      usersError({
        error: "",
      })
    );
  };

  useEffect(() => {
    dispatch(getUsersRequest());
  }, []);
  useEffect(() => {
    console.log(users);
  }, [users]);
  return (
    <div style={{ margin: "0 auto", padding: "20px", maxWidth: "600px" }}>
      <h2>Users</h2>
      <Alert color="danger" isOpen={!!users.error} toggle={handleCloseAlert}>
        {users.error}
      </Alert>
      <NewUserForm onSubmit={handleCreateUserSubmit} />
      {!!users.items && !!users.items.length && (
        <UserList
          onDeleteUserClick={handleDeleteUserClick}
          users={users.items}
        />
      )}
    </div>
  );
}

export default App;
