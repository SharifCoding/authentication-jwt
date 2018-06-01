// Bringing all the dependencies in
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');

// Instantiating the express app
const app = express();

// See the react auth blog in which cors is required for access
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});

// Setting up bodyParser to use json and set it to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Instantiating the express-jwt middleware
const jwtMW = exjwt({
  secret: 'keyboard cat 4 ever',
});

// MOCKING DB just for test
const users = [
  {
    id: 1,
    username: 'Homer',
    password: 'Donuts',
  },
  {
    id: 2,
    username: 'Marge',
    password: 'noDonut',
  },
];

// LOGIN ROUTE
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Use your DB ORM logic here to find user and compare password
  for (const user of users) { // I am using a simple array users which i made above
    // Use your password hash checking logic here
    if (username === user.username && password === user.password) {
      // If all credentials are correct do this
      const token = jwt.sign({ id: user.id, username: user.username }, 'keyboard cat 4 ever', { expiresIn: 129600 }); // Sigining the token
      res.json({
        sucess: true,
        err: null,
        token,
      });
      break;
    } else {
      res.status(401).json({
        sucess: false,
        token: null,
        err: 'Username or password is incorrect',
      });
    }
  }
});

app.get('/', jwtMW /* Using the express jwt MW here */, (req, res) => {
  // Sending some response when authenticated
  res.send('You are authenticated');
});

// Error handling
app.use((err, req, res, next) => {
  // Send the error rather than to show it on the console
  if (err.name === 'UnauthorizedError') {
    res.status(401).send(err);
  } else {
    next(err);
  }
});

// Starting the app on PORT 3000
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Magic happens on port ${PORT}`);
});
