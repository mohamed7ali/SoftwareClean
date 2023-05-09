const saveMessage = require("../models/cntact-us/saveMessage");

class ContactController {
  async saveMessage(name, email, subject, message) {
    await saveMessage(name, email, subject, message);
  }
}

module.exports = ContactController;