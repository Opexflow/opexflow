import React, { Component } from 'react';
import {
    Row,
    Card,
    CardBody,
    CardTitle,
    Dropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
    ButtonDropdown,
    Button,
    CardSubtitle,
    UncontrolledDropdown,
} from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import IntlMessages from '../../../helpers/IntlMessages';

export default class DropDownsUi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownBasicOpen: false,
            dropdownSplitOpen: false,
            isOpenSizingLg: false,
            isOpenSizingSm: false,
            isOpenSizingXs: false,
            dropdownSplitOpenUp: false,
            dropdownSplitOpenRight: false,
            dropdownSplitOpenLeft: false,
        };
    }

  toggleBasic = () => {
      this.setState(prevState => ({
          dropdownBasicOpen: !prevState.dropdownBasicOpen,
      }));
  };

  toggleSplit = () => {
      this.setState(prevState => ({
          dropdownSplitOpen: !prevState.dropdownSplitOpen,
      }));
  };

  toggleSizingLg = () => {
      this.setState(prevState => ({
          isOpenSizingLg: !prevState.isOpenSizingLg,
      }));
  };

  toggleSizingSm = () => {
      this.setState(prevState => ({
          isOpenSizingSm: !prevState.isOpenSizingSm,
      }));
  };

  toggleSizingXs = () => {
      this.setState(prevState => ({
          isOpenSizingXs: !prevState.isOpenSizingXs,
      }));
  };

  render() {
      return (
          <>
          <Row>
                <Colxx xxs="12">
                    <Breadcrumb heading="menu.dropdowns" match={this.props.match} />
                    <Separator className="mb-5" />
                  </Colxx>
              </Row>
          <Row className="mb-4">
                <Colxx xxs="12">
                    <Card>
                        <CardBody>
                            <CardTitle>
                                <IntlMessages id="dropdowns.basic" />
                              </CardTitle>
                            <CardSubtitle>
                                <IntlMessages id="dropdowns.controlled" />
                              </CardSubtitle>
                            <Dropdown
                                isOpen={this.state.dropdownBasicOpen}
                                toggle={this.toggleBasic}
                                className="mb-5"
                              >
                                <DropdownToggle caret color="secondary" outline>
                                    <IntlMessages id="dropdowns.dropdown" />
                                  </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem header>
                                        <IntlMessages id="dropdowns.header" />
                                      </DropdownItem>
                                    <DropdownItem disabled>
                                        <IntlMessages id="dropdowns.action" />
                                      </DropdownItem>
                                    <DropdownItem>
                                        <IntlMessages id="dropdowns.another-action" />
                                      </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <IntlMessages id="dropdowns.another-action" />
                                      </DropdownItem>
                                  </DropdownMenu>
                              </Dropdown>

                            <CardSubtitle>
                                <IntlMessages id="dropdowns.uncontrolled" />
                              </CardSubtitle>
                            <UncontrolledDropdown>
                                <DropdownToggle caret color="secondary" outline>
                                    <IntlMessages id="dropdowns.dropdown" />
                                  </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem header>
                                        <IntlMessages id="dropdowns.header" />
                                      </DropdownItem>
                                    <DropdownItem disabled>
                                        <IntlMessages id="dropdowns.action" />
                                      </DropdownItem>
                                    <DropdownItem>
                                        <IntlMessages id="dropdowns.another-action" />
                                      </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <IntlMessages id="dropdowns.another-action" />
                                      </DropdownItem>
                                  </DropdownMenu>
                              </UncontrolledDropdown>
                          </CardBody>
                      </Card>
                  </Colxx>
              </Row>

          <Row className="mb-4">
                <Colxx xxs="12">
                    <Card>
                        <CardBody>
                            <CardTitle>
                                <IntlMessages id="dropdowns.split-button" />
                              </CardTitle>
                            <ButtonDropdown
                                isOpen={this.state.dropdownSplitOpen}
                                toggle={this.toggleSplit}
                              >
                                <Button color="secondary">
                                    <IntlMessages id="dropdowns.action" />
                                  </Button>
                                <DropdownToggle caret color="secondary" />
                                <DropdownMenu>
                                    <DropdownItem header>
                                        <IntlMessages id="dropdowns.header" />
                                      </DropdownItem>
                                    <DropdownItem disabled>
                                        <IntlMessages id="dropdowns.action" />
                                      </DropdownItem>
                                    <DropdownItem>
                                        <IntlMessages id="dropdowns.another-action" />
                                      </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <IntlMessages id="dropdowns.another-action" />
                                      </DropdownItem>
                                  </DropdownMenu>
                              </ButtonDropdown>
                          </CardBody>
                      </Card>
                  </Colxx>
              </Row>

          <Row className="mb-4">
                <Colxx xxs="12">
                    <Card>
                        <CardBody>
                            <CardTitle>
                                <IntlMessages id="dropdowns.sizing" />
                              </CardTitle>
                            <ButtonDropdown
                                className="mr-1 mb-1"
                                isOpen={this.state.isOpenSizingLg}
                                toggle={this.toggleSizingLg}
                              >
                                <DropdownToggle caret size="lg" outline color="info">
                                    <IntlMessages id="dropdowns.large-button" />
                                  </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>
                                        <IntlMessages id="dropdowns.another-action" />
                                      </DropdownItem>
                                    <DropdownItem>
                                        <IntlMessages id="dropdowns.another-action" />
                                      </DropdownItem>
                                  </DropdownMenu>
                              </ButtonDropdown>

                            <ButtonDropdown
                                className="mr-1 mb-1"
                                isOpen={this.state.isOpenSizingSm}
                                toggle={this.toggleSizingSm}
                              >
                                <DropdownToggle caret size="sm" outline color="info">
                                    <IntlMessages id="dropdowns.small-button" />
                                  </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>
                                        <IntlMessages id="dropdowns.another-action" />
                                      </DropdownItem>
                                    <DropdownItem>
                                        <IntlMessages id="dropdowns.another-action" />
                                      </DropdownItem>
                                  </DropdownMenu>
                              </ButtonDropdown>

                            <ButtonDropdown
                                className="mr-1 mb-1"
                                isOpen={this.state.isOpenSizingXs}
                                toggle={this.toggleSizingXs}
                              >
                                <DropdownToggle caret size="xs" outline color="info">
                                    <IntlMessages id="dropdowns.small-button" />
                                  </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>
                                        <IntlMessages id="dropdowns.another-action" />
                                      </DropdownItem>
                                    <DropdownItem>
                                        <IntlMessages id="dropdowns.another-action" />
                                      </DropdownItem>
                                  </DropdownMenu>
                              </ButtonDropdown>
                          </CardBody>
                      </Card>
                  </Colxx>
              </Row>

          <Row className="mb-4">
                <Colxx xxs="12">
                    <Card>
                        <CardBody>
                            <CardTitle>
                                <IntlMessages id="dropdowns.drop-directions" />
                              </CardTitle>
                            <ButtonDropdown
                                direction="up"
                                className="mr-1 mb-5"
                                isOpen={this.state.btnDropup}
                                toggle={() => {
                                      this.setState({ btnDropup: !this.state.btnDropup });
                                  }}
                              >
                                <DropdownToggle caret>
                                    <IntlMessages id="dropdowns.dropup" />
                                  </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>
                                        <IntlMessages id="dropdowns.another-action" />
                                      </DropdownItem>
                                    <DropdownItem>
                                        <IntlMessages id="dropdowns.another-action" />
                                      </DropdownItem>
                                  </DropdownMenu>
                              </ButtonDropdown>

                            <ButtonDropdown
                                direction="left"
                                className="mr-1 mb-5"
                                isOpen={this.state.btnDropleft}
                                toggle={() => {
                                      this.setState({ btnDropleft: !this.state.btnDropleft });
                                  }}
                              >
                                <DropdownToggle caret>
                                    <IntlMessages id="dropdowns.dropleft" />
                                  </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>
                                        <IntlMessages id="dropdowns.another-action" />
                                      </DropdownItem>
                                    <DropdownItem>
                                        <IntlMessages id="dropdowns.another-action" />
                                      </DropdownItem>
                                  </DropdownMenu>
                              </ButtonDropdown>

                            <ButtonDropdown
                                direction="right"
                                className="mr-1 mb-5"
                                isOpen={this.state.btnDropright}
                                toggle={() => {
                                      this.setState({ btnDropright: !this.state.btnDropright });
                                  }}
                              >
                                <DropdownToggle caret>
                                    <IntlMessages id="dropdowns.dropright" />
                                  </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>
                                        <IntlMessages id="dropdowns.another-action" />
                                      </DropdownItem>
                                    <DropdownItem>
                                        <IntlMessages id="dropdowns.another-action" />
                                      </DropdownItem>
                                  </DropdownMenu>
                              </ButtonDropdown>
                          </CardBody>
                      </Card>
                  </Colxx>
              </Row>

          <Row className="mb-4">
                <Colxx xxs="12">
                    <Card>
                        <CardBody>
                            <CardTitle>
                                <IntlMessages id="dropdowns.drop-directions" />
                              </CardTitle>
                            <CardSubtitle>
                                <IntlMessages id="dropdowns.left" />
                              </CardSubtitle>
                            <UncontrolledDropdown className="mb-5">
                                <DropdownToggle caret color="secondary" outline>
                                    <IntlMessages id="dropdowns.dropdown" />
                                  </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem header>
                                        <IntlMessages id="dropdowns.header" />
                                      </DropdownItem>
                                    <DropdownItem disabled>
                                        <IntlMessages id="dropdowns.action" />
                                      </DropdownItem>
                                    <DropdownItem>
                                        <IntlMessages id="dropdowns.another-action" />
                                      </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <IntlMessages id="dropdowns.another-action" />
                                      </DropdownItem>
                                  </DropdownMenu>
                              </UncontrolledDropdown>

                            <CardSubtitle>
                                <IntlMessages id="dropdowns.right" />
                              </CardSubtitle>

                            <UncontrolledDropdown>
                                <DropdownToggle caret color="secondary" outline>
                                    <IntlMessages id="dropdowns.dropdown" />
                                  </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem header>
                                        <IntlMessages id="dropdowns.header" />
                                      </DropdownItem>
                                    <DropdownItem disabled>
                                        <IntlMessages id="dropdowns.action" />
                                      </DropdownItem>
                                    <DropdownItem>
                                        <IntlMessages id="dropdowns.another-action" />
                                      </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <IntlMessages id="dropdowns.another-action" />
                                      </DropdownItem>
                                  </DropdownMenu>
                              </UncontrolledDropdown>
                          </CardBody>
                      </Card>
                  </Colxx>
              </Row>
        </>
      );
  }
}
