const config = require('../config');

class Chat {
  constructor(db) {
    this.collection = db.collection(`${config.mongodb.collections.chat}`);
  }
  
  async createChat(chat) {
    const newChat = await this.collection.insertOne(chat);
    return newChat;
  }

  async getChatById(id){
    const chat = await this.collection.findOne({"_id": id});
    return chat;
  }

  async getChatByProposalId(id){
    const chat = await this.collection.findOne({"proposalId": id});
    return chat;
  }

  async getChatList(chatIdArray){
    const chatList = await this.collection.find({ "_id" : { $in : chatIdArray }}).sort({lastUpdated : -1}).toArray();
    return chatList;
  }

  async updateChat(query, newValues, upsert){
    const chat = await this.collection.updateOne(query, newValues, upsert);
    return chat;
  }

}
module.exports = Chat;