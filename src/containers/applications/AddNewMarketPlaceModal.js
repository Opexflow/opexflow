import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    CustomInput,
    Form,
    FormGroup,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Label,
    InputGroup,
    InputGroupAddon,
} from 'reactstrap';
import Select from 'react-select';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import CustomSelectInput from '../../components/common/CustomSelectInput';
import IntlMessages from '../../helpers/IntlMessages';

import { addMarketPlaceItem } from '../../redux/actions';

class AddNewMarketPlaceModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            detail: '',
            projectType: {},
            categoryOther: '',
            label: {},
            labelColor: '',
            category: {},
            hasBudget: false,
            budget: 0,
            status: 'PENDING',
        };
    }
  
  componentDidUpdate() {
    if(this.props.modalOpen) {
        if(!this.props.user)
            this.props.history.push('/user/login');
    }
  }

  postNewJob = (e) => {
      e.preventDefault();
      const newItem = {
          title: this.state.title,
          detail: this.state.detail,
          projectType: this.state.projectType.value,
          categoryOther: this.state.categoryOther,
          category: this.state.category.value === 'Other' ? this.state.categoryOther : this.state.category.value,
          hasBudget: this.state.hasBudget,
          budget: this.state.hasBudget ? this.state.budget : 0,
          createdByName: this.props.user.name,
          createdById: this.props.user.id,
      };

      this.props.addMarketPlaceItem(newItem);
      this.props.toggleModal();
      this.setState({
          title: '',
          detail: '',
          projectType: {},
          categoryOther: '',
          category: {},
          budget: 0,
      });
  };

  render() {
    
      const { messages } = this.props.intl;
      const { categories, projectTypes } = this.props.marketPlaceApp;
      
      const { modalOpen, toggleModal, user } = this.props;
      return (
          <Modal
              isOpen={modalOpen}
              toggle={toggleModal}
              wrapClassName="modal-right"
              backdrop="static"
        >
              <ModalHeader toggle={toggleModal}>
                  <IntlMessages id="marketPlace.add-new-title" />
            </ModalHeader>
            <Form onSubmit={(e) => this.postNewJob(e)}>
                <ModalBody>
                    <FormGroup>
                        <Label className="mt-4">
                            <IntlMessages id="marketPlace.title" />
                      </Label>
                        <Input
                            type="text"
                            required="required"
                            value={this.state.title}
                            //defaultValue={this.state.title}
                            placeholder={messages['marketPlace.title-placeholder']}
                            onChange={event => {
                                this.setState({ title: event.target.value });
                            }}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label className="mt-4">
                          <IntlMessages id="marketPlace.detail" />
                      </Label>
                      <Input
                          type="textarea"
                          required="required"
                          value={this.state.detail}
                          //defaultValue={this.state.detail}
                          placeholder={messages['marketPlace.detail-placeholder']}
                          onChange={event => {
                              this.setState({ detail: event.target.value });
                          }}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label className="mt-4">
                          <IntlMessages id="marketPlace.category" />
                      </Label>
                      <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="form-field-name"
                          options={categories.map((x, i) => ({ label: x, value: x, key: i }))}
                          value={this.state.category}
                          onChange={val => {
                              this.setState({ category: val });
                          }}
                      />
                    </FormGroup>

                    {this.state.category?.value === 'Other' ? (
                    <FormGroup>
                      <Label className="mt-4">
                            <IntlMessages id="marketPlace.category-other" />
                      </Label>
                        <Input
                            type="text"
                            defaultValue={this.state.categoryOther}
                            onChange={event => {
                                this.setState({ categoryOther: event.target.value });
                            }}
                      />
                    </FormGroup>) : null}

                    <FormGroup>
                      <Label className="mt-4">
                            <IntlMessages id="marketPlace.project-type" />
                      </Label>
                        <Select
                            components={{ Input: CustomSelectInput }}
                            className="react-select"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            options={projectTypes.map((x, i) => ({ label: x, value: x, key: i }))}
                            value={this.state.projectType}
                            onChange={val => {
                                this.setState({ projectType: val });
                            }}
                      />
                    </FormGroup>

                    <FormGroup>
                      <CustomInput
                        type="checkbox"
                        id="checkbox_has_budget"
                        name="has-budget"
                        label="has budget?"
                        defaultChecked={this.state.hasBudget}
                        onChange={event => {
                          this.setState({ hasBudget: event.target.checked });
                        }}
                      />
                    </FormGroup>

                    {this.state.hasBudget ? (
                    <FormGroup>
                      <Label className="mt-4">
                            <IntlMessages id="marketPlace.budget" />
                      </Label>
                      <InputGroup>
                      <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                      <Input
                            type="number"
                            defaultValue={this.state.title}
                            placeholder={messages['marketPlace.budget-placeholder']}
                            onChange={event => {
                                this.setState({ budget: event.target.value });
                            }}
                      />
                      </InputGroup>
                    </FormGroup>) : null
                    }

              </ModalBody>
                <ModalFooter>
                  <FormGroup>
                    <Button color="secondary" outline onClick={toggleModal}>
                        <IntlMessages id="todo.cancel" />
                  </Button>
                  </FormGroup>
                  <FormGroup>
                    <Button type="submit" color="primary" /*onClick={(e) => this.postNewJob(e)}*/>
                        <IntlMessages id="todo.submit" />
                  </Button>
                  </FormGroup>
                {' '}
              </ModalFooter>
            </Form>
        </Modal>
      );
  }
}

const mapStateToProps = ({ marketPlaceApp }) => ({
  marketPlaceApp,
});
export default withRouter(connect(
    mapStateToProps,
    {
      addMarketPlaceItem,
    },
)(injectIntl(AddNewMarketPlaceModal)));
