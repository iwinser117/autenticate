const mongoose = require("mongoose");

mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true
  })
  .then((data) => {
    console.log(`Database connected to ${data.connection.host}`);
  });
