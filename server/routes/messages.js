const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  createMessage,
  getMessage,
  deleteMessage
} = require("../handlers/messages");

router.route("/").post(createMessage);

router
  .route("/:    ")
  .get(getMessage)
  .post(deleteMessage);

module.exports = router;
