const { MongoClient } = require('mongodb');
const config = require('../config');
const Users = require('../DataModals/Users');
const Marketplace = require('../DataModals/Marketplace');
const Proposal = require('../DataModals/Proposal');
const Chat =require('../DataModals/Chat');
const Message = require('../DataModals/Message');

class MongoClientHelper {
  constructor() {
    const uri = `mongodb+srv://${config.mongodb.username}:${config.mongodb.password}@${config.mongodb.host}/${config.mongodb.database}?retryWrites=true&w=majority`;
    this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  }
  async init() {
    try {
      await this.client.connect(err => {
        this.db = this.client.db(`${config.mongodb.database}`);
        this.Users = new Users(this.db);
        this.Marketplace = new Marketplace(this.db);
        this.Proposal = new Proposal(this.db);
        this.Chat = new Chat(this.db);
        this.Message = new Message(this.db);
      });
    } catch(e) {
      console.log('Erro while connecting to mongo DB');
    }

    //this.db = this.client.db(`${config.mongodb.database}`);
    //this.Users = new Users(this.db);
  }

  getUserObject() {
    return this.Users;
  }

  getMarketPlaceObject() {
    return this.Marketplace;
  }

  getProposalObject() {
    return this.Proposal;
  }

  getChatObject() {
    return this.Chat;
  }

  getMessageObject() {
    return this.Message;
  }

}

module.exports = new MongoClientHelper();