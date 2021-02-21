import React from 'react';
import {
    Col, FormGroup, Label, Input, CustomInput, InputGroup, InputGroupAddon, InputGroupText, FormFeedback,
} from 'reactstrap';
import { injectIntl } from 'react-intl';
import IntlMessages from '../../helpers/IntlMessages';
import commands from '../../constants/commands';

const IsVisible = props => {
    const commandObject = commands.find(commandObj => commandObj.command === props.command);
    let matched = false;

    if (commandObject.fields) {
        Object.keys(commandObject.fields).map(field => {
            if (props.field === field) {
                matched = true;
            }
        });
    }

    return matched ? props.children : null;
};

const FormFields = props => {
    const { messages } = props.intl;
    return (
        <>
            <IsVisible command={props.commandType} field="period">
            <Col xs={12} md={6}>
                    <FormGroup>
                        <Label for="period"><IntlMessages id="forms.period" /></Label>
                <Input
                        type="number"
                        name="period"
                        id="period"
                            value={props.period}
                            onChange={props.handleInputChange}
                            placeholder={messages['forms.label.period']}
                            required
                      />
              </FormGroup>
              </Col>
          </IsVisible>
        <IsVisible command={props.commandType} field="count">
            <Col xs={12} md={6}>
                    <FormGroup>
                <Label for="count"><IntlMessages id="forms.count" /></Label>
                        <Input
                      type="number"
                      name="count"
                      id="count"
                      value={props.count}
                            onChange={props.handleInputChange}
                      placeholder={messages['forms.label.count']}
                      required
                    />
                    </FormGroup>
                </Col>
          </IsVisible>
        <IsVisible command={props.commandType} field="orderPrice">
                <Col xs={12} md={6}>
            <FormGroup>
                  <Label for="orderPrice"><IntlMessages id="forms.orderPrice" /></Label>
                        <Input
                type="number"
                name="orderPrice"
                            id="orderPrice"
                value={props.orderPrice}
                            onChange={props.handleInputChange}
                placeholder={messages['forms.label.orderPrice']}
                            required
              />
                </FormGroup>
          </Col>
            </IsVisible>
        <IsVisible command={props.commandType} field="quantity">
                <Col xs={12} md={6}>
                    <FormGroup>
                        <Label for="quantity"><IntlMessages id="forms.quantity" /></Label>
                    <Input
                            type="number"
                            name="quantity"
                            id="quantity"
                          value={props.quantity}
                          onChange={props.handleInputChange}
                          placeholder={messages['forms.label.quantity']}
                            required
                        />
                  </FormGroup>
          </Col>
            </IsVisible>
            <IsVisible command={props.commandType} field="stoplosspercent">
            <Col xs={12} md={6}>
                    <FormGroup>
                    <Label for="stoplosspercent"><IntlMessages id="forms.stoplosspercent" /></Label>
                    <InputGroup>
                          <Input
                                type="text"
                                name="stoplosspercent"
                              id="stoplosspercent"
                              value={props.stoplosspercent}
                              onChange={props.handleInputChange}
                                placeholder={messages['forms.label.stoplosspercent']}
                                invalid={props.invalidFields && props.invalidFields.stoplosspercent}
                            />
                          <FormFeedback valid={false}>Please use the correct format, example 10.5</FormFeedback>
                            <InputGroupAddon addonType="append">
                          <InputGroupText>%</InputGroupText>
                        </InputGroupAddon>
                        </InputGroup>
                    </FormGroup>
          </Col>
          </IsVisible>
        <IsVisible command={props.commandType} field="takeprofitpercent">
              <Col xs={12} md={6}>
                  <FormGroup>
                      <Label for="takeprofitpercent"><IntlMessages id="forms.takeprofitpercent" /></Label>
                        <InputGroup>
                      <Input
                                type="text"
                              name="takeprofitpercent"
                                id="takeprofitpercent"
                                value={props.takeprofitpercent}
                              onChange={props.handleInputChange}
                                placeholder={messages['forms.label.takeprofitpercent']}
                                invalid={props.invalidFields && props.invalidFields.takeprofitpercent}
                            />
                            <InputGroupAddon addonType="append">
                            <InputGroupText>%</InputGroupText>
                          </InputGroupAddon>
                      <FormFeedback valid={false}>Please use the correct format, example 10.5</FormFeedback>
                    </InputGroup>
                    </FormGroup>
                </Col>
            </IsVisible>
            <IsVisible command={props.commandType} field="cond_value">
            <Col xs={12} md={6}>
                    <FormGroup>
                        <Label for="cond_value"><IntlMessages id="forms.cond_value" /></Label>
                <Input
                            type="text"
                          name="cond_value"
                            id="cond_value"
                            value={props.cond_value}
                          onChange={props.handleInputChange}
                            placeholder={messages['forms.label.cond_value']}
                          required
                        />
              </FormGroup>
                </Col>
          </IsVisible>
        <IsVisible command={props.commandType} field="cond_type">
              <Col xs={12} md={6}>
                  <FormGroup inline>
                        <Label for="cond_type"><IntlMessages id="forms.cond_type" /></Label>
                        <Input
                            type="select"
                            name="cond_type"
                id="cond_type"
                value={props.cond_type}
                onChange={props.handleInputChange}
              >
                            {
                                commands.map((command, index) => (command.fields && command.fields.cond_type ?
                                    command.fields.cond_type.map((condType, index) => <option key={`${index}`} value={condType}>{condType}</option>) : null))
                            }
              </Input>
                    </FormGroup>
                </Col>
            </IsVisible>
        <IsVisible command={props.commandType} field="buysell">
              <Col xs={12} md={6} className="buySellRadio">
            <FormGroup>
                      <Label for="buysell"><IntlMessages id="forms.buysell" /></Label>
                      <div>
                <CustomInput
                                type="radio"
                                name="buysell"
                              id="buy"
                                label="Buy"
                              value="buy"
                                onChange={props.handleInputChange}
                                checked={props.buysell === 'buy'}
                                inline
                            />
                            <CustomInput
                            type="radio"
                            name="buysell"
                            id="sell"
                                label="Sell"
                                value="sell"
                            onChange={props.handleInputChange}
                            checked={props.buysell === 'sell'}
                            inline
                          />
              </div>
                    </FormGroup>
                </Col>
            </IsVisible>
            <IsVisible command={props.commandType} field="ismarket">
            <Col xs={12} md={6} className="hft-checkbox">
                    <FormGroup check inline>
                <Label for="ismarket" />
                        <div>
                            <CustomInput
                                type="checkbox"
                                id="ismarket"
                                name="ismarket"
                            checked={props.ismarket}
                            onChange={props.handleInputChange}
                                label={<IntlMessages id="forms.ismarket" />}
                                inline
                          />
                      </div>
              </FormGroup>
              </Col>
          </IsVisible>
            <IsVisible command={props.commandType} field="condorder">
                <Col xs={12} md={6} className="hft-checkbox">
                <FormGroup check inline>
                <Label for="condorder" />
                        <div>
                            <CustomInput
                                type="checkbox"
                                id="condorder"
                                name="condorder"
                            checked={props.condorder}
                                onChange={props.handleInputChange}
                            label={<IntlMessages id="forms.condorder" />}
                                inline
                          />
                    </div>
              </FormGroup>
              </Col>
          </IsVisible>
            <IsVisible command={props.commandType} field="orderId">
                <Col xs={12} md={6}>
                    <FormGroup>
                        <Label for="orderId"><IntlMessages id="forms.orderId" /></Label>
                        <Input
                        type="text"
                            name="orderId"
                        id="orderId"
                            value={props.orderId}
                            onChange={props.handleInputChange}
                            placeholder={messages['forms.label.orderId']}
                            required
                      />
                  </FormGroup>
              </Col>
          </IsVisible>
      </>
    );
};

export default injectIntl(FormFields);
