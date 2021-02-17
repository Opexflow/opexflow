import React, { Component } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import { getHost } from '../../../helpers/Utils';

export default class Commands extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hftChecked: false,
      commandType: this.commands[0].command,
      showResult: false,
      commandResult: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
}

  commands = [
    {
      command: 'server_status',
    },
    {
      command: 'get_securities',
    },
    {
      command: 'get_portfolio',
    },
    {
      command: 'get_forts_positions',
    },
    {
      command: 'gethistorydata',
    },
    {
      command: 'neworder',
    },
    {
      command: 'newstoporder',
    },
    {
      command: 'newcondorder',
    },
    {
      command: 'cancelorder',
    },
  ];

  toggleHFTChange = () => {
    this.setState({
        hftChecked: !this.state.hftChecked,
    });
  }
  
  handleCommandChange = (event) => {
    this.setState({commandType: event.target.value});
  }

  handleOnLoadData(commandResponse) {
    //const result = JSON.parse(rawData);
    console.log("result is ...", commandResponse);

    //if(commandResponse.success){
      this.setState({
        showResult: true,
        commandResult: commandResponse,
      });
    //}
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      showResult: false,
    })
    console.log(`hftChecked: ${ this.state.hftChecked }`);
    console.log(`commandType: ${ this.state.commandType }`);
    try {
      const classInstance = this;
      const x = new XMLHttpRequest();
      let URL = getHost('api/commands');
      const HftOrNot = this.state.hftChecked ? 'Hft' : 'NoHft'
      const queryParams = `?command=${this.state.commandType}&HftOrNot=${HftOrNot}`;
      URL = URL + queryParams;
      x.open('GET', URL, true);
      x.onload = function() {
          //const res = x.responseText && JSON.parse(x.responseText);
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
                    <Label for="selectCommand">Command</Label>
                    <Input 
                      type="select" 
                      name="select" 
                      id="selectCommand" 
                      value={this.state.commandType} 
                      onChange={this.handleCommandChange}>
                      {
                        this.commands.map((command, index) => {
                          return <option key={`${index}`} value={command.command}>{command.command}</option>
                      })}
                    </Input>
                  </FormGroup>
                </Col>
                <Col className="hft-checkbox" md={{ span: 2, offset: 1 }} xs={{ span: 12, offset: 5}}>
                  <FormGroup check inline>
                      <Label check>
                      <h2>
                        <Input 
                          type="checkbox"
                          checked={this.state.hftChecked}
                          onChange={this.toggleHFTChange}
                        />Hft
                        </h2>
                      </Label>
                  </FormGroup>
                </Col>
              </Row>
              <br />
              <FormGroup check row>
                <Col md={{ size: 4, offset: 4 }} xs={{ size: 8, offset: 2 }}>
                  <Button type="submit" color="primary" size="lg" block>Submit</Button>
                </Col>
              </FormGroup>
            </Form>
            <hr />
            {
              this.state.showResult ? 
                <div className="result">
                  <Row>
                    <p>{this.state.commandResult}</p>
                  </Row>
                </div>
              : null
            }
      </>
    );
}
}