const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongoURI = require('./config/keys').mongoURI;
const passport = require('passport');
const path = require('path');

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log('Connected to Mongoose successfully'))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
  console.log('production');
  app.use(express.static('frontend/build'));
  app.get('/', (res, req) => {
    res.sendFile(path.resolve(_dirname, 'frontend', 'build', 'index.html'));
  });
}

const users = require('./routes/api/users');
const calendars = require('./routes/api/calendars');

app.use(passport.initialize());
require('./config/passport')(passport);
app.use('/api/users', users);
app.use('/api/calendars', calendars);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));