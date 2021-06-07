import {
  all, call, fork, put, takeEvery,
} from 'redux-saga/effects';
import { getDateWithFormat } from '../../helpers/Utils';

import { PROPOSALS_GET_LIST, APPLY_JOB } from '../actions';

import {
  getProposalsListSuccess,
  getProposalsListError,
  applyJobSuccess,
  applyJobError,
} from './actions';

import { getHost } from '../../helpers/Utils';


const getProposalsListRequest = async jobId => {
  try {
    
    
    let URL = getHost(`api/marketplace/proposal/?jobId=${jobId}`);
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

function* getProposalsListItems({ payload }) {
  try {
      const response = yield call(getProposalsListRequest, payload);
      yield put(getProposalsListSuccess(response));
  } catch (error) {
      yield put(getProposalsListError(error));
  }
}

const applyJobRequest = async item => {

  try {
    
    item.submittedDate = getDateWithFormat();
    const reqBody = JSON.stringify(item);
        
    let URL = getHost('api/marketplace/proposal');
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
    console.log('Error while submitting the proposal : ', Error);
  }
};

function* applyJob({ payload }) {
  try {
      const response = yield call(applyJobRequest, payload);
      yield put(applyJobSuccess(response));
  } catch (error) {
      yield put(applyJobError(error));
  }
}


export function* wathcApplyJob() {
  yield takeEvery(APPLY_JOB, applyJob);
}

export function* watchGetList() {
  yield takeEvery(PROPOSALS_GET_LIST, getProposalsListItems);
}

export default function* rootSaga() {
  yield all([fork(watchGetList), fork(wathcApplyJob)]);
}
