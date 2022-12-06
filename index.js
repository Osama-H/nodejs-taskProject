const express = require("express");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const taskRouter = require("./routers/taskRouter");
const notFound = require("./middlewares/not-found");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());
app.use("/api/v1/tasks", taskRouter);
app.use(notFound);
app.use(errorHandler);

const connectionString = process.env.DATA_BASE;

mongoose.set("strictQuery", false);
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Data Base Connected Successfully ");
  });

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Hello, The server Running on Port ${port}`);
});
