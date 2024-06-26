require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require('cors');

const usersRoutes = require('./routes/users-routes');
const categoriesRoutes = require('./routes/categories-routes');
const coursesRoutes = require('./routes/courses-routes');

const HttpError = require('./models/http-error');

const app = express();
app.use(cors({ origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});

// Knowledgify Routes
app.use('/api/users', usersRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/courses', coursesRoutes);

// Route Not Found 
app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

// Error-Handling 
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500)
    res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose
    .connect(process.env.CONNECTIONSTRING)
    .then(() => {
        app.listen(5000);
    })
    .catch(err => {
        console.log(err);
    });


