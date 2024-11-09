// Import the Express library
const express = require('express');

// Import the 'express-session' module to handle session management
const session = require('express-session');

// Import the connect-mongo library to create a session store with MongoDB
const MongoStore = require('connect-mongo');

// Import the morgan library to log all requests made to the server in the Express application.
const logger = require('morgan');

// Import the view route module
const viewRouter = require('./3_routes/viewRoute');

// Import the user route module
const userRouter = require('./3_routes/userRoute');

// Import the product route module
const productRouter = require('./3_routes/productRoute');

// Create an instance of an Express application
const app = express();

// Set the directory where the application's view templates are stored
app.set('views', 'views');

// Set the view engine to EJS, allowing the app to render .ejs template files
app.set('view engine', 'ejs');

// Global middleware that generates detailed logs of HTTP requests
app.use(logger('dev'));

// Global Middleware to parse incoming JSON requests
app.use(express.json());

// Global Middleware for managing user sessions
app.use(
  session({
    // Name of the session cookie
    name: 'nodepop-session',

    // Secret key for signing the session ID cookie, stored securely in environment variables
    secret: process.env.SESSION_SECRET_KEY,

    // Save uninitialized sessions to the store (useful for login-related functionality)
    saveUninitialized: true,

    // Prevents session resaving if nothing has changed, optimizing performance
    resave: false,

    // Sets the maximum age for the session cookie, after which it will expire
    cookie: { maxAge: Number(process.env.SESSION_EXPIRATION) },

    // The session data will be saved in MongoDB database
    store: MongoStore.create({
      // using the connection URL from the environment variable
      mongoUrl: process.env.DATABASE,
    }),
  }),
);

// ROUTES
// Set up viewRouter to handle requests to the root URL
app.use('/', viewRouter);

// Set up the '/users' endpoint to handle all user-related requests using userRouter
app.use('/users', userRouter);

// Set up the '/products' endpoint to handle all product-related requests using productRouter
app.use('/products', productRouter);

// Export the Express application for use in other modules
module.exports = app;
