import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import todoApp from './todo/reducer';
import chatApp from './chat/reducer';
import surveyListApp from './surveyList/reducer';
import surveyDetailApp from './surveyDetail/reducer';
import marketPlaceApp from './marketPlace/reducer';
import proposals from './proposals/reducer';
import marketPlaceChatApp from './marketPlaceChat/reducer';

const reducers = combineReducers({
    menu,
    settings,
    authUser,
    todoApp,
    chatApp,
    surveyListApp,
    surveyDetailApp,
    marketPlaceApp,
    proposals,
    marketPlaceChatApp,
});

export default reducers;
