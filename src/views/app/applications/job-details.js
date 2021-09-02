import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import {
    Row,
    Button,
    Card,
    CardBody,
    Badge
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import Proposals from '../../../components/applications/Proposals'; 
import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';

import { getProposalsList, resetApplyLoading, withdrawProposal, resetWithdrawLoading } from '../../../redux/actions';

import "react-toastify/dist/ReactToastify.css";
class MarketPlaceApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
          jobid: this.props.match.params.jobid,
          applyDisable: false,
          submittedProposalId: null,
        };
    }

    componentDidMount() {
      this.props.getProposalsList(this.state.jobid);
      this.props.resetApplyLoading();
    }

    isProposalAlreadySubmitted(user, proposalsList) {
      let submittedProposal = null;

      submittedProposal = proposalsList.find((proposal) => {
        if(proposal.freelancerId == user.id) {
          //this.setState({ submittedProposalId: proposal._id });
          return true;
        }
      });
      if(submittedProposal) return true;
      else return false;
    }

    withdrawProposal = () => {
      //this.props.withdrawProposal(this.state.submittedProposalId);
      this.props.withdrawProposal(this.props.authUser.user.id, this.state.jobid);
    }

    afterReducerUpdate() {
      const {withdrawProposalSuccess, error } = this.props.proposals;
      if(withdrawProposalSuccess) {
        this.showToast('success', 'Proposal withdrawn successfully');
      }
      else {
        this.showToast('error', 'Server Error, Please try again');
        console.log('Server threw error while withdrawing the proposal ', error);
      }
      this.props.resetWithdrawLoading();
      this.props.getProposalsList(this.state.jobid);
      this.props.resetApplyLoading();
      
      
    }

    // getOrCreateChat(ownerId, freelancerId, proposalId, jobTitle){
      
    // }

    showToast = (type, message) => {
      if(type === 'success'){
        toast.success(message, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false
        })
      }
      else{
        toast.error(message, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false
        })
      }
    }


    render() {
      const { marketPlaceItems } = this.props.marketPlaceApp;
      const { user } = this.props.authUser;
      const { loading, proposalsList, withdrawProposalLoading } = this.props.proposals;
      console.log('props are ', this.props);

      let applyDisable = false;

      if(user && loading && proposalsList){
        applyDisable = this.isProposalAlreadySubmitted(user, proposalsList);
      }

      if(withdrawProposalLoading) this.afterReducerUpdate();

      const job = marketPlaceItems.find(item => item._id === this.state.jobid)
      return (
        <>
          <Row>
            <Colxx xxs="12" lg="8">
              <h1>
                <i className="simple-icon-refresh heading-icon" />
                {' '}
                <span className="align-middle d-inline-block pt-1">
                  {job.title}
                </span>
              </h1>
              <Breadcrumb match={this.props.match} />
              </Colxx>

              { !user || (user && user.id && user.id !== job.createdById) ? 
              <Colxx xxs="12" lg="4">
                <div className="float-sm-right mb-2">
                  <Row>
                  <NavLink
                    to={applyDisable ? '' :  `/app/applications/marketplace/apply/${this.state.jobid}`}
                    className="list-item-heading mb-0 truncate w-xs-100  mb-1 mt-1"
                  >
                    <Button
                        disabled={applyDisable}
                        outline
                        className="flex-grow-1"
                        size="lg"
                        color="primary"
                      >
                        {applyDisable ? 
                        <IntlMessages id="marketplace.already-submitted" /> 
                        // <Link onClick={this.withdrawProposal}></Link>
                        : <IntlMessages id="marketplace.apply" />}
                    </Button>
                  </NavLink>
                  </Row>
                  <Row style={{ justifyContent: 'center'}}>
                  { applyDisable ? <Button color="link" onClick={(e) => { e.preventDefault(); this.withdrawProposal()}}><IntlMessages id="marketplace.withdraw-proposal" /></Button> : null}
                  </Row>
                </div>
              </Colxx> : null }
            </Row>

              <Row>
                <Colxx xxs="12" lg="8" className="mb-4">
                  <Card className="mb-4">
                    <CardBody>
                      <p className="list-item-heading mb-4">Summary</p>
                      <p className="text-muted text-small mb-2">Title</p>
                      <p className="mb-3">{job.title}</p>

                      <p className="text-muted text-small mb-2">Description</p>
                      <p
                        className="mb-3"
                        dangerouslySetInnerHTML={{
                              __html: job.detail,
                          }}
                      />

                      <p className="text-muted text-small mb-2">Project Type</p>
                      <p className="mb-3">{job.projectType}</p>

                      <p className="text-muted text-small mb-2">Category</p>
                      <div>
                        <p className="d-sm-inline-block mb-1">
                            <Badge color={job.labelColor || 'primary'} pill>
                                {job.category}
                              </Badge>
                          </p>
                        <p className="d-sm-inline-block  mb-1" />
                      </div>
                      <hr />
                      {job.budget ?
                        <>
                        <p className="text-muted text-small mb-2">Budget</p>
                        <p className="mb-3">{`$ ${job.budget}`}</p> 
                        </> : null 
                      }
                    </CardBody>
                  </Card>
                </Colxx>
                <Colxx xxs="12" lg="4">
                  <Card className="mb-4">
                    <CardBody>
                      <p className="list-item-heading mb-4">About the client</p>
                      <p className="text-muted text-small mb-2">Posted By</p>
                      <p className="mb-3">{job.createdByName}</p>

                      <p className="text-muted text-small mb-2">Posted On</p>
                      <p className="mb-3">{job.createDate}</p>
                    </CardBody>
                  </Card>
                </Colxx>
              </Row>
          <Proposals 
            loading={loading}
            proposalsList={proposalsList}
            job={job}
            userId={user ? user.id : null}
          />
          <ToastContainer />
        </>
      );
    }
}

const mapStateToProps = ({ authUser, marketPlaceApp, proposals }) => ({
  authUser,
  marketPlaceApp,
  proposals,
});
export default connect(
    mapStateToProps,
    {
        getProposalsList,
        resetApplyLoading,
        withdrawProposal,
        resetWithdrawLoading,
    },
)(MarketPlaceApp);
