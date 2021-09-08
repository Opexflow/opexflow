import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Row } from 'reactstrap';
import openSocket from 'socket.io-client';
import moment from 'moment';

import { Colxx } from '../../../components/common/CustomBootstrap';

import {
    changeMPConversation,
    getMPConversationByProposalId,
    getMPConversationsList,
    sendMessage,
    receiveMessage,
} from '../../../redux/actions';
import MPChatApplicationMenu from '../../../containers/applications/MPChatApplicationMenu';
import MPChatHeading from '../../../components/applications/MPChatHeading';
import MPMessageCard from '../../../components/applications/MPMessageCard';
import SaySomething from '../../../components/applications/SaySomething';
import MPChatError from '../../../components/applications/MPChatError';
import MPChatEmpty from '../../../components/applications/MPChatEmpty';

import MPChatSocket from '../../../utils/MPChatSocket';


class MPChatApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuActiveTab: 'messages',
            messageInput: '',
        };
    }

    componentDidMount() {
      if(!this.props.authUser?.user) {
        this.props.history.push('/user/login');
      } else {
        

        if(this.props.location.createConversation && this.props.location.createConversation.proposalId) {
          const {proposalId, freelancerId, title} = this.props.location.createConversation;
          console.log('propsal id is', proposalId);
          this.props.getMPConversationByProposalId({freelancerId, userId: this.props.authUser.user.id, proposalId, title, chatIdArray: this.props.authUser.user.chatIdArray});
        } else {
          this.props.getMPConversationsList({userId: this.props.authUser.user.id})
        }

        MPChatSocket.establishSocketConnection();
        //MPChatSocket.receiveMessage();
        //MPChatSocket.eventEmitter.on('add-message-response', this.receiveSocketMessages);
        MPChatSocket.socket.on('add-message-response', this.receiveSocketMessages);

      }
    }

    componentDidUpdate(prevProps) {
      if(!this.props.authUser?.user)
        this.props.history.push('/user/login');
        // if (
        //     this.props.marketPlaceChatApp.loadingConversations &&
        //     this.props.marketPlaceChatApp.conversations &&
        //     this.props.marketPlaceChatApp.selectedChatId == null
        // ) {
        //     console.log('component updated, selected chat is ', this.props.marketPlaceChatApp.selectedChatId);
        //     this.props.changeMPConversation(this.props.marketPlaceChatApp.selectedChatId);
        // }

        if (this._scrollBarRef) {
            this._scrollBarRef._ps.element.scrollTop = this._scrollBarRef._ps.contentHeight;
        }
    }

    componentWillUnmount() {
      //MPChatSocket.eventEmitter.removeListener('add-message-response', this.receiveSocketMessages);
      MPChatSocket.socket && MPChatSocket.socket.off('add-message-response', this.receiveSocketMessages);
    }

    addMessageToConversation = message => {
      try {
        MPChatSocket.sendMessage(message);
      } catch (error) {
        alert(`Can't send your message`);
      }
    }

    receiveSocketMessages = socketResponse => {
      console.log('socketResponse is', socketResponse);
      this.props.receiveMessage(socketResponse);
    }

  handleChatInputPress = e => {
      if (e.key === 'Enter') {
          if (this.state.messageInput.length > 0) {
            const reqObject = {
              sender: this.props.authUser.user.id,
              content: this.state.messageInput,
              chatId: this.props.marketPlaceChatApp.selectedChatId,
              timeCreated: moment(),
            }
              this.addMessageToConversation(reqObject);
              this.setState({
                  messageInput: '',
                  menuActiveTab: 'messages',
              });
          }
      }
  };

  handleChatInputChange = e => {
      this.setState({
          messageInput: e.target.value,
      });
  };

  handleSendButtonClick = () => {
      if (this.state.messageInput.length > 0) {
        const reqObject = {
          sender: this.props.authUser.user.id,
          content: this.state.messageInput,
          chatId: this.props.marketPlaceChatApp.selectedChatId,
          timeCreated: moment(),
        }
          this.addMessageToConversation(reqObject);
          this.setState({
              messageInput: '',
              menuActiveTab: 'messages',
          });
      }
  };

  toggleAppMenu = tab => {
      this.setState({
          menuActiveTab: tab,
      });
  };

  render() {
      const {
          allContacts,
          conversations,
          loadingConversations,
          loadingConversationsFailed,
          loadingMessages,
          currentUser,
          selectedUser,
          selectedChatId,
          messages,
      } = this.props.marketPlaceChatApp;

      const { menuActiveTab, messageInput } = this.state;

      const noConversation = conversations && conversations.length <= 0;

      const selectedConversation =
      loadingConversations && selectedChatId ?
          conversations.find(
            conversation => conversation._id == selectedChatId
          ) :
          null;
          console.log('selected conversation is...', selectedConversation);
      const otherUser = selectedConversation && selectedConversation.participants.find(
        participant => participant._id != this.props.authUser?.user?.id);
        console.log('otherUser  is...', otherUser);
      return loadingConversations ? (
          <>
          <Row className="app-row">
                <Colxx xxs="12" className="chat-app" style={{height: '540px'}}>
                  {noConversation ? <MPChatEmpty /> : (
                    <>
                    {loadingConversations && selectedChatId && (
                      <MPChatHeading
                            name={otherUser.login}
                            thumb={otherUser.photo}
                            title={selectedConversation.title}
                          />
                      )}

                    {selectedConversation && loadingMessages && messages && messages.length > 0 && (
                      <PerfectScrollbar
                            ref={ref => {
                                  this._scrollBarRef = ref;
                              }}
                            containerRef={ref => {}}
                            options={{ suppressScrollX: true, wheelPropagation: false }}
                          >
                              {messages.length > 0 && messages.map((message, index) => {
                                  const sender = selectedConversation.participants.find(participant => participant._id == message.sender);
                                  return (
                                    <MPMessageCard
                                        key={message._id}
                                        sender={sender}
                                        content={message.content}
                                        timeCreated={message.timeCreated}
                                        currentUserid={this.props.authUser?.user?.id}
                                      />
                                  );
                              })}
                          </PerfectScrollbar>
                      )}
                      </>
                    )}
                  </Colxx>
              </Row>
          {selectedConversation ?
          <SaySomething
                placeholder={this.props.intl.messages['chat.saysomething']}
                messageInput={messageInput}
                handleChatInputPress={this.handleChatInputPress}
                handleChatInputChange={this.handleChatInputChange}
                handleSendButtonClick={this.handleSendButtonClick}
              /> : null
          }
          <MPChatApplicationMenu
                activeTab={menuActiveTab}
                toggleAppMenu={this.toggleAppMenu}
              />
        </>
      ) : (
          loadingConversationsFailed ? <MPChatError /> :
          <div className="loading" />
      );
  }
}

const mapStateToProps = ({ authUser, marketPlaceChatApp }) => ({ authUser, marketPlaceChatApp });
export default injectIntl(
    connect(
        mapStateToProps,
        {
            changeMPConversation,
            getMPConversationByProposalId,
            getMPConversationsList,
            sendMessage,
            receiveMessage,
        },
    )(MPChatApp),
);
