import React, { Component } from 'react';
import {
  Container, Row, Col, Card, CardTitle, Label, FormGroup, Input,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import IntlMessages from '../../helpers/IntlMessages';
// import Facebook from './Facebook';

import { NotificationManager } from '../../components/common/react-notifications';
// import { Formik, Form, Field } from "formik";

import { loginUser } from '../../redux/actions';
import { Colxx } from '../../components/common/CustomBootstrap';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rulesAccepted: false,
        };
    }

    /*
  onUserLogin = (values) => {
    if (!this.props.loading) {
      if (values.email !== "" && values.password !== "") {
        this.props.loginUser(values, this.props.history);
      }
    }
  }

  validateEmail = (value) => {
    let error;
    if (!value) {
      error = "Please enter your email address";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  }

  validatePassword = (value) => {
    let error;
    if (!value) {
      error = "Please enter your password";
    } else if (value.length < 4) {
      error = "Value must be longer than 3 characters";
    }
    return error;
  }
  */

    componentDidUpdate() {
        if (this.props.error) {
            NotificationManager.warning(
                this.props.error,
                'Login Error',
                3000,
                null,
                null,
                '',
            );
        }
    }

  toggleChange = () => {
      this.setState({
          rulesAccepted: !this.state.rulesAccepted,
      });
  }

  render() {
      let host = `https://${window.location.host}`;
      if (host.indexOf(3000) !== -1) {
          host = host.replace('3000', '3001').replace('https', 'http');
      }

      return (
          <Row className="h-100">
              <Colxx xxs="12" md="10" className="mx-auto my-auto">
                  <Card className="auth-card">
                      <div className="position-relative image-side ">
                          <p className="lead text-white">
                          <IntlMessages id="dashboards.magic-is-in-the-details" />
                        </p>
                          <p className="white mb-0">
                          <IntlMessages id="dashboards.login-credentials" />

                              <br />
                              <IntlMessages id="dashboards.noregistered-please" />

                          {' '}
                              <NavLink to="/register" className="white">
                              <IntlMessages id="dashboards.register" />
                            </NavLink>
                          .
                          </p>
                    </div>
                      <div className="form-side">
                          <NavLink to="/" className="white">
                              <span className="logo-single" />
                        </NavLink>
                          <CardTitle className="mb-4">
                              { /* <IntlMessages id="user.login-title" /> */ }
                              <FormGroup check inline>
                                  <Label check>
                                      <Input
                                      type="checkbox"
                                          checked={this.state.rulesAccepted}
                                          onChange={this.toggleChange}
                                    />

                                  <IntlMessages id="dashboards.continue" />

                                </Label>
                            </FormGroup>
                        </CardTitle>

                          {this.state.rulesAccepted && (
                            <Container>
                              <Row >
                                <div className="Facebook">
                                  <a
                                    href={`${host}/api/auth/facebook`}
                                    alt="Continue with Facebook"
                                  >
                                    <img
                                        src="/assets/img/facebook.png"
                                        alt="Continue with Facebook"
                                        width="300"
                                      />
                                  </a>
                                </div>
                              </Row>
                              <Row style={{marginTop: '5%'}}>
                                <div className="Facebook">
                                  <a
                                      href={`${host}/api/auth/github`}
                                      alt="Continue with Github"
                                  >
                                    <img
                                        src="/assets/img/rsz_1github.png"
                                        alt="Continue with Github"
                                        width="300"
                                      />
                                  </a>
                                </div>
                              </Row>
                            </Container>
                          )}
                    </div>
                </Card>
            </Colxx>
        </Row>
      );
  }
}
const mapStateToProps = ({ authUser }) => {
    const { user, loading, error } = authUser;
    return { user, loading, error };
};

export default connect(
    mapStateToProps,
    {
        loginUser,
    },
)(Login);
