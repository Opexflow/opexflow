import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { Row, Card, CardBody, CardTitle } from "reactstrap";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import IntlMessages from "../../helpers/IntlMessages";
import { Colxx } from "../../components/common/CustomBootstrap";

class DatePickerExamples extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      startDateTime: null,
      startDateRange: null,
      endDateRange: null,
      embeddedDate: moment()
    };
  }
  handleChangeEmbedded = date => {
    this.setState({
      embeddedDate: date
    });
  };

  handleChangeDate = date => {
    this.setState({
      startDate: date
    });
  };

  handleChangeDateTime = date => {
    this.setState({
      startDateTime: date
    });
  };

  handleChangeStart = date => {
    this.setState({
      startDateRange: date
    });
  };

  handleChangeEnd = date => {
    this.setState({
      endDateRange: date
    });
  };

  render() {
    const { messages } = this.props.intl;

    return (
      <Row>
        <Colxx xxs="12" xl="8" className="mb-4">
          <Card>
            <CardBody>
              <CardTitle>
                <IntlMessages id="form-components.date-picker" />
              </CardTitle>
              <label>
                <IntlMessages id="form-components.date" />
              </label>
              <div className="mb-5">
                <DatePicker
                  selected={this.state.startDate}
                  onChange={this.handleChangeDate}
                  placeholderText={messages["forms.date"]}
                />
              </div>
              <label>
                <IntlMessages id="form-components.date-range" />
              </label>
              <Row className="mb-5">
                <Colxx xxs="6">
                  <DatePicker
                    selected={this.state.startDateRange}
                    selectsStart
                    startDate={this.state.startDateRange}
                    endDate={this.state.endDateRange}
                    onChange={this.handleChangeStart}
                    placeholderText={messages["form-components.start"]}
                  />
                </Colxx>
                <Colxx xxs="6">
                  <DatePicker
                    selected={this.state.endDateRange}
                    selectsEnd
                    startDate={this.state.startDateRange}
                    endDate={this.state.endDateRange}
                    onChange={this.handleChangeEnd}
                    placeholderText={messages["form-components.end"]}
                  />
                </Colxx>
              </Row>

              <label>
                <IntlMessages id="form-components.date-with-time" />
              </label>
              <DatePicker
                className="mb-5"
                selected={this.state.startDateTime}
                onChange={this.handleChangeDateTime}
                placeholderText={messages["forms.date"]}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="LLL"
                timeCaption="Time"
              />
            </CardBody>
          </Card>
        </Colxx>

        <Colxx xxs="12" xl="4" className="mb-4">
          <Card className="h-100">
            <CardBody>
              <CardTitle>
                <IntlMessages id="form-components.embedded" />
              </CardTitle>
              <DatePicker
                calendarClassName="embedded"
                inline
                selected={this.state.embeddedDate}
                onChange={this.handleChangeEmbedded}
              />
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    );
  }
}
export default injectIntl(DatePickerExamples);
