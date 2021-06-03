const mongo = require('../../helpers/mongoClient');

const submitProposal = async (req, res) => {
  try {

    if(!(req.body && Object.keys(req.body).length > 0))
      throw new Error('Invalid request object');

    const requestBody = JSON.parse(Object.keys(req.body)[0]);

    const submittedProposal = await mongo.getProposalObject().submitProposal(requestBody);

    if(submittedProposal.ops.length > 0 && submittedProposal.ops[0]) {

      const allProposals = await mongo.getProposalObject().getAllProposalsForJob(requestBody.jobId);
      return res.end(`{"success": true, "data": ${JSON.stringify(allProposals)}}`);
    }

    return res.end(`{"success": false, data: ${submittedProposal}}`);


  } catch (error) {
      console.log('Error while creating a job : ', error);
      return res.end(`{"success": false, errorMessage: ${error}}`);
  }
};

const getAllProposalsForJob = async (req, res) => {

  try {
    const jobId = req.query.jobId;
    const allProposals = await mongo.getProposalObject().getAllProposalsForJob(jobId);
    return res.end(`{"success": true, "data": ${JSON.stringify(allProposals)}}`);
  } catch (error) {
    console.log('Error while creating a job : ', error);
    return res.end(`{"success": false, errorMessage: ${error}}`);
  }

}

module.exports = { submitProposal, getAllProposalsForJob };
