const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

function jwtSign(user, res) {
  const payload = { id: user.id, username: user.username };
  jwt.sign(
    payload,
    keys.jwtSecret,
    // expires in a day
    { expiresIn: 86400 },
    (err, token) => {
      res.json({
        success: true,
        token: 'Bearer ' + token
      });
    }
  );
  return res;
}

router.get(
  '/current', 
  passport.authenticate('jwt', { session: false }), (req, res) => {
    const { id, username, email } = req.user;
    return res.json({ id, username, email });
  }
);

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { username, password, email } = req.body;
  User.findOne({
    $or: [
      { email },
      { username }
    ]
  })
    .then(user => {
      if (user) {
        let errorMsg;
        if (user.email === email) {
          errorMsg = {
            email: "A user has already been registered with this email"
          };
        } else {
          errorMsg = { 
            username: "A user has already been registered with this username" 
          };
        }

        return res.status(400).json(errorMsg);
      } else {
        const newUser = new User({ username, email, password });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => jwtSign(user, res))
              .catch(err => console.log(err))
          });
        });
      }
    })
});

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;

  User.findOne({
    $or: [
      { email },
      { username: email }
    ]
  })
    .then(user => {
      if (!user) {
        return res.status(404).json({ email: 'This user does not exist' });
      } else {
        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (isMatch) {
              return jwtSign(user, res);
            } else {
              return res.status(400).json({ password: 'Incorrect password' });
            }
          })
      }
    })
});

router.get('/', (req, res) => {
  User.find({}, { _id: 1, username: 1 })
    .then(users => {
      res.json(users)
    })
    .catch(() => {
      res.status(404).json({
        noUsersFound: 'No users found'
      })
    });
});

router.get('/:id', (req, res) => {
  User.findOne({ _id: req.params.id }, { _id: 1, username: 1 })
    .then(user => {
      res.json(user)
    })
    .catch(() => {
      res.status(404).json({
        noUsersFound: 'No users found'
      })
    });
});


module.exports = router;