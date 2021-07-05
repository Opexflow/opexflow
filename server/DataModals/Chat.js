const config = require('../config');

class Chat {
  constructor(db) {
    this.collection = db.collection(`${config.mongodb.collections.chat}`);
  }
  
  async createChat(chat) {
    const newChat = await this.collection.insertOne(chat);
    return newChat;
  }

  async getChatByProposalId(id){
    const chat = await this.collection.findOne({"proposalId": id});
    return chat;
  }

  async getChatList(chatIdArray){
    const chatList = await this.collection.find({ "_id" : { $in : chatIdArray }}).toArray();
    return chatList;
  }

}
module.exports = Chat;