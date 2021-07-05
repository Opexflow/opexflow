import {
  PROPOSALS_GET_LIST,
  PROPOSALS_GET_LIST_SUCCESS,
  PROPOSALS_GET_LIST_ERROR,
  APPLY_JOB,
  APPLY_JOB_SUCCESS,
  APPLY_JOB_ERROR,
  RESET_APPLY_LOADING,
  WITHDRAW_PROPOSAL,
  WITHDRAW_PROPOSAL_SUCCESS,
  WITHDRAW_PROPOSAL_ERROR,
  RESET_WITHDRAW_LOADING,
} from '../actions';

const INIT_STATE = {
  loading: false,
  applyJobLoading: false,
  withdrawProposalLoading: false,
  withdrawProposalSuccess: false,
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
          return {...state, applyJobLoading: false};
      
      case WITHDRAW_PROPOSAL:
          return { ...state, withdrawProposalLoading: false };

      case WITHDRAW_PROPOSAL_SUCCESS:
          return { ...state, withdrawProposalLoading: true, withdrawProposalSuccess: 'true', proposalsList: action.payload };

      case WITHDRAW_PROPOSAL_ERROR:
          return { ...state, withdrawProposalLoading: true, withdrawProposalSuccess: 'false', error: action.payload };

      case RESET_WITHDRAW_LOADING:
      return {...state, withdrawProposalLoading: false };

      default: return { ...state };
  }
};
