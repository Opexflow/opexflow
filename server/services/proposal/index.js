const mongo = require('../../helpers/mongoClient');

const submitProposal = async (req, res) => {
  try {

    if(!(req.body && Object.keys(req.body).length > 0))
      throw new Error('Invalid request object');

    const requestBody = JSON.parse(Object.keys(req.body)[0]);

    //Removing embded logic, referencing user id with user table
    /*
    const userData = await mongo.getUserObject().getUser(requestBody.freelancerId.toString());
    requestBody['user'] = userData;
    */
    requestBody['user'] = {
      _id: requestBody.freelancerId.toString(),
    };

    const submittedProposal = await mongo.getProposalObject().submitProposal(requestBody);

    if(submittedProposal.ops.length > 0 && submittedProposal.ops[0]) {

      const allProposals = await mongo.getProposalObject().getAllProposalsForJob(requestBody.jobId);
      
      await Promise.all(allProposals.map( async (proposal) => {
        const userData = await mongo.getUserObject().getUser(proposal.user._id); 
        proposal['user'] = userData;
      }));
      return res.end(`{"success": true, "data": ${JSON.stringify(allProposals)}}`);
    }

    return res.end(`{"success": false, "error": ${submittedProposal}}`);


  } catch (error) {
      console.log('Error while creating a job : ', error);
      return res.end(`{"success": false, "error": ${error}}`);
  }
};

const getAllProposalsForJob = async (req, res) => {

  try {
    const jobId = req.query.jobId;
    const allProposals = await mongo.getProposalObject().getAllProposalsForJob(jobId);
    
    await Promise.all(allProposals.map( async (proposal) => {
      const userData = await mongo.getUserObject().getUser(proposal.user._id); 
      proposal['user'] = userData;
    }));
    
    return res.end(`{"success": true, "data": ${JSON.stringify(allProposals)}}`);
  } catch (error) {
    console.log('Error while creating a job : ', error);
    return res.end(`{"success": false, "error": ${error}}`);
  }

}

const deleteProposal = async (req, res) => {
  try {
    const proposalId = req.query.proposalId;
    const proposals = await mongo.getProposalObject().deleteProposal(proposalId);
    const allProposals = await mongo.getProposalObject().getAllProposalsForJob(jobId);

    await Promise.all(allProposals.map( async (proposal) => {
      const userData = await mongo.getUserObject().getUser(proposal.user._id); 
      proposal['user'] = userData;
    }));

    return res.end(`{"success": true, "data": ${JSON.stringify(allProposals)}}`);
  } catch (error) {
    console.log('Error while withdrawing the proposal : ', error);
    return res.end(`{"success": false, "error": ${error}}`);
  }
}


const deleteProposalByJobId = async (req, res) => {
  try {
    //const proposalId = req.query.proposalId;
    const userId = req.query.userId;
    const jobId = req.query.jobId;
    const proposals = await mongo.getProposalObject().deleteProposalByJobId(userId, jobId);
    if(proposals.deletedCount > 0) {
      const allProposals = await mongo.getProposalObject().getAllProposalsForJob(jobId);

      await Promise.all(allProposals.map( async (proposal) => {
        const userData = await mongo.getUserObject().getUser(proposal.user._id); 
        proposal['user'] = userData;
      }));


      return res.end(`{"success": true, "data": ${JSON.stringify(allProposals)}}`);
    } else {
      return res.end(`{"success": false, "error": "No Record Found"`);
    }
  } catch (error) {
    console.log('Error while withdrawing the proposal : ', error);
    return res.end(`{"success": false, "error": ${error}}`);
  }
}

module.exports = { submitProposal, getAllProposalsForJob, deleteProposal, deleteProposalByJobId };
