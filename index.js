require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jobsRouter = require("./routes/jobRoutes");
const projectsRouter = require("./routes/projectRoutes");
const apiKeyMiddleware = require("./middlewares/apiKeyMiddleware");
const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(
    `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

app.use("/api/jobs", apiKeyMiddleware, jobsRouter);
app.use("/api/projects", apiKeyMiddleware, projectsRouter);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
