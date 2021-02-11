import React, { Component } from 'react';
import AppLayout from '../../layout/AppLayout';
import ChatApp from '../app/applications/chat';

class Chat extends Component {
    render() {
        return (
          <AppLayout>
              <ChatApp />
            </AppLayout>
        );
    }
}

export default Chat;
