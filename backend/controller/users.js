const jwt = require('jsonwebtoken');
const { addUser, getUserByEmail, getAll, remove ,getById} = require("../model/users");
const secretKey = 'My$3cUr3K3y!F0rJWT';
const bcrypt = require('bcrypt');

const getUsers = (req, res) => {
  getAll((err, results) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(results);
    }
  });
};
const getuser =(req,res)=> {
  res.send(req.user)
}
const RemoveUser = (req, res) => {
  const id = req.params.id;

  remove(id, function (err, results) {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
};

function signUp(req, res) {
  const { name, email, password, role } = req.body;
  getUserByEmail(email, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    if (results.length > 0) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    addUser({ name, email, password, role }, (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
}

function signIn(req, res) {
  const { email, password } = req.body;

  getUserByEmail(email, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const storedHashedPassword = results[0].password;
    const userRole = results[0].role; // Retrieve user's role from the database

    bcrypt.compare(password, storedHashedPassword, (compareErr, isMatch) => {
      if (compareErr || !isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const tokenPayload = {
        email,
        role: userRole // Include the user's role in the payload
      };

      const token = jwt.sign(tokenPayload, secretKey, { expiresIn: '1h' });

      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 3600000,
        secure: process.env.NODE_ENV === 'production',
      });

      res.status(200).json({ token, role: userRole });
    });
  });
}

module.exports = {
  signUp,
  signIn,
  getUsers,
  RemoveUser,
  getuser
};
