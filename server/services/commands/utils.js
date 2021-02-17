const config = require('../../config');
const axios = require('axios');

const sendCommand = async (req, res) => {
  try{
    const response = await axios.get(config.SERVERHOSTNAME, { params: req.query });
    return response.data;
  } catch (error) {
    console.log("Error while calling the API : ", error);
    return res.end({"success": false});
  }
}

module.exports = { sendCommand }