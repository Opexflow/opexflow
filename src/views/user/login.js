import React, { Component } from "react";
import { Row, Card, CardTitle, Label, FormGroup, Button } from "reactstrap";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { NotificationManager } from "../../components/common/react-notifications";
import { Formik, Form, Field } from "formik";
import { loginUser, authLocation } from "../../redux/actions";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { compose } from "redux";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "demo@gogo.com",
      password: "gogo123"
    };
  }

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

  componentDidMount(){
    this.props.authLocation(this.props.location.pathname)
  }

  componentDidUpdate() {
    if (this.props.error) {
      NotificationManager.warning(
        this.props.error,
        "Login Error",
        3000,
        null,
        null,
        ''
      );
    }
  }

  render() {
    const { password, email } = this.state;
    const initialValues = {email,password};

    return (
      <Row className="h-100">
        <Colxx xxs="12" md="10" className="mx-auto my-auto">
          <Card className="auth-card">
            <div className="position-relative image-side ">
              <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
              <p className="white mb-0">
                Please use your credentials to login.
                <br />
                If you are not a member, please{" "}
                <NavLink to={`/user/register`} className="white">
                  register
                </NavLink>
                .
              </p>
            </div>
            <div className="form-side">
              <NavLink to={`/`} className="white">
                <span className="logo-single" />
              </NavLink>
              <CardTitle className="mb-4">
                <IntlMessages id="user.login-title" />
              </CardTitle>

              <Formik
                initialValues={initialValues}
                onSubmit={this.onUserLogin}>
                {({ errors, touched }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="user.email" />
                      </Label>
                      <Field
                        className="form-control"
                        name="email"
                        validate={this.validateEmail}
                      />
                      {errors.email && touched.email && (
                        <div className="invalid-feedback d-block">
                          {errors.email}
                        </div>
                      )}
                    </FormGroup>
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="user.password" />
                      </Label>
                      <Field
                        className="form-control"
                        type="password"
                        name="password"
                        validate={this.validatePassword}
                      />
                      {errors.password && touched.password && (
                        <div className="invalid-feedback d-block">
                          {errors.password}
                        </div>
                      )}
                    </FormGroup>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="flex-column">
                        <NavLink to={`/user/forgot-password`} className="btn btn-link p-0 p-sm-2 pl-1">
                          <IntlMessages id="user.forgot-password-question" />
                        </NavLink>
                        <NavLink to={`/SiteRules`} className="btn btn-link p-0 p-sm-2 pl-1">
                          Site rules
                        </NavLink>
                      </div>
                      <Button
                        color="primary"
                        className={`btn-shadow btn-multiple-state ${this.props.loading ? "show-spinner" : ""}`}
                        size="lg"
                      >
                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                        <span className="label"><IntlMessages id="user.login-button" /></span>
                      </Button>
                    </div>


                  </Form>
                )}
              </Formik>
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

export default compose(
  connect(
    mapStateToProps,
    {
      loginUser,
      authLocation
    }
  ),
  withRouter)
(Login)

