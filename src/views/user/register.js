import React, { Component } from "react";
import { Row, Card, CardTitle, Form, Label, Input, Button } from "reactstrap";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser, authLocation } from "../../redux/actions";
import IntlMessages from "../../helpers/IntlMessages";
import { Colxx } from "../../components/common/CustomBootstrap";
import { NotificationManager } from "../../components/common/react-notifications";
import { compose } from "redux";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "demo@gogo.com",
      password: "gogo123",
      name: "Sarah Kortney"
    };
  }
  onUserRegister() {
    if (this.state.email !== "" && this.state.password !== "") {
      this.props.history.push("/");
    }
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
    return (
      <Row className="h-100">
        <Colxx xxs="12" md="10" className="mx-auto my-auto">
          <Card className="auth-card">
            <div className="position-relative image-side ">
              <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
              <p className="white mb-0">
                Please use this form to register. <br />
                If you are a member, please{" "}
                <NavLink to={`/user/login`} className="white">
                  login
                </NavLink>
                .
              </p>
            </div>
            <div className="form-side">
              <NavLink to={`/`} className="white">
                <span className="logo-single" />
              </NavLink>
              <CardTitle className="mb-4">
                <IntlMessages id="user.register" />
              </CardTitle>
              <Form>
                <Label className="form-group has-float-label mb-4">
                  <Input type="name" defaultValue={this.state.name} />
                  <IntlMessages id="user.fullname" />
                </Label>
                <Label className="form-group has-float-label mb-4">
                  <Input type="email" defaultValue={this.state.email} />
                  <IntlMessages id="user.email" />
                </Label>
                <Label className="form-group has-float-label mb-4">
                  <Input type="password" />
                  <IntlMessages
                    id="user.password"
                    defaultValue={this.state.password}
                  />
                </Label>
                
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <NavLink to={`/SiteRules`} className="btn btn-link p-2">
                      Site rules
                    </NavLink>
                    <Label className="form-check form-group pl-4 d-flex align-items-center">
                      <Input type="checkbox" className="mt-0"/>
                      <IntlMessages
                        id="user.siteRules"
                      />
                    </Label>
                  </div>
                  <Button
                    color="primary"
                    className="btn-shadow"
                    size="lg"
                    onClick={() => this.onUserRegister()}
                  >
                    <IntlMessages id="user.register-button" />
                  </Button>
                </div>
              </Form>
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
      registerUser,
      authLocation
    }
  ),
  withRouter)
(Register)

