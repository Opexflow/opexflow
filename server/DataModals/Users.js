const config = require('../config');

class User {
  constructor(db) {
    this.collection = db.collection(`${config.mongodb.collections.users}`);
  }
  async addUser(user) {
    const newUser = await this.collection.insertOne(user);
    return newUser;
  }

  async getUser(id){
    const user = await this.collection.findOne({"_id": id});
    return user;
  }

  async getAllUsers() {
    const users = await this.collection.find().toArray();
    return users;
  }

  async updateOrInsertUser(query, newUser, upsert){
    const user = await this.collection.update(query, newUser, upsert);
    return user;
  }

}
module.exports = User;