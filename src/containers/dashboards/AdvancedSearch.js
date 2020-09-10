import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Button,
  Label,
  Input,
  CustomInput
} from "reactstrap";
import Select from "react-select";

import IntlMessages from "../../helpers/IntlMessages";
import CustomSelectInput from "../../components/common/CustomSelectInput";

const selectData = [
  { label: "Chocolate", value: "chocolate", key: 0 },
  { label: "Vanilla", value: "vanilla", key: 1 },
  { label: "Strawberry", value: "strawberry", key: 2 },
  { label: "Caramel", value: "caramel", key: 3 },
  { label: "Cookies and Cream", value: "cookiescream", key: 4 },
  { label: "Peppermint", value: "peppermint", key: 5 }
];

const selectDataType = [
  { label: "Cake", value: "cake", key: 0 },
  { label: "Cupcake", value: "cupcake", key: 1 },
  { label: "Dessert", value: "dessert", key: 2 }
];

export default class AdvancedSearch extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);

    this.state = {
      selectedOptions: [],
      selectedOptionsType: []
    };
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };

  handleChangeType = selectedOptionsType => {
    this.setState({ selectedOptionsType });
  };
  render() {
    const { messages } = this.props;
    return (
      <Card className="dashboard-search">
        <CardBody>
          <CardTitle className="text-white">
            <IntlMessages id="dashboards.advanced-search" />
          </CardTitle>
          <Form className="form-container">
            <FormGroup>
              <label>
                <IntlMessages id="dashboards.toppings" />
              </label>
              <Select
                components={{ Input: CustomSelectInput }}
                className="react-select"
                classNamePrefix="react-select"
                name="form-field-name"
                value={this.state.selectedOption}
                onChange={this.handleChange}
                options={selectData}
              />
            </FormGroup>
            <FormGroup>
              <label>
                <IntlMessages id="dashboards.type" />
              </label>
              <Select
                components={{ Input: CustomSelectInput }}
                className="react-select"
                classNamePrefix="react-select"
                name="form-field-name"
                value={this.state.selectedOptionType}
                onChange={this.handleChangeType}
                options={selectDataType}
              />
            </FormGroup>
            <FormGroup>
              <Label>
                <IntlMessages id="dashboards.keyword" />
              </Label>
              <Input type="text" placeholder={messages["dashboards.keyword"]} />
            </FormGroup>
            <FormGroup>
              <CustomInput
                type="checkbox"
                id="exampleCustomCheckbox"
                label="Check this custom checkbox"
              />
            </FormGroup>
            <FormGroup className="text-center">
              <Button color="primary" className="mt-4 pl-5 pr-5">
                <IntlMessages id="dashboards.search" />
              </Button>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
