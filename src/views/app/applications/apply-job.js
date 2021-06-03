import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';
import {
  Row, Card, CardTitle, CardBody, FormGroup, Label, Button, FormText, Badge, InputGroup, InputGroupAddon
} from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';

import { applyJob } from '../../../redux/actions';
import "react-toastify/dist/ReactToastify.css";


class ApplyJob extends Component {
    constructor(props) {
        super(props);
        this.validateCoverLetter = this.validateCoverLetter.bind(this);
        this.validateBid = this.validateBid.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
          jobid: this.props.match.params.jobid,
        };
    }

  componentDidMount() {
    if(!this.props.authUser?.user) {
      this.props.history.push('/user/login');
    }
  }

  handleSubmit(values) {

    const proposal = {
      jobId: this.state.jobid,
      freelancerId: this.props.authUser.user.id,
      coverLetter: values.coverLetter,
      bid: values.bid,
      currentPropsalStatus: 0,
    }

    this.props.applyJob(proposal);
    
  }

  afterReducerUpdate() {
    const {proposalStatus, error } = this.props.proposals;
    if(proposalStatus) {
      this.showToast('success', 'Proposal submitted successfully');
    }
    else {
      this.showToast('error', 'Server Error, Please try again');
      console.log('Server threw error while submitting the proposal ', error);
    }
    setTimeout(() => {
      this.props.history.push(`/app/applications/marketplace/${this.state.jobid}`);
    }, 2000);
    
  }

  validateCoverLetter(value) {
    let error;
    if (!value) {
        error = 'Cover letter is required';
    } else if (value.length < 20) {
        error = 'Cover letter must be longer than 20 characters';
    }
    return error;
  }

  validateBid(value) {
    let error;
    if (!/^[0-9]*$/.test(value)) {
        error = 'Invalid amount';
    }
    return error;
  }

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
    const { loading, proposalStatus, error } = this.props.proposals;
    const job = marketPlaceItems.find(item => item._id === this.state.jobid);

    if(loading) this.afterReducerUpdate();
    
    const { messages } = this.props.intl;
    
    return (
      <>
        <Row>
          <Colxx xxs="12">
            <Breadcrumb heading="menu.form-layouts" match={this.props.match} />
            <Separator className="mb-5" />
          </Colxx>
        </Row>        
        <Row>
          <Colxx xxs="12" lg="12" className="mb-4">
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
                <br />
                <Row>
                  <Colxx xxs="12" lg="4" className="mb-4">
                    <p className="text-muted text-small mb-2">Project Type</p>
                    <p className="mb-3">{job.projectType}</p>
                  </Colxx>
                  <Colxx xxs="12" lg="4" className="mb-4">
                    <p className="text-muted text-small mb-2">Category</p>
                    <div>
                      <p className="d-sm-inline-block mb-1">
                          <Badge color={job.labelColor || 'primary'} pill>
                              {job.category}
                            </Badge>
                        </p>
                      <p className="d-sm-inline-block  mb-1" />
                    </div>
                  </Colxx>
                  <Colxx xxs="12" lg="4" className="mb-4">
                    {job.budget ?
                    <>
                      <p className="text-muted text-small mb-2">Budget</p>
                      <p className="mb-3">{`$ ${job.budget}`}</p> 
                    </> : null 
                    }
                  </Colxx>
                </Row>
              </CardBody>
            </Card>
          </Colxx>
        </Row>

        <Formik
          initialValues={{
            coverLetter: '',
            bid: 0,
          }}
          onSubmit={this.handleSubmit}
        >
        {({ errors, touched }) => (

          <Row className="mb-4">
            <Colxx xxs="12">
              <Card>
                <CardBody>
                  <CardTitle>
                    <IntlMessages id="marketplace.applicant-details" />
                  </CardTitle>
                  
                  <Form>
                    <FormGroup>
                      <Label><IntlMessages id="marketplace.cover-letter" /></Label>
                      <Field
                        rows="6"
                        as="textarea"
                        className="form-control"
                        name="coverLetter"
                        validate={this.validateCoverLetter}
                        placeholder={messages['marketplace.cover-letter-placeholder']}
                      />
                      <FormText color="muted">
                        <IntlMessages id="marketplace.cover-letter-help" />
                      </FormText>
                      {errors.coverLetter && touched.coverLetter && (
                          <div className="invalid-feedback d-block">
                        {errors.coverLetter}
                      </div>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label><IntlMessages id="marketplace.bid-amount" /></Label>
                      <InputGroup>
                      <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                      <Field
                        className="form-control"
                        name="bid"
                        validate={this.validateBid}
                      />
                      </InputGroup>
                      <FormText color="muted">
                        <IntlMessages id="marketplace.bid-amount-help" />
                      </FormText>
                      {errors.bid && touched.bid && (
                        <div className="invalid-feedback d-block">
                        {errors.bid}
                        </div>
                      )}
                    </FormGroup>
                    <hr />
                    <Button type="submit" color="primary" className="mt-4">
                      <IntlMessages id="marketplace.submit-proposal" />
                    </Button>
                  </Form>
                  </CardBody>
              </Card>
            </Colxx>
          </Row>
        )}
        </Formik>
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
export default withRouter(connect(
    mapStateToProps,
    {
      applyJob,
    },
)(injectIntl(ApplyJob)));
