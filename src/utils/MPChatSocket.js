import openSocket from 'socket.io-client';
import { getHost } from '../helpers/Utils';

const events = require('events');

class MPChatSocket {
    
    socket = null
    eventEmitter = new events.EventEmitter();

    // Connecting to Socket Server
    establishSocketConnection() {
        try {
          this.socket = openSocket(getHost(''), {
            path: '/api/socket/chat',
          });
        } catch (error) {
            alert(`Something went wrong; Can't connect to socket server`);
        }
    }

    joinChat(chatId) {
      this.socket.emit('join-chat', {
        chatId: chatId
      });
    }

    leaveChat(chatId) {
      this.socket.emit('leave-chat', {
        chatId: chatId
      });
    }

    getChatList(userId) {
        this.socket.emit('chat-list', {
            userId: userId
        });
        this.socket.on('chat-list-response', (data) => {
            this.eventEmitter.emit('chat-list-response', data);
        });
    }

    sendMessage(message) {
        this.socket.emit('add-message', message);
    }

    receiveMessage() {
        this.socket.on('add-message-response', (data) => {
          console.log('message receieved...', data);
            this.eventEmitter.emit('add-message-response', data);
        });
    }

}

export default new MPChatSocket()