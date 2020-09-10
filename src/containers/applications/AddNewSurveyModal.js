import React, { Component } from "react";
import { connect } from "react-redux";
import {
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label
} from "reactstrap";
import Select from "react-select";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import IntlMessages from "../../helpers/IntlMessages";

import { addSurveyItem } from "../../redux/actions";

class AddNewSurveyModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      label: {},
      labelColor: "",
      category: {},
      status: "PENDING"
    };
  }

  addNetItem = () => {
    const newItem = {
      title: this.state.title,
      label: this.state.label.value,
      labelColor: this.state.label.color,
      category: this.state.category.value,
      status: this.state.status
    };
    this.props.addSurveyItem(newItem);
    this.props.toggleModal();
    this.setState({
      title: "",
      label: {},
      category: {},
      status: "ACTIVE"
    });
  };

  render() {
    const { labels, categories } = this.props.surveyListApp;
    const { modalOpen, toggleModal } = this.props;
    return (
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-right"
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>
          <IntlMessages id="survey.add-new-title" />
        </ModalHeader>
        <ModalBody>
          <Label className="mt-4">
            <IntlMessages id="survey.title" />
          </Label>
          <Input
            type="text"
            defaultValue={this.state.title}
            onChange={event => {
              this.setState({ title: event.target.value });
            }}
          />

          <Label className="mt-4">
            <IntlMessages id="survey.category" />
          </Label>
          <Select
            components={{ Input: CustomSelectInput }}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"
            options={categories.map((x, i) => {
              return { label: x, value: x, key: i };
            })}
            value={this.state.category}
            onChange={val => {
              this.setState({ category: val });
            }}
          />
          <Label className="mt-4">
            <IntlMessages id="survey.label" />
          </Label>
          <Select
            components={{ Input: CustomSelectInput }}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"
            options={labels.map((x, i) => {
              return {
                label: x.label,
                value: x.label,
                key: i,
                color: x.color
              };
            })}
            value={this.state.label}
            onChange={val => {
              this.setState({ label: val });
            }}
          />

          <Label className="mt-4">
            <IntlMessages id="survey.status" />
          </Label>
          <CustomInput
            type="radio"
            id="exCustomRadio"
            name="customRadio"
            label="COMPLETED"
            checked={this.state.status === "COMPLETED"}
            onChange={event => {
              this.setState({
                status: event.target.value === "on" ? "COMPLETED" : "ACTIVE"
              });
            }}
          />
          <CustomInput
            type="radio"
            id="exCustomRadio2"
            name="customRadio2"
            label="ACTIVE"
            checked={this.state.status === "ACTIVE"}
            onChange={event => {
              this.setState({
                status: event.target.value !== "on" ? "COMPLETED" : "ACTIVE"
              });
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" outline onClick={toggleModal}>
            <IntlMessages id="survey.cancel" />
          </Button>
          <Button color="primary" onClick={() => this.addNetItem()}>
            <IntlMessages id="survey.submit" />
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ surveyListApp }) => {
  return {
    surveyListApp
  };
};
export default connect(
  mapStateToProps,
  {
    addSurveyItem
  }
)(AddNewSurveyModal);
