import {
    MP_CHAT_GET_CONVERSATION_PROPOSAL,
    MP_CHAT_GET_CONVERSATION_PROPOSAL_SUCCESS,
    MP_CHAT_GET_CONVERSATION_PROPOSAL_ERROR,
    MP_CHAT_GET_CONVERSATIONS_LIST,
    MP_CHAT_GET_CONVERSATIONS_LIST_SUCCESS,
    MP_CHAT_GET_CONVERSATIONS_LIST_ERROR,
    MP_CHAT_CREATE_CONVERSATION,
    MP_CHAT_CHANGE_CONVERSATION,
    MP_CHAT_UPDATE_CONVERSATION,
    MP_CHAT_GET_MESSAGES_SUCCESS,
    MP_CHAT_GET_MESSAGES_ERROR,
    MP_CHAT_RECEIVE_MESSAGE,
    MP_CHAT_SEND_MESSAGE,
    MP_CHAT_SEND_MESSAGE_SUCCESS,
    MP_CHAT_SEND_MESSAGE_ERROR,
} from '../actions';

const INIT_STATE = {
    allContacts: null,
    contacts: null,
    conversations: null,
    error: '',
    searchKeyword: '',
    loadingContacts: false,
    loadingConversations: false,
    loadingConversationsFailed: false,
    currentUser: null,
    selectedUser: null,
    selectedUserId: null,

    selectedChatId: null,
    loadingMessages: false,
    messages: null,
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
      
      case MP_CHAT_GET_CONVERSATION_PROPOSAL:
            return { ...state, loadingConversations: false };

      case MP_CHAT_GET_CONVERSATION_PROPOSAL_SUCCESS:
          return {
              ...state,
              loadingConversations: true,
              conversations: action.payload.chat,
              selectedChatId: action.payload.chat._id,
          };

      case MP_CHAT_GET_CONVERSATION_PROPOSAL_ERROR:
          return { ...state, loadingConversations: false, error: action.payload };

      case MP_CHAT_GET_CONVERSATIONS_LIST:
        return { ...state, loadingConversations: false };

      case MP_CHAT_GET_CONVERSATIONS_LIST_SUCCESS:
        console.log('reduces, paylocad is ', action.payload);
          return {
              ...state,
              loadingConversations: true,
              conversations: action.payload.chatList,
              selectedChatId: action.payload.chatId,
          };

      case MP_CHAT_GET_CONVERSATIONS_LIST_ERROR:
          return { ...state, loadingConversations: false, loadingConversationsFailed: true, error: action.payload };

      
        case MP_CHAT_CHANGE_CONVERSATION:
            return { ...state, loadingMessages: false, selectedChatId: action.payload.chatId };

        case MP_CHAT_UPDATE_CONVERSATION:
          return {
            ...state,
            loadingConversations: true,
            conversations: action.payload.chatList,
            selectedChatId: action.payload.chatId,
          };

        case MP_CHAT_GET_MESSAGES_SUCCESS:
          return {
            ...state,
            loadingMessages: true,
            messages: action.payload,
        };

          case MP_CHAT_GET_MESSAGES_ERROR:
            return { ...state, loadingMessages: false, error: action.payload };

        case MP_CHAT_CREATE_CONVERSATION:
            return { ...state };
        
        case MP_CHAT_RECEIVE_MESSAGE:
            console.log('action payload is....', action.payload);
            return { ...state, messages: state.messages.concat(action.payload) }
        
        case MP_CHAT_SEND_MESSAGE:
          return { ...state };

        case MP_CHAT_SEND_MESSAGE_SUCCESS:
          return { ...state };

        case MP_CHAT_SEND_MESSAGE_ERROR:
          return { ...state };

        default: return { ...state };
    }
};
