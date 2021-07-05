import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import todoSagas from './todo/saga';
import chatSagas from './chat/saga';
import surveyListSagas from './surveyList/saga';
import surveyDetailSagas from './surveyDetail/saga';
import marketPlaceSagas from './marketPlace/saga';
import proposalsSagas from './proposals/saga';
import marketPlaceChatSagas from './marketPlaceChat/saga';

export default function* rootSaga(getState) {
    yield all([
        authSagas(),
        todoSagas(),
        chatSagas(),
        surveyListSagas(),
        surveyDetailSagas(),
        marketPlaceSagas(),
        proposalsSagas(),
        marketPlaceChatSagas(),
    ]);
}
