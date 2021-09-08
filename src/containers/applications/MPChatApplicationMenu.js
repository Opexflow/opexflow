import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
    Nav, TabContent, TabPane, CardHeader, NavItem, Badge
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import classnames from 'classnames';

import IntlMessages from '../../helpers/IntlMessages';
import ApplicationMenu from '../../components/common/ApplicationMenu';
import MPChatSocket from '../../utils/MPChatSocket';

import {
    changeMPConversation,
    createMPConversation,
    updateMPConversation,
    searchContact,
} from '../../redux/actions';

class MPChatApplicationMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKey: '',
        };
    }
    
    componentDidMount() {
      MPChatSocket.establishSocketConnection();
      //MPChatSocket.listenForChatList();
      MPChatSocket.getChatList(this.props.authUser?.user?.id);
      //MPChatSocket.eventEmitter.on('chat-list-response', this.receiveSocketConversations);
      MPChatSocket.socket.on('chat-list-response', this.receiveSocketConversations);
      }

    componentWillUnmount() {
      //MPChatSocket.eventEmitter.removeListener('chat-list-response', this.receiveSocketConversations);
      MPChatSocket.socket.off('chat-list-response', this.receiveSocketConversations);
    }

    receiveSocketConversations = socketResponse => {
      this.props.updateMPConversation({...socketResponse, chatId: this.props.marketPlaceChatApp?.selectedChatId });
    }

  toggleAppMenu = tab => {
      if (this.props.activeTab !== tab) {
          this.props.toggleAppMenu(tab);
      }
      if (tab === 'messages') {
          this.handleSearchContact('');
      }
  };

  handleSearchContact = keyword => {
      this.setState({
          searchKey: keyword,
      });
      if (keyword.length > 0) {
          if (this.props.activeTab !== 'contacts') {
              this.props.toggleAppMenu('contacts');
          }
          this.props.searchContact(keyword);
      } else {
          this.props.searchContact('');
      }
  };

  handleConversationClick = (e, selectedChatId, currentChatId) => {
      this.props.changeMPConversation({chatId: selectedChatId, currentChatId});
  }

  render() {
      const {
          conversations,
          loadingConversations,
          currentUser,
          selectedChatId,
      } = this.props.marketPlaceChatApp;
      const { messages } = this.props.intl;

      return (
          <ApplicationMenu>
              <CardHeader className="pl-0 pr-0">
                  <Nav tabs className="card-header-tabs ml-0 mr-0">
                      <NavItem className="w-50 text-center">
                          <NavLink
                              className={classnames({
                                  active: this.props.activeTab === 'messages',
                                  'nav-link': true,
                              })}
                              onClick={() => {
                                  this.toggleAppMenu('messages');
                              }}
                              to="#"
                        >
                              <IntlMessages id="chat.messages" />
                        </NavLink>
                    </NavItem>
                </Nav>
            </CardHeader>

              <TabContent
                  activeTab={this.props.activeTab}
                  className="chat-app-tab-content"
            >
                  <TabPane tabId="messages" className="chat-app-tab-pane">
                      <PerfectScrollbar
                          options={{ suppressScrollX: true, wheelPropagation: false }}
                    >
                          <div className="pt-2 pr-4 pl-4 pb-2">
                              { loadingConversations &&
                                conversations.map((conversation, index) => {
                                  const otherUser = conversation.participants.find(
                                    participant => participant._id != this.props.authUser?.user?.id);
                      return (
                          <div
                              key={conversation._id}
                              className="d-flex flex-row mb-1 border-bottom pb-3 mb-3"
                        >
                          <span className={`${selectedChatId == conversation._id ? "chat-active" : "chat-not-active" }`}></span>
                              <NavLink
                                  className="d-flex"
                                  to="#"
                                  onClick={e => this.handleConversationClick(e, conversation._id, selectedChatId)}
                            >
                              <span className={`d-block position-relative`}>
                                  <img
                                      alt={otherUser.login}
                                      src={otherUser.photo}
                                      className="img-thumbnail border-0 rounded-circle mr-3 list-thumbnail align-self-center xsmall d-block"
                                />
                                <Badge
                                      key={index}
                                      className="position-absolute badge-top-left-2 rounded-circle"
                                      color={otherUser.isOnline ? 'success' : 'light'}
                                      style={{fontSize: '0.9rem', top: '30px', left: '5px', display: 'block'}}
                                    >
                                      {   }
                                  </Badge>
                                  </span>
                                  <div className="d-flex flex-grow-1 min-width-zero">
                                      <div className="pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                                          <div className="min-width-zero">
                                              <p className=" mb-0 truncate">
                                                  {otherUser.login}
                                            </p>
                                            <p className="mb-1 text-small truncate">
                                                  {`Job Title : ${conversation.title}`}
                                            </p>
                                            <p className="mb-1 text-muted text-small truncate">
                                                  {conversation.lastMessage || ''}
                                            </p>
                                              <p className="mb-1 text-muted text-small">
                                                  {conversation.lastUpdated}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                      );
                  })}
                        </div>
                    </PerfectScrollbar>
                </TabPane>
            </TabContent>
        </ApplicationMenu>
      );
  }
}

const mapStateToProps = ({ authUser, marketPlaceChatApp }) => ({ authUser, marketPlaceChatApp });
export default injectIntl(
    connect(
        mapStateToProps,
        {
            changeMPConversation,
            createMPConversation,
            updateMPConversation,
            searchContact,
        },
    )(MPChatApplicationMenu),
);
