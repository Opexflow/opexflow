import React, { Component } from "react";
import { Card, CardBody, CardTitle, Row } from "reactstrap";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";

import IntlMessages from "../../helpers/IntlMessages";
import { Colxx } from "../../components/common/CustomBootstrap";

export default class SwitchExamples extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchCheckedPrimary: false,
      switchCheckedPrimaryInverse: true,
      switchCheckedSecondary: true,
      switchCheckedSecondaryInverse: false
    };
  }
  render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>
            <IntlMessages id="form-components.switch" />
          </CardTitle>
          <Row className="mb-4">
            <Colxx xxs="6">
              <label>
                <IntlMessages id="form-components.primary" />
              </label>
              <Switch
                className="custom-switch custom-switch-primary"
                checked={this.state.switchCheckedPrimary}
                onChange={switchCheckedPrimary => {
                  this.setState({ switchCheckedPrimary });
                }}
              />
            </Colxx>

            <Colxx xxs="6">
              <label>
                <IntlMessages id="form-components.secondary" />
              </label>
              <Switch
                className="custom-switch custom-switch-secondary"
                checked={this.state.switchCheckedSecondary}
                onChange={switchCheckedSecondary => {
                  this.setState({ switchCheckedSecondary });
                }}
              />
            </Colxx>
          </Row>

          <Row>
            <Colxx xxs="6">
              <label>
                <IntlMessages id="form-components.primary-inverse" />
              </label>
              <Switch
                className="custom-switch custom-switch-primary-inverse"
                checked={this.state.switchCheckedPrimaryInverse}
                onChange={switchCheckedPrimaryInverse => {
                  this.setState({ switchCheckedPrimaryInverse });
                }}
              />
            </Colxx>

            <Colxx xxs="6">
              <label>
                <IntlMessages id="form-components.secondary-inverse" />
              </label>
              <Switch
                className="custom-switch custom-switch-secondary-inverse"
                checked={this.state.switchCheckedSecondaryInverse}
                onChange={switchCheckedSecondaryInverse => {
                  this.setState({ switchCheckedSecondaryInverse });
                }}
              />
            </Colxx>
          </Row>
        </CardBody>
      </Card>
    );
  }
}
