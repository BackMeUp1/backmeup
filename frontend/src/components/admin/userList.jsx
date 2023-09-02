import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./adminNavbar";
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Divider,
  Box,
} from "@mui/material";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/users/get")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [trigger]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:4000/api/users/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
          setTrigger(!trigger);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
            <AdminNavbar/>
      <Typography variant="h2" gutterBottom>
        User List
      </Typography>
      {users.map((user) => (
        <Card key={user.id}>
          <CardContent>
            <Typography variant="h4" component="div">
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: {user.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Role: {user.role}
            </Typography>
          </CardContent>
          <Divider />
          <CardActions>
            <Button
              variant="outlined"
              onClick={() => {
                handleDelete(user.iduser);
              }}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default UserList;
