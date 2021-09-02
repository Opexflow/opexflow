const config = require('../config');

class Message {
  constructor(db) {
    this.collection = db.collection(`${config.mongodb.collections.message}`);
  }
  
  async sendMessage(message) {
    const messages = await this.collection.insertOne(message);
    return messages;
  }

  async getMessagesByChatId(id){
    const messages = await this.collection.find({"chatId": id}).toArray();
    return messages;
  }

}
module.exports = Message;