require('rootpath')();
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const apiPort = process.env.PORT || 3000

const app = express();

// enable cors for all routes
app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connect to mongoDB
const db = require('./db');
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.post("/", (req, res) => {
  res.send("POST request");
});

// api routes
const videoRouter = require('./routes/video-router');
const categoryRouter = require('./routes/category-router');

app.use('/api/users', require('./users/users-controller'));
app.use('/api', videoRouter);
app.use('/api', categoryRouter);

// global error handler
const errorHandler = require('./helpers/error-handler');
app.use(errorHandler);

// start server
//app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));

// listen for requests
let listener = app.listen(apiPort, () => {
  console.log("Server running on port " + listener.address().port);
});

