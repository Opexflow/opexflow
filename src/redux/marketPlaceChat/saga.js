import {
    all, call, fork, put, takeEvery,
} from 'redux-saga/effects';
import moment from 'moment';
import { getCurrentTime } from '../../helpers/Utils';

import {
    MP_CHAT_CREATE_CONVERSATION,
    MP_CHAT_GET_CONVERSATION_PROPOSAL,
    MP_CHAT_GET_CONVERSATIONS_LIST,
    MP_CHAT_CHANGE_CONVERSATION,
    MP_CHAT_SEND_MESSAGE,
} from '../actions';

import {
    getMPConversationsListSuccess,
    getMPConversationsListError,
    getMessagesSuccess,
    getMessagesError,
} from './actions';

import MPChatSocket from '../../utils/MPChatSocket';
import { getHost } from '../../helpers/Utils';

function* createNewConversation({ payload }) {
  console.log('function called', payload);
    try {
        const {userId, freelancerId, proposalId, title} = payload;
        const response = yield call(
            createNewConversationAsync,
            userId,
            freelancerId,
            proposalId,
            title
        );
        console.log('response create new conversation call', response);
        const { _id, chatIdArray } = JSON.parse(response);
        yield call(getConversationsList, 
          {
            payload: {
              userId, chatIdArray, chatId: _id
            }
          });
        //yield put(getConversationsSuccess(_id));
    } catch (error) {
        yield put(getMPConversationsListError(error));
    }
}

const createNewConversationAsync = async (
  userId,
  freelancerId,
  proposalId,
  title
  ) => {

    const reqObject = {
      title,
      proposalId,
      participants: [String(userId), String(freelancerId)],
      lastUpdated: moment(),
    }
    
    const reqBody = JSON.stringify(reqObject);
        
    let URL = getHost('api/marketplace/chat');
    return new Promise(function (resolve, reject) {
      const x = new XMLHttpRequest();
      x.open('POST', URL, true);
      x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      //x.setRequestHeader("Content-Type", "application/*");
      x.onload = function() {
          // const res = x.responseText && JSON.parse(x.responseText);
          try {
            const res = x.responseText;
            const jsonResponse = JSON.parse(res);
            if(jsonResponse.success)
              resolve(jsonResponse.data);
            else
              reject(jsonResponse.error);
          } catch(Error) {
            console.log('Error while parsing response body: ', Error);
            reject(Error);
          }
      };
      x.withCredentials = true;
      x.send(reqBody);
    });
    
    
};


function* getConversationsList({ payload }) {
  try {
      console.log('req payload is...', payload)
      const response = yield call(getConversationsListRequest, payload.userId);
      console.log('saga response is...', response);
      yield put(getMPConversationsListSuccess(JSON.parse(response), payload.chatId));
      if(response && response.length > 0 && payload.chatId) {
        yield call(changeConversation, 
          {
            payload: { 
                chatId: payload.chatId
            }
          }
        )
      }
  } catch (error) {
      yield put(getMPConversationsListError(error));
  }
}

const getConversationsListRequest = async userId => {
  try {
    let URL = getHost(`api/marketplace/chat/?userId=${userId}`);
    return new Promise(function (resolve, reject) {
      const x = new XMLHttpRequest();
      x.open('GET', URL, true);
      x.onload = function() {
        try{
          // const res = x.responseText && JSON.parse(x.responseText);
          const res = x.responseText;
          const jsonResponse = JSON.parse(res);
          if(jsonResponse.success) resolve(jsonResponse.data);
          else throw new Error(jsonResponse.error); 
        } catch(Error) {
          console.log('Error while parsing response body: ', Error);
          reject(Error);
        }
      };
      x.withCredentials = true;
      x.send();
    });
  } catch (Error) {
    console.log('Error while fetching jobs : ', Error);
  }
}


function* getConversationByProposalId({ payload }) {
  try {
      console.log('req payload is...', payload)
      const response = yield call(getConversationByProposalIdAsync, payload.proposalId, payload.userId);
      console.log('saga response is...', response);

      if(response.success){
        if(response.data){
          console.log('found chat for the propsoal, chat id is', response.data);
          const { _id } = JSON.parse(response.data);
          console.log('id is', _id);
          yield call(getConversationsList, 
            {
              payload: { 
              userId: payload.userId, 
              chatIdArray: payload.chatIdArray, 
              chatId: _id
            }
          });
          //yield put(getConversationsSuccess(conversations, selectedUser));
        } else
          throw new Error('Invalid response from the server');
      } else {
        if(response.status === 404){
          //create new chat
          console.log('no chat found, need to create a new one', payload);
          yield call (createNewConversation, {payload: payload});
        } else if(response.status === 401){
          //no access to chat
          console.log('unathorized access');
          throw new Error(response.error);
        } else {
          console.log('server error');
          throw new Error(response.error);
        }
      }
  } catch (error) {
      yield put(getMPConversationsListError(error));
  }
}

const getConversationByProposalIdAsync = async (proposalId, userId)  => {
  try {
    let URL = getHost(`api/marketplace/chat/proposal/?proposalId=${proposalId}&userId=${userId}`);
    return new Promise(function (resolve, reject) {
      const x = new XMLHttpRequest();
      x.open('GET', URL, true);
      x.onload = function() {
          // const res = x.responseText && JSON.parse(x.responseText);
          const res = x.responseText;
          const jsonResponse = JSON.parse(res);
          resolve(jsonResponse);
      };
      x.withCredentials = true;
      x.send();
    });
  } catch (Error) {
    console.log('Error while fetching jobs : ', Error);
  }
};

const joinConversation = async chatId => {
  MPChatSocket.joinChat(chatId);
}

const leaveConversation = async chatId => {
  MPChatSocket.leaveChat(chatId);
}

function* changeConversation({ payload }) {
  try {
      console.log('rmsg eq payload is...', payload)
      const response = yield call(getMessagesRequest, payload.chatId);
      console.log('message saga response is...', response);
      yield call(joinConversation, payload.chatId)
      if(payload.currentChatId)
        yield call(leaveConversation, payload.currentChatId)
      yield put(getMessagesSuccess(JSON.parse(response)));
  } catch (error) {
      yield put(getMessagesError(error));
  }
}

const getMessagesRequest = async chatId => {
  try {
    let URL = getHost(`api/marketplace/message/?chatId=${chatId}`);
    return new Promise(function (resolve, reject) {
      const x = new XMLHttpRequest();
      x.open('GET', URL, true);
      x.onload = function() {
        try{
          // const res = x.responseText && JSON.parse(x.responseText);
          const res = x.responseText;
          const jsonResponse = JSON.parse(res);
          resolve(jsonResponse.data);
        } catch(Error) {
          console.log('Error while parsing response body: ', Error);
          reject(Error);
        }
      };
      x.withCredentials = true;
      x.send();
    });
  } catch (Error) {
    console.log('Error while fetching jobs : ', Error);
  }
}


function* sendMessage({ payload }) {
  try {
      console.log('rmsg eq payload is...', payload)
      const { sender, content, chatId } = payload;
      const response = yield call(
        sendMessageRequest,
        sender, 
        content, 
        chatId,
      );
      console.log('message saga response is...', response);
      yield put(getMessagesSuccess(JSON.parse(response)));
  } catch (error) {
      yield put(getMessagesError(error));
  }
}


const sendMessageRequest = async (
  sender,
  content,
  chatId,
  ) => {

    const reqObject = {
      sender,
      content,
      chatId,
      timeCreated: moment(),
    }
    
    const reqBody = JSON.stringify(reqObject);
};

export function* watchCreateConversation() {
    yield takeEvery(MP_CHAT_CREATE_CONVERSATION, createNewConversation);
}

export function* watchGetConversations() {
  yield takeEvery(MP_CHAT_GET_CONVERSATIONS_LIST, getConversationsList);
}

export function* watchGetConversationByProposalId() {
  yield takeEvery(MP_CHAT_GET_CONVERSATION_PROPOSAL, getConversationByProposalId);
}

export function* watchChangeConversation() {
  yield takeEvery(MP_CHAT_CHANGE_CONVERSATION, changeConversation);
}

export function* watchSendMessage() {
  yield takeEvery(MP_CHAT_SEND_MESSAGE, sendMessage);
}


export default function* rootSaga() {
    yield all([
        fork(watchCreateConversation),
        fork(watchGetConversations),
        fork(watchGetConversationByProposalId),
        fork(watchChangeConversation),
        fork(watchSendMessage),
    ]);
}
