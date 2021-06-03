import {
  PROPOSALS_GET_LIST,
  PROPOSALS_GET_LIST_SUCCESS,
  PROPOSALS_GET_LIST_ERROR,
  APPLY_JOB,
  APPLY_JOB_SUCCESS,
  APPLY_JOB_ERROR,
} from '../actions';

const INIT_STATE = {
  loading: false,
  proposalsList: null,
  proposalStatus: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case PROPOSALS_GET_LIST:
          return { ...state, loading: false };

      case PROPOSALS_GET_LIST_SUCCESS:
          return {
              ...state, loading: true, proposalsList: action.payload,
          };

      case PROPOSALS_GET_LIST_ERROR:
          return { ...state, loading: true, error: action.payload };

      case APPLY_JOB:
          return { ...state, loading: false };

      case APPLY_JOB_SUCCESS:
          return {
              ...state, loading: true, proposalStatus: action.payload,
          };

      case APPLY_JOB_ERROR:
          return { ...state, loading: true, error: action.payload };

      default: return { ...state };
  }
};
