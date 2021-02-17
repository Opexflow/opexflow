const { sendCommand } = require('./utils');

const sendCommandHandler = async (req, res) => {
  try{
    const commandResult = await sendCommand(req, res);
    
    if(commandResult){
      return res.end(commandResult);
    } else{
      return res.end('{"success": false}');
    }
  } catch (error) {
    console.log("Error in sendCommandHandler : ", error);
    return res.end('{"success": false}');
  }
}

module.exports = { sendCommandHandler }