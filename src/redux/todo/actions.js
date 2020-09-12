import {
    TODO_GET_LIST,
    TODO_GET_LIST_SUCCESS,
    TODO_GET_LIST_ERROR,
    TODO_GET_LIST_WITH_FILTER,
    TODO_GET_LIST_WITH_ORDER,
    TODO_GET_LIST_SEARCH,
    TODO_ADD_ITEM,
    TODO_ADD_ITEM_SUCCESS,
    TODO_ADD_ITEM_ERROR,
    TODO_SELECTED_ITEMS_CHANGE,
} from '../actions';

export const getTodoList = () => ({
    type: TODO_GET_LIST,
});

export const getTodoListSuccess = items => ({
    type: TODO_GET_LIST_SUCCESS,
    payload: items,
});

export const getTodoListError = error => ({
    type: TODO_GET_LIST_ERROR,
    payload: error,
});

export const getTodoListWithFilter = (column, value) => ({
    type: TODO_GET_LIST_WITH_FILTER,
    payload: { column, value },
});

export const getTodoListWithOrder = column => ({
    type: TODO_GET_LIST_WITH_ORDER,
    payload: column,
});

export const getTodoListSearch = keyword => ({
    type: TODO_GET_LIST_SEARCH,
    payload: keyword,
});

export const addTodoItem = item => ({
    type: TODO_ADD_ITEM,
    payload: item,
});

export const addTodoItemSuccess = items => ({
    type: TODO_ADD_ITEM_SUCCESS,
    payload: items,
});

export const addTodoItemError = error => ({
    type: TODO_ADD_ITEM_ERROR,
    payload: error,
});

export const selectedTodoItemsChange = selectedItems => ({
    type: TODO_SELECTED_ITEMS_CHANGE,
    payload: selectedItems,
});
