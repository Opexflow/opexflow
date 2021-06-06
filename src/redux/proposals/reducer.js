import {
  PROPOSALS_GET_LIST,
  PROPOSALS_GET_LIST_SUCCESS,
  PROPOSALS_GET_LIST_ERROR,
  APPLY_JOB,
  APPLY_JOB_SUCCESS,
  APPLY_JOB_ERROR,
  RESET_APPLY_LOADING,
} from '../actions';

const INIT_STATE = {
  loading: false,
  applyJobLoading: false,
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
          return { ...state, applyJobLoading: false };

      case APPLY_JOB_SUCCESS:
          return {
              ...state, applyJobLoading: true, proposalStatus: action.payload,
          };

      case APPLY_JOB_ERROR:
          return { ...state, applyJobLoading: true, error: action.payload };
      
      case RESET_APPLY_LOADING: 
          return {...state, applyJobLoading: false };

      default: return { ...state };
  }
};
