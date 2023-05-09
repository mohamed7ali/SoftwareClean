const connection = require("../../db/connection");
const UserQueueController = require("../../controller/userQueueController");

const userQueueController = new UserQueueController();

async function deleteUser(id) {
  try {
    await userQueueController.deleteUserFromQueue(id);
    return true;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete user");
  }
}

module.exports = deleteUser;