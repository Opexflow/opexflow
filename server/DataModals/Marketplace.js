const config = require('../config');

class Marketplace {
  constructor(db) {
    this.collection = db.collection(`${config.mongodb.collections.marketplace}`);
  }
  async createJob(job) {
    const newJob = await this.collection.insertOne(job);
    return newJob;
  }

  async getJob(id){
    const job = await this.collection.findOne({"_id": id});
    return job;
  }

  async getAllJobs() {
    const jobs = await this.collection.find().toArray();
    return jobs;
  }

  async updateOrCreateJob(query, newJob, upsert){
    const job = await this.collection.update(query, newJob, upsert);
    return job;
  }

}
module.exports = Marketplace;