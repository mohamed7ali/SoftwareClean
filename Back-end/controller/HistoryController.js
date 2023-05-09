const getAllHistories = require("../models/history/getAllHistories");
const getHistoryById = require("../models/history/getHistoryById");
const createHistory = require("../models/history/createHistory");
const updateHistoryById = require("../models/history/updateHistoryById");
const deleteHistoryById = require("../models/history/deleteHistoryById");

class HistoryController {
  constructor(connection) {
    this.connection = connection;
  }

  getAllHistories = (req, res) => {
    getAllHistories(req, res, this.connection);
  };

  getHistoryById = (req, res) => {
    getHistoryById(req, res, this.connection);
  };

  createHistory = async (req, res) => {
    createHistory(req, res, this.connection);
  };

  updateHistoryById = (req, res) => {
    updateHistoryById(req, res, this.connection);
  };

  deleteHistoryById = (req, res) => {
    deleteHistoryById(req, res, this.connection);
  };
}

module.exports = HistoryController;