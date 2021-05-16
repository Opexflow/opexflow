const mongo = require('../../helpers/mongoClient');

const createJob = async (req, res) => {
    try {

      if(!(req.body && Object.keys(req.body).length > 0))
        throw new Error('Invalid request object');

      const requestBody = JSON.parse(Object.keys(req.body)[0]);

      const createdJob = await mongo.getMarketPlaceObject().createJob(requestBody);

      if(createdJob.ops.length > 0 && createdJob.ops[0]) {

        const allJobs = await mongo.getMarketPlaceObject().getAllJobs();
        return res.end(`{"success": true, "data": ${JSON.stringify(allJobs)}}`);
      }

      return res.end(`{"success": false, data: ${createdJob}}`);


    } catch (error) {
        console.log('Error while creating a job : ', error);
        return res.end(`{"success": false, errorMessage: ${error}}`);
    }
};

const getAllJobs = async (req, res) => {

  try {
    const allJobs = await mongo.getMarketPlaceObject().getAllJobs();
    return res.end(`{"success": true, "data": ${JSON.stringify(allJobs)}}`);
  } catch (error) {
    console.log('Error while creating a job : ', error);
    return res.end(`{"success": false, errorMessage: ${error}}`);
  }

}


module.exports = { createJob, getAllJobs };
