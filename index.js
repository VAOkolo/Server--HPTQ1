const server = require('./server')
const mongoose = require("mongoose");
const { seedDB } = require("./seeds");
const PORT = process.env.PORT || 7000;

mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log("Connected to db & listening at port " + PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
