const config = require('../config');
const {loadImageForUser} = require('../helpers/utils');

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
    
    const imageStream = await loadImageForUser(user.photo);
    // if(imageStream.success){
    //   const imgBuffer = new Buffer(imageStream.stringStream)
    //   user.photo = imgBuffer;
    // }
    user.photo = imageStream;
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