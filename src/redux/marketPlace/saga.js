import {
  all, call, fork, put, takeEvery,
} from 'redux-saga/effects';
import { getDateWithFormat } from '../../helpers/Utils';

import { MARKETPLACE_GET_LIST, MARKETPLACE_ADD_ITEM } from '../actions';

import {
  getMarketPlaceListSuccess,
  getMarketPlaceListError,
  addMarketPlaceItemSuccess,
  addMarketPlaceItemError,
} from './actions';

import { getHost } from '../../helpers/Utils';

const getMarketPlaceListRequest = async () => {
  try {
    
    
    let URL = getHost('api/marketplace');
    return new Promise(function (resolve, reject) {
      const x = new XMLHttpRequest();
      x.open('GET', URL, true);
      x.onload = function() {
          // const res = x.responseText && JSON.parse(x.responseText);
          const res = x.responseText;
          const jsonResponse = JSON.parse(res);
          resolve(jsonResponse.data);
      };
      //x.withCredentials = true;
      x.send();
    });
  } catch (Error) {
    console.log('Error while fetching jobs : ', Error);
  }
}

function* getMarketPlaceListItems() {
  try {
      const response = yield call(getMarketPlaceListRequest);
      yield put(getMarketPlaceListSuccess(response));
  } catch (error) {
      yield put(getMarketPlaceListError(error));
  }
}

const addMarketPlaceItemRequest = async item => {

  try {
    
    item.createDate = getDateWithFormat();
    const reqBody = JSON.stringify(item);
        
    let URL = getHost('api/marketplace');
    return new Promise(function (resolve, reject) {
      const x = new XMLHttpRequest();
      x.open('POST', URL, true);
      x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      //x.setRequestHeader("Content-Type", "application/*");
      x.onload = function() {
          // const res = x.responseText && JSON.parse(x.responseText);
          const res = x.responseText;
          const jsonResponse = JSON.parse(res);
          resolve(jsonResponse.data);
      };
      x.withCredentials = true;
      x.send(reqBody);
    });
  } catch (Error) {
    console.log('Error while creating a new job : ', Error);
  }
};

function* addMarketPlaceItem({ payload }) {
  try {
      const response = yield call(addMarketPlaceItemRequest, payload);
      yield put(addMarketPlaceItemSuccess(response));
  } catch (error) {
      yield put(addMarketPlaceItemError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(MARKETPLACE_GET_LIST, getMarketPlaceListItems);
}

export function* wathcAddItem() {
  yield takeEvery(MARKETPLACE_ADD_ITEM, addMarketPlaceItem);
}

export default function* rootSaga() {
  yield all([fork(watchGetList), fork(wathcAddItem)]);
}
