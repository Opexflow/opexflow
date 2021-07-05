const mongo = require('../../helpers/mongoClient');
const ObjectId = require('mongodb').ObjectID;


const getChatList = async (req, res) => {
  try {
    const userId = req.query.userId;
    const user = await mongo.getUserObject().getUser(userId.toString());
    console.log('user is...', user);
    const chatList = await mongo.getChatObject().getChatList(user.chatIdArray);
    return res.send(JSON.stringify({success: true, status: "200", data: JSON.stringify(chatList)}));
  } catch (error) {
    console.log('Error while retriving the chat : ', error);
    return res.send(JSON.stringify({success: false, status: 500, error: "Server Error"}));
  }
}

const getChatByProposalId = async (req, res) => {

  try {
    const proposalId = req.query.proposalId;
    const userId = req.query.userId;
    const chat = await mongo.getChatObject().getChatByProposalId(proposalId);
    console.log('chat is...', chat);

    if(chat){
      if(chat.participants.some(participant => participant._id == userId)){
        return res.send(JSON.stringify({success: true, status: "200", data: JSON.stringify(chat)}));
      } else {
        return res.send(JSON.stringify({success: false, status: 401, error: "Not Authorized to access the chat"}));
      }
    } else {
      console.log('Inside else sending ...');
      return res.send(JSON.stringify({success: false, status: 404, error: "No Chat Found"}));
    }
  } catch (error) {
    console.log('Error while retriving the chat : ', error);
    return res.send(JSON.stringify({success: false, status: 500, error: "Server Error"}));
  }

}

const createChat = async (req, res) => {
    try {

      if(!(req.body && Object.keys(req.body).length > 0))
        throw new Error('Invalid request object');

      const requestBody = JSON.parse(Object.keys(req.body)[0]);
      console.log('req body is...', requestBody);

      const participants = await Promise.all(await requestBody.participants.map(async userId => {
        const user = await mongo.getUserObject().getUser(userId.toString());
        return user;
      }));
      requestBody.participants = participants;

      const createdChat = await mongo.getChatObject().createChat(requestBody);

      if(createdChat.ops.length > 0 && createdChat.ops[0]) {

        const proposalQuery = { _id: new ObjectId(requestBody.proposalId.toString()) };
        const newvalues = { $set: {chatId: createdChat.ops[0]._id } };
        await mongo.getProposalObject().updateProposal(proposalQuery, newvalues, {upsert: false});


        requestBody.participants.map(async user => {

          const userQuery = {_id: user._id.toString() };
          const newUserValues = { $addToSet: {chatIdArray: createdChat.ops[0]._id } };
          await mongo.getUserObject().updateOrInsertUser(userQuery, newUserValues, {upsert: false});
        });
        
        return res.send(JSON.stringify({success: true, data: JSON.stringify(createdChat.ops[0])}));
      } else{
        throw new Error('Error while creating new chat');
      }


    } catch (error) {
        console.log('Error while creating the chat : ', error);
        return res.send(JSON.stringify({success: false, status: 500, error}));
    }
};


module.exports = { getChatList, createChat, getChatByProposalId };
