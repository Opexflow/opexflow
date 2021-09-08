const io = require('../../utils/chatIO').io();
const mongo = require('../../helpers/mongoClient');
const ObjectId = require('mongodb').ObjectID;

const connectedUsers = {};

const getMessagesByChatId = async (req, res) => {
  try {
    const chatId = req.query.chatId;
    const messages = await mongo.getMessageObject().getMessagesByChatId(chatId);
    return res.send(JSON.stringify({success: true, status: "200", data: JSON.stringify(messages)}));
  } catch (error) {
    console.log('Error while retriving messages : ', error);
    return res.send(JSON.stringify({success: false, status: 500, error: "Server Error"}));
  }
}

io.on('connection', (socket) => {

  socket.on("typing", async msgBody => {
    //Send message to all but not to sender
    socket.broadcase.emit("typing", {msg : msgBody.sender });
  });

  try {

    socket.on("user-login", async userId => {
      
      var query = { _id: userId.userId.toString() };
      const updateUser = { 
        $set: { isOnline: true, socketID: socket.id },
      }
      const user = await mongo.getUserObject().updateOrInsertUser(query, updateUser, {upsert: false});
      connectedUsers[userId.userId.toString()] = socket.id;
    });

    socket.on("user-logout", async userId => {
      
      var query = { _id: userId.userId.toString() };
      const updateUser = { 
        $set: { isOnline: false, socketID: null },
      }
      const user = await mongo.getUserObject().updateOrInsertUser(query, updateUser, {upsert: false});
      delete connectedUsers[userId.userId.toString()];
    });

    socket.on("join-chat", async chatId => {
      socket.join(chatId.chatId);
    });

    socket.on("leave-chat", async chatId => {
      socket.leave(chatId.chatId);
    });

    socket.on("get-messages", async chatId => {
      const messages = await mongo.getMessageObject().getMessagesByChatId(chatId);
      socket.emit("get-messages-response", messages);
    });

    socket.on("add-message", async msgBody => {
      const message = {
        sender: msgBody.sender,
        content: msgBody.content,
        timeCreated: msgBody.timeCreated,
        chatId: msgBody.chatId,
      };

      const sentMessage = await mongo.getMessageObject().sendMessage(message);

      if(sentMessage.ops.length > 0 && sentMessage.ops[0]) {

        //updating chat list, last updated and last message
        const updateChatQuery = { _id: new ObjectId(msgBody.chatId.toString()) };
        const newvalues = { $set: {lastUpdated: msgBody.timeCreated, lastMessage: msgBody.content } };
        await mongo.getChatObject().updateChat(updateChatQuery, newvalues, {upsert: false});
        
        //sending message to all the users who have joined the chat
        //io.to(msgBody.chatId).emit("add-message-response", sentMessage.ops[0]);
        io.in(msgBody.chatId).emit("add-message-response", sentMessage.ops[0]);

        //Updating chat list of all the partiipants of the chat
        const chat = await mongo.getChatObject().getChatById(new ObjectId(msgBody.chatId));
        const { participants } = chat;
        participants && participants.length > 0 && participants.map(async participant => {

          const user = await mongo.getUserObject().getUser(participant._id.toString());
          const chatList = await mongo.getChatObject().getChatList(user.chatIdArray || []);

          await Promise.all(chatList.map( async (chat) => {
            chat.participants = await Promise.all(chat.participants.map(async (participant) => {
              const userData = await mongo.getUserObject().getUser(participant._id);
              participant = userData;
              return participant;
            }));
            return chat;
          }));
          io.to(connectedUsers[participant._id.toString()]).emit(`chat-list-response`, {
            error : false,
            singleUser : false,
            chatList,
          });
        });
      }

    });

  } catch(error) {
    console.log('Error during message IO ', error);
  }
  socket.on('disconnect', async () => {
    
    const userId = Object.keys(connectedUsers).find(key => connectedUsers[key] === socket.id);
    var query = { _id: userId.toString() };
      const updateUser = { 
        $set: { isOnline: false, socketID: null },
      }
      await mongo.getUserObject().updateOrInsertUser(query, updateUser, {upsert: false});
      delete connectedUsers[userId.toString()];
      console.log('A user disconnected');
 });
});

module.exports = { getMessagesByChatId };

