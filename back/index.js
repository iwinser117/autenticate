const cookieParser = require('cookie-parser');
const express = require('express');
const dotenv = require('dotenv');
var cors = require('cors')

// Configure dotenv files above using any other library and files
dotenv.config({ path: '.env' });
require('./conn.js');
const route = require('./routes/rutauserio.js');

// Creating an app from express
const app = express();

app.use(cookieParser());
const corsOptions = {
  origin: "https://autenticate-production.up.railway.app/api/",
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};
app.use(cors(corsOptions))
app.use(express.json());


// Using your routes
app.use('/api', route);

// Listening to the server
app.listen(process.env.PORT, () => {
  console.log(`Server is listening at ${process.env.PORT}`);
});
