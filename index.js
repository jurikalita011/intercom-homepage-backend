const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const { connection } = require("./db");

const { postRouter } = require("./routes/PostRoutes");
const { userRouter } = require("./routes/UserRoutes");
const { helpRouter } = require("./routes/HelpRoutes");

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/helps", helpRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
  } catch (error) {
    console.log(error);
  }
  console.log("running at 7000");
});
