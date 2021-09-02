const io = require('../../utils/chatIO').io();
const mongo = require('../../helpers/mongoClient');


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

    socket.on("join-chat", async chatId => {
      console.log('chat id is...', chatId);
      console.log('before joined chat', socket.rooms);
      socket.join(chatId.chatId);
      console.log('after joined chat', socket.rooms);
    });

    socket.on("leave-chat", async chatId => {
      console.log('before leaving chat', socket.rooms);
      socket.leave(chatId.chatId);
      console.log('after leaving chat', socket.rooms);
    });

    socket.on("get-messages", async chatId => {
      const messages = await mongo.getMessageObject().getMessagesByChatId(chatId);
      socket.emit("get-messages-response", messages);
    });

    socket.on("add-message", async msgBody => {
      console.log('add message called', socket.rooms);
      const message = {
        sender: msgBody.sender,
        content: msgBody.content,
        timeCreated: msgBody.timeCreated,
        chatId: msgBody.chatId,
      };

      const sentMessage = await mongo.getMessageObject().sendMessage(message);

      if(sentMessage.ops.length > 0 && sentMessage.ops[0]) {
        console.log('add message success', socket.rooms);
        
        //socket.emit("add-message-response", sentMessage.ops[0]);
        io.to(msgBody.chatId).emit("add-message-response", sentMessage.ops[0]);
      }

    });

  } catch(error) {
    console.log('Error during message IO ', error);
  }
  socket.on('disconnect', function () {
    console.log('A user disconnected');
 });
});

module.exports = { getMessagesByChatId };

