import {
    MP_CHAT_GET_CONVERSATION_PROPOSAL,
    MP_CHAT_GET_CONVERSATION_PROPOSAL_SUCCESS,
    MP_CHAT_GET_CONVERSATION_PROPOSAL_ERROR,
    MP_CHAT_GET_CONVERSATIONS_LIST,
    MP_CHAT_GET_CONVERSATIONS_LIST_SUCCESS,
    MP_CHAT_GET_CONVERSATIONS_LIST_ERROR,
    MP_CHAT_CREATE_CONVERSATION,
    MP_CHAT_CREATE_CONVERSATION_SUCCESS,
    MP_CHAT_CREATE_CONVERSATION_ERROR,
    MP_CHAT_CHANGE_CONVERSATION,
    MP_CHAT_UPDATE_CONVERSATION,
    MP_CHAT_GET_MESSAGES_SUCCESS,
    MP_CHAT_GET_MESSAGES_ERROR,
    MP_CHAT_RECEIVE_MESSAGE,
    MP_CHAT_SEND_MESSAGE,
    MP_CHAT_SEND_MESSAGE_SUCCESS,
    MP_CHAT_SEND_MESSAGE_ERROR,
} from '../actions';

export const getMPConversationByProposalId = payload => ({
  type: MP_CHAT_GET_CONVERSATION_PROPOSAL,
  payload,
});
export const getMPConversationByProposalIdSuccess = (conversations, selectedUser) => ({
  type: MP_CHAT_GET_CONVERSATION_PROPOSAL_SUCCESS,
  payload: { conversations, selectedUser },
});

export const getMPConversationByProposalIdError = error => ({
  type: MP_CHAT_GET_CONVERSATION_PROPOSAL_ERROR,
  payload: error,
});

export const getMPConversationsList = payload => ({
  type: MP_CHAT_GET_CONVERSATIONS_LIST,
  payload,
});
export const getMPConversationsListSuccess = (chatList, chatId = null) => ({
  type: MP_CHAT_GET_CONVERSATIONS_LIST_SUCCESS,
  payload: { chatList, chatId },
});

export const getMPConversationsListError = error => ({
  type: MP_CHAT_GET_CONVERSATIONS_LIST_ERROR,
  payload: error,
});

export const createMPConversation = (currentUserId, selectedUserId, allConversations) => ({
    type: MP_CHAT_CREATE_CONVERSATION,
    payload: { currentUserId, selectedUserId, allConversations },
});

export const changeMPConversation = payload => ({
    type: MP_CHAT_CHANGE_CONVERSATION,
    payload,
});

export const updateMPConversation = payload => ({
  type: MP_CHAT_UPDATE_CONVERSATION,
  payload,
});

export const getMessagesSuccess = payload => ({
  type: MP_CHAT_GET_MESSAGES_SUCCESS,
  payload,
});

export const getMessagesError = error => ({
  type: MP_CHAT_GET_MESSAGES_ERROR,
  payload: error,
});

export const receiveMessage = payload => ({
  type: MP_CHAT_RECEIVE_MESSAGE,
  payload,
})

export const sendMessage = payload => ({
  type: MP_CHAT_SEND_MESSAGE,
  payload,
});

export const sendMessageSuccess = payload => ({
  type: MP_CHAT_SEND_MESSAGE_SUCCESS,
  payload,
});

export const sendMessageError = error => ({
  type: MP_CHAT_SEND_MESSAGE_ERROR,
  error,
});
