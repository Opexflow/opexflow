import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import {
    Row,
    Button,
    Card,
    CardBody,
    Badge
} from 'reactstrap';
import classnames from 'classnames';
import { mapOrder } from '../../../helpers/Utils';

import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';

import { getProposalsList } from '../../../redux/actions';

class MarketPlaceApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
          jobid: this.props.match.params.jobid,
          applyDisable: false,
        };
    }

    componentDidMount() {
      this.props.getProposalsList(this.state.jobid);
    }

    isProposalAlreadySubmitted(user, proposalsList) {
      let submittedProposal = null;

      submittedProposal = proposalsList.find((proposal) => {
        return proposal.freelancerId == user.id
      });
      if(submittedProposal) return true;
      else return false;
    }


    render() {
      const { marketPlaceItems } = this.props.marketPlaceApp;
      const { user } = this.props.authUser;
      const { loading, proposalsList, error } = this.props.proposals;

      let applyDisable = false;

      if(user && loading && proposalsList){
        applyDisable = this.isProposalAlreadySubmitted(user, proposalsList);
      }

      const job = marketPlaceItems.find(item => item._id === this.state.jobid)
      return (
        <>
          <Row>
            <Colxx xxs="12">
              <h1>
                <i className="simple-icon-refresh heading-icon" />
                {' '}
                <span className="align-middle d-inline-block pt-1">
                  {job.title}
                </span>
              </h1>
              <Breadcrumb match={this.props.match} />
              <div className="float-sm-right mb-2">
                <NavLink
                  to={applyDisable ? '' :  `/app/applications/marketplace/apply/${this.state.jobid}`}
                  className="list-item-heading mb-0 truncate w-40 w-xs-100  mb-1 mt-1"
                >
                  <Button
                      disabled={applyDisable}
                      outline
                      className="flex-grow-1"
                      size="lg"
                      color="primary"
                    >
                      {applyDisable ? 
                      <IntlMessages id="marketplace.already-submitted" /> : 
                      <IntlMessages id="marketplace.apply" />}
                  </Button>
                </NavLink>
              </div>
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
            </Colxx>
          </Row>
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
    },
)(MarketPlaceApp);
