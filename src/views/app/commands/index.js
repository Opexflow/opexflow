import React, { Component } from 'react';
import {
    Row, Col, Form, FormGroup, Label, Input, Button,
} from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import IntlMessages from '../../../helpers/IntlMessages';
import { getHost } from '../../../helpers/Utils';
import FormFields from '../../../containers/commands/FormFields';
import commands from '../../../constants/commands';

export default class Commands extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hftChecked: false,
            commandType: commands[0].command,
            period: 0,
            count: 0,
            orderPrice: 0,
            quantity: 0,
            stoplosspercent: 0,
            takeprofitpercent: 0,
            cond_value: 0,
            buysell: 'buy',
            cond_type: 'LastUp',
            ismarket: false,
            condorder: false,
            orderId: '',
            showResult: false,
            commandResult: null,
            isSubmitDisable: false,
            invalidFields: {},
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

  resetFields = () => {
      this.setState({
          period: 0,
          count: 0,
          orderPrice: 0,
          quantity: 0,
          stoplosspercent: 0,
          takeprofitpercent: 0,
          cond_value: 0,
          buysell: 'buy',
          cond_type: 'LastUp',
          ismarket: false,
          condorder: false,
          orderId: '',
          showResult: false,
          commandResult: null,
          isSubmitDisable: false,
          invalidFields: {},
      });
  }

  validatePercentFields = (name, value) => {
      if (!(/\b(?<!\.)(?!0+(?:\.0+)?%)(?:\d|[1-9]\d|100)(?:(?<!100)\.\d+)$/.test(value))) {
          this.setState({ [name]: value, invalidFields: { ...this.state.invalidFields, [name]: true }, isSubmitDisable: true });
      } else {
          const isSubmitDisable = Object.keys(this.state.invalidFields).find(field => field !== name && this.state.invalidFields[field] === true) !== undefined;
          this.setState({ [name]: value, invalidFields: { ...this.state.invalidFields, [name]: false }, isSubmitDisable });
      }
  }

  handleInputChange = event => {
      const { target } = event;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const { name } = target;
      if (name === 'stoplosspercent' || name === 'takeprofitpercent') {
          this.validatePercentFields(name, value);
      } else {
          this.setState({ [name]: value });
          if (name === 'commandType') {
              this.resetFields();
          }
      }
  }

  handleOnLoadData(commandResponse) {
      // const result = JSON.parse(rawData);

      // if(commandResponse.success){
      this.setState({
          showResult: true,
          commandResult: commandResponse,
      });
      // }
  }

  handleSubmit(event) {
      event.preventDefault();
      this.setState({
          showResult: false,
      });

      try {
          const classInstance = this;
          const x = new XMLHttpRequest();
          let URL = getHost('api/commands');
          const HftOrNot = this.state.hftChecked ? 'Hft' : 'NoHft';
          const queryParams = `?command=${this.state.commandType}&HftOrNot=${HftOrNot}`;

          let extraQueryParams = '';
          const commandObject = commands.find(commandObj => commandObj.command === this.state.commandType);
          if (commandObject.fields) {
              Object.keys(commandObject.fields).map(field => {
                  extraQueryParams += `&${ field }=${ this.state[field]}`;
              });
          }
          URL = URL + queryParams + extraQueryParams;
          x.open('GET', URL, true);
          x.onload = function() {
          // const res = x.responseText && JSON.parse(x.responseText);
              const res = x.responseText;
              classInstance.handleOnLoadData(res);
          };
          x.withCredentials = true;
          x.send();
      } catch (Error) {
          console.log('Error while fetching command result : ', Error);
      }
  }

  render() {
      let host = `https://${window.location.host}`;
      if (host.indexOf(3000) !== -1) {
          host = host.replace('3000', '3001').replace('https', 'http');
      }
      return (
          <>
              <Row>
              <Colxx xxs="12">
                      <Breadcrumb heading="menu.commands" match={this.props.match} />
                      <Separator className="mb-5" />
                  </Colxx>
            </Row>
              <Form onSubmit={this.handleSubmit}>
                  <Row form>
                  <Col md={9}>
                        <FormGroup inline>
                              <Label for="selectCommand"><IntlMessages id="forms.command" /></Label>
                              <Input
                                  type="select"
                            name="commandType"
                            id="selectCommand"
                            value={this.state.commandType}
                                  onChange={this.handleInputChange}
                          >
                                  {
                                      commands.map((command, index) => <option key={`${index}`} value={command.command}>{command.command}</option>)
                                  }
                          </Input>
                          </FormGroup>
                      </Col>
                  <Col className="hft-checkbox" md={{ span: 2, offset: 1 }} xs={{ span: 12, offset: 5 }}>
                          <FormGroup check inline>
                              <Label check>
                                  <h2>
                                      <Input
                                          type="checkbox"
                                      name="hftChecked"
                                          checked={this.state.hftChecked}
                                      onChange={this.handleInputChange}
                                    />
                                  <IntlMessages id="forms.hft" />
                                </h2>
                            </Label>
                    </FormGroup>
                      </Col>
                </Row>
                  <Row>
                      <FormFields {...this.state} handleInputChange={this.handleInputChange} />
                </Row>
                  <br />
              <FormGroup check row>
                      <Col md={{ size: 4, offset: 4 }} xs={{ size: 8, offset: 2 }}>
                  <Button disabled={this.state.isSubmitDisable} type="submit" color="primary" size="lg" block><IntlMessages id="pages.submit" /></Button>
                </Col>
                  </FormGroup>
            </Form>
              <hr />
              {
                  this.state.showResult ? (
                      <div className="result">
                      <Row>
                            <p>{this.state.commandResult}</p>
                          </Row>
                    </div>
                  ) :
                      null
              }
        </>
      );
  }
}
