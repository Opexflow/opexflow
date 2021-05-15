import {
  MARKETPLACE_GET_LIST,
  MARKETPLACE_GET_LIST_SUCCESS,
  MARKETPLACE_GET_LIST_ERROR,
  MARKETPLACE_ADD_ITEM,
  MARKETPLACE_ADD_ITEM_SUCCESS,
  MARKETPLACE_ADD_ITEM_ERROR,
} from '../actions';

export const getMarketPlaceList = () => ({
  type: MARKETPLACE_GET_LIST,
});

export const getMarketPlaceListSuccess = items => ({
  type: MARKETPLACE_GET_LIST_SUCCESS,
  payload: items,
});

export const getMarketPlaceListError = error => ({
  type: MARKETPLACE_GET_LIST_ERROR,
  payload: error,
});

export const addMarketPlaceItem = item => ({
  type: MARKETPLACE_ADD_ITEM,
  payload: item,
});

export const addMarketPlaceItemSuccess = items => ({
  type: MARKETPLACE_ADD_ITEM_SUCCESS,
  payload: items,
});

export const addMarketPlaceItemError = error => ({
  type: MARKETPLACE_ADD_ITEM_ERROR,
  payload: error,
});