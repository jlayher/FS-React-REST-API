'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');

// Require CORS
const cors = require('cors');

// require sequelize
const { sequelize } = require('./models');

// require routes
const courseRoutes = require('./routes/course');
const userRoutes = require('./routes/user');

// set port
let PORT = process.env.PORT || 5000;

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// Use Cors
app.use(cors());

// setup morgan for http request logging
app.use(morgan('dev'));

// parse body to JSON
app.use(express.json());

// Add Routes
app.use('/api', courseRoutes, userRoutes); 

// Test Connection
(async () => {
  await sequelize.sync()
  try {
    await sequelize.authenticate();
    console.log('Connected to Database!')
  } catch (err) {
    console.log('Could not connect to Database!!!', err)
  }
})();


// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API!',
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// start listening on our port
app.listen(process.env.PORT || PORT, () => {
  console.log(`Express server is listening on port ${PORT}`);
});
