const cookieParser = require('cookie-parser');
const express = require('express');
const dotenv = require('dotenv');

// Configure dotenv files above using any other library and files
dotenv.config({ path: '.env' });
require('./conn.js');
const route = require('./routes/rutauserio.js');

// Creating an app from express
const app = express();

// Use cookie-parser middleware
app.use(cookieParser());

// Using express.json to get request of JSON data
app.use(express.json());

// Using your routes
app.use('/api', route);

// Listening to the server
app.listen(process.env.PORT, () => {
  console.log(`Server is listening at ${process.env.PORT}`);
});
