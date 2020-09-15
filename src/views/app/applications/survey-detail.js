import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Row,
    Nav,
    NavItem,
    Button,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
    TabContent,
    TabPane,
    ButtonDropdown,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { mapOrder } from '../../../helpers/Utils';

import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import QuestionBuilder from '../../../containers/applications/QuestionBuilder';

import {
    getSurveyDetail,
    deleteSurveyQuestion,
    saveSurvey,
} from '../../../redux/actions';
import SurveyQuotas from '../../../containers/applications/SurveyQuotas';
import SurveyCharts from '../../../containers/applications/SurveyCharts';
import SurveyDetailApplicationMenu from '../../../containers/applications/SurveyDetailApplicationMenu';
import SurveyDetailCard from '../../../components/applications/SurveyDetailCard';

const surveyData = [];

class SurveyDetailApp extends Component {
    constructor(props) {
        super(props);
        this.toggleTab = this.toggleTab.bind(this);
        this.toggleSplit = this.toggleSplit.bind(this);
        this.state = {
            activeFirstTab: '1',
            dropdownSplitOpen: false,
            surveyData,
        };
    }

    componentDidMount() {
        this.props.getSurveyDetail();
    }

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeFirstTab: tab,
            });
        }
    }

    toggleSplit() {
        this.setState(prevState => ({
            dropdownSplitOpen: !prevState.dropdownSplitOpen,
        }));
    }

    addQuestion() {
        const { survey } = this.props.surveyDetailApp;

        let nextId = 0;
        if (survey.questions.length > 0) {
            const ordered = survey.questions.slice().sort((a, b) => a.id < b.id);
            nextId = ordered[0].id + 1;
        }
        const newSurvey = { ...survey };
        newSurvey.questions.push({ id: nextId });
        this.props.saveSurvey(newSurvey);
    }

    handleSortChange(order, sortable, evt) {
        const { survey } = this.props.surveyDetailApp;
        const ordered_array = mapOrder(survey.questions, order, 'id');
        this.props.saveSurvey(ordered_array);
    }

    deleteQuestion(id) {
        this.props.deleteSurveyQuestion(id, this.props.surveyDetailApp.survey);
    }

    render() {
        const { survey, loading } = this.props.surveyDetailApp;

        return (
            <>
            <Row className="app-row survey-app">
                  <Colxx xxs="12">
                      <h1>
                          <i className="simple-icon-refresh heading-icon" />
                            {' '}
                          <span className="align-middle d-inline-block pt-1">
                              Developer Survey
                            </span>
                        </h1>
                      <div className="float-sm-right mb-2">
                          <ButtonDropdown
                              className="top-right-button top-right-button-single"
                              isOpen={this.state.dropdownSplitOpen}
                              toggle={this.toggleSplit}
                            >
                              <Button
                                  outline
                                  className="flex-grow-1"
                                  size="lg"
                                  color="primary"
                                >
                                  SAVE
                                </Button>
                              <DropdownToggle
                                  size="lg"
                                  className="pr-4 pl-4"
                                  caret
                                  outline
                                  color="primary"
                                />
                              <DropdownMenu right>
                                  <DropdownItem header>
                                      <IntlMessages id="survey.delete" />
                                    </DropdownItem>
                                  <DropdownItem disabled>
                                      <IntlMessages id="survey.edit" />
                                    </DropdownItem>
                                </DropdownMenu>
                            </ButtonDropdown>
                        </div>

                      <Breadcrumb match={this.props.match} />
                      {loading ? (
                          <>
                                <Nav tabs className="separator-tabs ml-0 mb-5">
                                    <NavItem>
                                        <NavLink
                                            className={classnames({
                                                active: this.state.activeFirstTab === '1',
                                                'nav-link': true,
                                            })}
                                            onClick={() => {
                                                this.toggleTab('1');
                                            }}
                                            to="#"
                                      >
                                          DETAILS
                                      </NavLink>
                                  </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({
                                                active: this.state.activeFirstTab === '2',
                                                'nav-link': true,
                                            })}
                                            onClick={() => {
                                                this.toggleTab('2');
                                            }}
                                            to="#"
                                      >
                                          RESULTS
                                      </NavLink>
                                  </NavItem>
                            </Nav>

                                <TabContent activeTab={this.state.activeFirstTab}>
                                    <TabPane tabId="1">
                                        <Row>
                                            <SurveyDetailCard survey={survey} />

                                            <Colxx xxs="12" lg="8">
                                                <ul className="list-unstyled mb-4">
                                                    {survey.questions.map((item, index) => (
                                                    <li data-id={item.id} key={item.id}>
                                                          <QuestionBuilder
                                                              order={index}
                                                              {...item}
                                                              expanded={!item.title && true}
                                                              deleteClick={id => {
                                                                    this.deleteQuestion(id);
                                                                }}
                                                            />
                                                        </li>
                                                    ))}
                                              </ul>

                                                <div className="text-center">
                                                    <Button
                                                        outline
                                                        color="primary"
                                                        className="mt-3"
                                                        onClick={() => this.addQuestion()}
                                                  >
                                                        <i className="simple-icon-plus btn-group-icon" />
                                                    {' '}
                                                    Add Question
                                                    </Button>
                                              </div>
                                          </Colxx>
                                      </Row>
                                  </TabPane>
                                    <TabPane tabId="2">
                                        <Row>
                                            <SurveyQuotas />
                                            <SurveyCharts />
                                      </Row>
                                  </TabPane>
                            </TabContent>
                            </>
                        ) : (
                          <div className="loading" />
                        )}
                    </Colxx>
                </Row>
            <SurveyDetailApplicationMenu />
          </>
        );
    }
}

const mapStateToProps = ({ surveyDetailApp }) => ({
    surveyDetailApp,
});
export default connect(
    mapStateToProps,
    {
        getSurveyDetail,
        deleteSurveyQuestion,
        saveSurvey,
    },
)(SurveyDetailApp);
