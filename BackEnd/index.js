const express = require("express");
const connectDB = require("./config/db");
const app = express();
const cors = require("cors");
const userRouter = require("./routes/user.route");
require("dotenv").config();
const PORT = 8080 || process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(201).send("Home Route");
});

app.use("/api", userRouter);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error starting the server:", error);
  });
