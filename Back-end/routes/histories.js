const express = require("express");
const connection = require("../db/connection");
const HistoryController = require("../controller/HistoryController");

const router = express.Router();
const historyController = new HistoryController(connection);

router.get("/", historyController.getAllHistories);
router.get("/:Email", historyController.getHistoryById);
router.post("/", historyController.createHistory);
router.put("/:Id", historyController.updateHistoryById);
router.delete("/:Id", historyController.deleteHistoryById);

module.exports = router;