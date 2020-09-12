import React, { Component } from 'react';
import { Row } from 'reactstrap';
import Select from 'react-select';
import IntlMessages from '../../helpers/IntlMessages';
import CustomSelectInput from '../../components/common/CustomSelectInput';
import { Colxx } from '../../components/common/CustomBootstrap';

const selectData = [
    { label: 'Cake', value: 'cake', key: 0 },
    { label: 'Cupcake', value: 'cupcake', key: 1 },
    { label: 'Dessert', value: 'dessert', key: 2 },
];

export default class ReactSelectExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOptions: [],
            selectedOption: '',
        };
    }

  handleChangeMulti = selectedOptions => {
      this.setState({ selectedOptions });
  };

  handleChange = selectedOption => {
      this.setState({ selectedOption });
  };

  render() {
      return (
          <Row>
              <Colxx xxs="12" md="6" className="mb-5">
                  <label>
                      <IntlMessages id="form-components.state-single" />
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
            </Colxx>
              <Colxx xxs="12" md="6">
                  <label>
                      <IntlMessages id="form-components.state-multiple" />
                </label>
                  <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      isMulti
                      name="form-field-name"
                      value={this.state.selectedOptions}
                      onChange={this.handleChangeMulti}
                      options={selectData}
                />
            </Colxx>
        </Row>
      );
  }
}
