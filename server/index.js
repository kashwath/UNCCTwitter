require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/auth");
const messageRoute = require("./routes/messages");
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");
const db = require("./models");

const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());

//all routes here
app.use("/api/auth", authRoutes);
app.use(
  "/api/users/:id/messages",
  loginRequired,
  ensureCorrectUser,
  messageRoute
);

app.get("/api/messages", loginRequired, async function(req, res, next) {
  try {
    let messages = await db.Message.find()
      .sort({ created: "desc" })
      .populate("user", {
        username: true,
        profileImageUrl: true
      });
    return res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
});

app.use(function(req, res, next) {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, function() {
  console.log(`App is starting on PORT ${PORT}`);
});
