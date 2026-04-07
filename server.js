// import dependencies
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const path = require('path');

// import connections from other files
const dbConnect = require('./config/dbConnect');
const attendantRoute = require('./route/api/attendantRoute');
const studentRoute = require('./route/api/studentRoute')
const authorRoute = require('./route/authorRoute')
const bookRoute = require('./route/bookRoute')
const borrow_return_route = require('./route/borrow_return_route')
const authRoute = require('./route/authRoute')

dbConnect();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('view'));
app.use(cookieParser())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
});

// routes
app.use('/api/attendants', attendantRoute);
app.use('/api/students', studentRoute)
app.use('/', authRoute)
app.use('/authors', authorRoute)
app.use('/books', bookRoute)
app.use('/books', borrow_return_route)

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'view', '404.html'));
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
