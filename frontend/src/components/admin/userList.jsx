import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [trigger,setTrigger]= useState(false)

  useEffect(() => {
    axios.get('http://localhost:4000/api/users/get')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [trigger]);

  const handleDelete = (id) => {
    console.log(id);
    axios.delete(`http://localhost:4000/api/users/${id}`)
      .then(response => {
        if (response.status === 200) {
          setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
          setTrigger(!trigger)

        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>User List</h2>
      {users.map(user => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          <button onClick={() => {handleDelete(user.iduser) ; console.log(user)} }>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default UserList;