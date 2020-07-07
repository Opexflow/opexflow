import React, { Component } from "react";
import { Row, Card, CardTitle, Label, FormGroup, Button, Input } from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
// import Facebook from './Facebook';

import { NotificationManager } from "../../components/common/react-notifications";
// import { Formik, Form, Field } from "formik";

import { loginUser } from "../../redux/actions";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { ok } from "assert";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      facebookHref: '#'
    }
  }
  toggleChange = () => {
    this.setState({
      isChecked: !this.state.isChecked
    });
    if(this.state.isChecked !== true)
    this.state.facebookHref ='http://localhost:3001/auth/facebook'
    else this.state.facebookHref ='#'
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
        "Login Error",
        3000,
        null,
        null,
        ''
      );
    }
  }

  render() {
    // const { password, email } = this.state;
    // const initialValues = {email,password};

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
                <NavLink to={`/register`} className="white">
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
                { /* <IntlMessages id="user.login-title" /> */ }
                <FormGroup check inline>
                    <Label check>
                      <Input type="checkbox" 
                      checked={this.state.isChecked}
                      onChange={this.toggleChange}/> 
                      Авторизуясь на сайте вы соглашаетесь с правилами.
                    </Label>
                  </FormGroup>
              </CardTitle>

              <div className="Facebook">
                  <a
                    href={this.state.facebookHref}
                    alt="Continue with Facebook"
                  >
                    <img
                      src="/assets/img/facebook.png"
                      alt="Continue with Facebook"
                      width="300"
                    />
                  </a>
                  { 
                    // <Facebook onUserLogin={this.onUserLogin} />
                  }
              </div>
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
    loginUser
  }
)(Login);