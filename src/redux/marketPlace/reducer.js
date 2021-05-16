import {
  MARKETPLACE_GET_LIST,
  MARKETPLACE_GET_LIST_SUCCESS,
  MARKETPLACE_GET_LIST_ERROR,
  MARKETPLACE_ADD_ITEM,
  MARKETPLACE_ADD_ITEM_SUCCESS,
  MARKETPLACE_ADD_ITEM_ERROR,
} from '../actions';

const INIT_STATE = {
  allMarketPlaceItems: null,
  marketPlaceItems: null,
  error: '',
  filter: null,
  searchKeyword: '',
  orderColumn: null,
  loading: false,
  projectTypes: ['One Time', 'Ongoing', 'Complex'],
  orderColumns: [
      { column: 'title', label: 'Title' },
      { column: 'category', label: 'Category' },
      { column: 'status', label: 'Status' },
      { column: 'label', label: 'Label' },
  ],
  categories: ['Full Stack Development', 'Testing (Manual/Automation)', 'Data Entry', 'Content Writing', 'Graphic Design', 'Other'],
  selectedItems: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
      case MARKETPLACE_GET_LIST:
          return { ...state, loading: false };

      case MARKETPLACE_GET_LIST_SUCCESS:
          return {
              ...state, loading: true, allMarketPlaceItems: action.payload, marketPlaceItems: action.payload,
          };

      case MARKETPLACE_GET_LIST_ERROR:
          return { ...state, loading: true, error: action.payload };

      case MARKETPLACE_ADD_ITEM:
          return { ...state, loading: false };

      case MARKETPLACE_ADD_ITEM_SUCCESS:
          return {
              ...state, loading: true, allMarketPlaceItems: action.payload, marketPlaceItems: action.payload,
          };

      case MARKETPLACE_ADD_ITEM_ERROR:
          return { ...state, loading: true, error: action.payload };

      default: return { ...state };
  }
};
