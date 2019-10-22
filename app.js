// Bringing in all needed dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to db
mongoose.connect(config.database, { useNewUrlParser: true });

// On mongoose connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

// On mongoose error
mongoose.connection.on('error', (err) => {
    console.log('Database Error ' + err);
});

// Initializing app variable with express
const app = express();

// For routing
const users = require('./routes/users');

// Initializing port
const port = 4177;

// Cors, allows cross origin access
app.use(cors());
// app.use((req, res, next) => {
//     // Setting header, allow access from any domain(or it can be specified)
//     res.header("Access-Control-Allow-Origin", "*");
//     // Accept if it has a content-type header(can also specify what type of request you want)
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
// Parses incoming request bodies
app.use(bodyParser.json());

app.use('/users', users);

// Route to home page
app.get('/', (req, res) => {
    res.send('Invalid endpoint');
});

// Starting up server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});