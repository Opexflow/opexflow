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

export const getProposalsList = jobId => ({
  type: PROPOSALS_GET_LIST,
  payload: jobId,
});

export const getProposalsListSuccess = items => ({
  type: PROPOSALS_GET_LIST_SUCCESS,
  payload: items,
});

export const getProposalsListError = error => ({
  type: PROPOSALS_GET_LIST_ERROR,
  payload: error,
});

export const applyJob = item => ({
  type: APPLY_JOB,
  payload: item,
});

export const applyJobSuccess = items => ({
  type: APPLY_JOB_SUCCESS,
  payload: items,
});

export const applyJobError = error => ({
  type: APPLY_JOB_ERROR,
  payload: error,
});

export const resetApplyLoading = () => ({
  type: RESET_APPLY_LOADING,
});

// export const withdrawProposal = proposalId => ({
//   type: WITHDRAW_PROPOSAL,
//   payload: proposalId,
// });

export const withdrawProposal = (userId, jobId) => ({
  type: WITHDRAW_PROPOSAL,
  payload: {userId, jobId},
});


export const withdrawProposalSuccess = items => ({
  type: WITHDRAW_PROPOSAL_SUCCESS,
  payload: items,
});

export const withdrawProposalError = error => ({
  type: WITHDRAW_PROPOSAL_ERROR,
  payload: error,
});

export const resetWithdrawLoading = () => ({
  type: RESET_WITHDRAW_LOADING,
});
