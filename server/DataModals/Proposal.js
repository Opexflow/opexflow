const config = require('../config');

class Proposal {
  constructor(db) {
    this.collection = db.collection(`${config.mongodb.collections.proposals}`);
  }
  async submitProposal(proposal) {
    const submittedProposal = await this.collection.insertOne(proposal);
    return submittedProposal;
  }

  async getProposal(id){
    const proposal = await this.collection.findOne({"_id": id});
    return proposal;
  }

  async getAllProposalsForJob(jobId) {
    const proposals = await this.collection.find({ jobId: jobId }).toArray();
    return proposals;
  }

  async deleteProposal(proposalId) {
    const query = { _id: proposalId };
    const proposals = await this.collection.deleteOne( query );
    console.log('deleted....now proposals is...', proposals);
  }

  async deleteProposalByJobId(userId, jobId) {
    const query = { 'user._id': userId, jobId: jobId };
    console.log('query is....', query);
    const proposals = await this.collection.deleteOne( query );
    console.log('deleted....now proposals is...', proposals);
  }

  async updateProposal(query, newValues, upsert){
    const proposal = await this.collection.updateOne(query, newValues, upsert);
    return proposal;
  }

}
module.exports = Proposal;