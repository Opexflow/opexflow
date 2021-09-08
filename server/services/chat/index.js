const io = require('../../utils/chatIO').io();
const mongo = require('../../helpers/mongoClient');
const ObjectId = require('mongodb').ObjectID;


const getChatList = async (req, res) => {
  try {
    const userId = req.query.userId;
    const user = await mongo.getUserObject().getUser(userId.toString());
    const chatList = await mongo.getChatObject().getChatList(user.chatIdArray || []);

    await Promise.all(chatList.map( async (chat) => {
      chat.participants = await Promise.all(chat.participants.map(async (participant) => {
        const userData = await mongo.getUserObject().getUser(participant._id);
        participant = userData;
        return participant;
      }));
      return chat;
    }));

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

    if(chat){
      if(chat.participants.some(participant => participant._id == userId)){

        chat.participants = await Promise.all(chat.participants.map( async (participant) => {
            const userData = await mongo.getUserObject().getUser(participant._id);
            participant = userData;
        }));

        return res.send(JSON.stringify({success: true, status: "200", data: JSON.stringify(chat)}));
      } else {
        return res.send(JSON.stringify({success: false, status: 401, error: "Not Authorized to access the chat"}));
      }
    } else {
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

      //Removing embded logic, referencing user id with user table
      /*
      const participants = await Promise.all(await requestBody.participants.map(async userId => {
        const user = await mongo.getUserObject().getUser(userId.toString());
        return user;
      }));
      */
      const participants = requestBody.participants.map(userId => { return {_id: userId.toString()} });

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

io.on('connection', (socket) => {
  try {
    socket.on(`chat-list`, async (data) => {
      if (data.userId == '') {
        io.emit(`chat-list-response`, {
          error : true,
          message : `User does not exits.`
        });
      } else {
        try {
          const user = await mongo.getUserObject().getUser(data.userId.toString());
          const chatList = await mongo.getChatObject().getChatList(user.chatIdArray || []);

          await Promise.all(chatList.map( async (chat) => {
            chat.participants = await Promise.all(chat.participants.map(async (participant) => {
              const userData = await mongo.getUserObject().getUser(participant._id);
              participant = userData;
              return participant;
            }));
            return chat;
          }));
          io.to(socket.id).emit(`chat-list-response`, {
            error : false,
            singleUser : false,
            chatList,
          });
        } catch ( error ) {
          console.log('Error during chat-list-response IO ', error);
          io.to(socket.id).emit(`chat-list-response`,{
            error : true ,
            message: error,
            chatList : []
          });
        }
      }
    });
  } catch(error) {
    console.log('Error during message IO ', error);
  }
  socket.on('disconnect', function () {
    console.log('A user disconnected');
 });
});


module.exports = { getChatList, createChat, getChatByProposalId };
