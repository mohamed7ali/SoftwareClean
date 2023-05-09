const connection = require("../../db/connection");
const UserQueueController = require("../../controller/userQueueController");

const userQueueController = new UserQueueController();

async function registerUser(id) {
  try {
    const user = await userQueueController.getUserFromQueue(id);
    if (!user) {
      return null;
    }
    await userQueueController.insertUserIntoDb(user);
    await userQueueController.deleteUserFromQueue(id);
    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to register user");
  }
}

module.exports = registerUser;