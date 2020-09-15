import React, { Component } from 'react';
import {
    Row,
    Card,
    CardBody,
    CardTitle,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Input,
    Label,
} from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';

export default class ModalUi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalRight: false,
            modalLarge: false,
            modalSmall: false,
            modalLong: false,
            modalBack: false,
            backdrop: true,
        };
    }

  toggle = () => {
      this.setState(prevState => ({
          modal: !prevState.modal,
      }));
  };

  toggleRight = () => {
      this.setState(prevState => ({
          modalRight: !prevState.modalRight,
      }));
  };

  toggleLarge = () => {
      this.setState(prevState => ({
          modalLarge: !prevState.modalLarge,
      }));
  };

  toggleSmall = () => {
      this.setState(prevState => ({
          modalSmall: !prevState.modalSmall,
      }));
  };

  toggleLong = () => {
      this.setState(prevState => ({
          modalLong: !prevState.modalLong,
      }));
  };

  toggleBack = () => {
      this.setState(prevState => ({
          modalBack: !prevState.modalBack,
      }));
  };

  changeBackdrop = e => {
      let { value } = e.target;
      if (value !== 'static') {
          value = JSON.parse(value);
      }
      this.setState({ backdrop: value });
  };

  toggleNestedContainer = () => {
      this.setState(prevState => ({
          modalNestedContainer: !prevState.modalNestedContainer,
      }));
  };

  toggleNested = () => {
      this.setState(prevState => ({
          nestedModal: !prevState.nestedModal,
          closeAll: false,
      }));
  };

  toggleAll = () => {
      this.setState(prevState => ({
          nestedModal: !prevState.nestedModal,
          closeAll: true,
      }));
  };

  render() {
      return (
          <>
          <Row>
                <Colxx xxs="12">
                    <Breadcrumb heading="menu.modal" match={this.props.match} />
                    <Separator className="mb-5" />
                  </Colxx>
              </Row>

          <Row>
                <Colxx xxs="12">
                    <Card className="mb-4">
                        <CardBody>
                            <CardTitle>
                                <IntlMessages id="modal.basic" />
                              </CardTitle>
                            <div>
                                <Button color="primary" outline onClick={this.toggle}>
                                    <IntlMessages id="modal.launch-demo-modal" />
                                  </Button>
                                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                                    <ModalHeader toggle={this.toggle}>
                                        <IntlMessages id="modal.modal-title" />
                                      </ModalHeader>
                                    <ModalBody>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                        sed do eiusmod tempor incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit in voluptate velit
                                        esse cillum dolore eu fugiat nulla pariatur. Excepteur
                                        sint occaecat cupidatat non proident, sunt in culpa qui
                                        officia deserunt mollit anim id est laborum.
                                      </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onClick={this.toggle}>
                                            Do Something
                                          </Button>
                                          {' '}
                                        <Button color="secondary" onClick={this.toggle}>
                                            Cancel
                                          </Button>
                                      </ModalFooter>
                                  </Modal>
                              </div>
                          </CardBody>
                      </Card>

                    <Card className="mb-4">
                        <CardBody>
                            <CardTitle>
                                <IntlMessages id="modal.scrolling-long-content" />
                              </CardTitle>
                            <div>
                                <Button color="primary" outline onClick={this.toggleLong}>
                                    <IntlMessages id="modal.launch-demo-modal" />
                                  </Button>
                                <Modal isOpen={this.state.modalLong} toggle={this.toggleLong}>
                                    <ModalHeader toggle={this.toggleLong}>
                                        Modal title
                                      </ModalHeader>
                                    <ModalBody>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Fusce in ex imperdiet magna dignissim porta in vel ipsum.
                                        Cras et lectus vel magna eleifend faucibus. Proin aliquam
                                        fermentum lacus, sit amet molestie ante aliquet nec. Nunc
                                        interdum, ante non lobortis feugiat, quam quam ornare
                                        nunc, tempus dictum neque odio sed augue. Suspendisse
                                        tincidunt tristique laoreet. Orci varius natoque penatibus
                                        et magnis dis parturient montes, nascetur ridiculus mus.
                                        Aenean condimentum est sit amet justo semper molestie.
                                        Integer placerat nulla id tortor molestie, sed laoreet est
                                        ornare. Morbi non velit nec purus accumsan commodo et sed
                                        nisi. Maecenas sit amet purus scelerisque neque luctus
                                        congue.
                                          <br />
                                          {' '}
                                        Nam consequat nunc neque, nec bibendum ante mollis
                                        nec. Cras porta ante a ex condimentum imperdiet. Cras
                                        vehicula velit in erat semper, sed bibendum ligula
                                        vehicula. Fusce hendrerit orci arcu, ut posuere dui
                                        volutpat at. Vivamus condimentum porttitor ultricies.
                                        Quisque at metus sit amet ipsum convallis lacinia. Nulla
                                        elementum ligula eget velit viverra condimentum.
                                        Vestibulum pulvinar enim mattis pharetra tristique. Donec
                                        hendrerit vitae lorem at malesuada. Lorem ipsum dolor sit
                                        amet, consectetur adipiscing elit. Nulla a diam eu sem
                                        gravida ultrices.
<br />
                                          {' '}
                                        Nam consequat nunc neque, nec bibendum ante mollis
                                        nec. Cras porta ante a ex condimentum imperdiet. Cras
                                        vehicula velit in erat semper, sed bibendum ligula
                                        vehicula. Fusce hendrerit orci arcu, ut posuere dui
                                        volutpat at. Vivamus condimentum porttitor ultricies.
                                        Quisque at metus sit amet ipsum convallis lacinia. Nulla
                                        elementum ligula eget velit viverra condimentum.
                                        Vestibulum pulvinar enim mattis pharetra tristique. Donec
                                        hendrerit vitae lorem at malesuada. Lorem ipsum dolor sit
                                        amet, consectetur adipiscing elit. Nulla a diam eu sem
                                        gravida ultrices.<br />
                                          {' '}
                                        Nam consequat nunc neque, nec
                                        bibendum ante mollis nec. Cras porta ante a ex condimentum
                                        imperdiet. Cras vehicula velit in erat semper, sed
                                        bibendum ligula vehicula. Fusce hendrerit orci arcu, ut
                                        posuere dui volutpat at. Vivamus condimentum porttitor
                                        ultricies. Quisque at metus sit amet ipsum convallis
                                        lacinia. Nulla elementum ligula eget velit viverra
                                        condimentum. Vestibulum pulvinar enim mattis pharetra
                                        tristique. Donec hendrerit vitae lorem at malesuada. Lorem
                                        ipsum dolor sit amet, consectetur adipiscing elit. Nulla a
                                        diam eu sem gravida ultrices.<br />
                                          {' '}
                                        Nam consequat nunc
                                        neque, nec bibendum ante mollis nec. Cras porta ante a ex
                                        condimentum imperdiet. Cras vehicula velit in erat semper,
                                        sed bibendum ligula vehicula. Fusce hendrerit orci arcu,
                                        ut posuere dui volutpat at. Vivamus condimentum porttitor
                                        ultricies. Quisque at metus sit amet ipsum convallis
                                        lacinia. Nulla elementum ligula eget velit viverra
                                        condimentum. Vestibulum pulvinar enim mattis pharetra
                                        tristique. Donec hendrerit vitae lorem at malesuada. Lorem
                                        ipsum dolor sit amet, consectetur adipiscing elit. Nulla a
                                        diam eu sem gravida ultrices.<br />
                                          {' '}
                                        Nam consequat nunc
                                        neque, nec bibendum ante mollis nec. Cras porta ante a ex
                                        condimentum imperdiet. Cras vehicula velit in erat semper,
                                        sed bibendum ligula vehicula. Fusce hendrerit orci arcu,
                                        ut posuere dui volutpat at. Vivamus condimentum porttitor
                                        ultricies. Quisque at metus sit amet ipsum convallis
                                        lacinia. Nulla elementum ligula eget velit viverra
                                        condimentum. Vestibulum pulvinar enim mattis pharetra
                                        tristique. Donec hendrerit vitae lorem at malesuada. Lorem
                                        ipsum dolor sit amet, consectetur adipiscing elit. Nulla a
                                        diam eu sem gravida ultrices.<br />
                                          {' '}
                                        Nam consequat nunc
                                        neque, nec bibendum ante mollis nec. Cras porta ante a ex
                                        condimentum imperdiet. Cras vehicula velit in erat semper,
                                        sed bibendum ligula vehicula. Fusce hendrerit orci arcu,
                                        ut posuere dui volutpat at. Vivamus condimentum porttitor
                                        ultricies. Quisque at metus sit amet ipsum convallis
                                        lacinia. Nulla elementum ligula eget velit viverra
                                        condimentum. Vestibulum pulvinar enim mattis pharetra
                                        tristique. Donec hendrerit vitae lorem at malesuada. Lorem
                                        ipsum dolor sit amet, consectetur adipiscing elit. Nulla a
                                        diam eu sem gravida ultrices.<br />
                                          {' '}
                                        Nam consequat nunc
                                        neque, nec bibendum ante mollis nec. Cras porta ante a ex
                                        condimentum imperdiet. Cras vehicula velit in erat semper,
                                        sed bibendum ligula vehicula. Fusce hendrerit orci arcu,
                                        ut posuere dui volutpat at. Vivamus condimentum porttitor
                                        ultricies. Quisque at metus sit amet ipsum convallis
                                        lacinia. Nulla elementum ligula eget velit viverra
                                        condimentum. Vestibulum pulvinar enim mattis pharetra
                                        tristique. Donec hendrerit vitae lorem at malesuada. Lorem
                                        ipsum dolor sit amet, consectetur adipiscing elit. Nulla a
                                        diam eu sem gravida ultrices.<br />
                                          {' '}
                                        Nam consequat nunc
                                        neque, nec bibendum ante mollis nec. Cras porta ante a ex
                                        condimentum imperdiet. Cras vehicula velit in erat semper,
                                        sed bibendum ligula vehicula. Fusce hendrerit orci arcu,
                                        ut posuere dui volutpat at. Vivamus condimentum porttitor
                                        ultricies. Quisque at metus sit amet ipsum convallis
                                        lacinia. Nulla elementum ligula eget velit viverra
                                        condimentum. Vestibulum pulvinar enim mattis pharetra
                                        tristique. Donec hendrerit vitae lorem at malesuada. Lorem
                                        ipsum dolor sit amet, consectetur adipiscing elit. Nulla a
                                        diam eu sem gravida ultrices.<br />
                                          {' '}
                                        Nam consequat nunc
                                        neque, nec bibendum ante mollis nec. Cras porta ante a ex
                                        condimentum imperdiet. Cras vehicula velit in erat semper,
                                        sed bibendum ligula vehicula. Fusce hendrerit orci arcu,
                                        ut posuere dui volutpat at. Vivamus condimentum porttitor
                                        ultricies. Quisque at metus sit amet ipsum convallis
                                        lacinia. Nulla elementum ligula eget velit viverra
                                        condimentum. Vestibulum pulvinar enim mattis pharetra
                                        tristique. Donec hendrerit vitae lorem at malesuada. Lorem
                                        ipsum dolor sit amet, consectetur adipiscing elit. Nulla a
                                        diam eu sem gravida ultrices.<br />
                                          {' '}
                                        Nam consequat nunc
                                        neque, nec bibendum ante mollis nec. Cras porta ante a ex
                                        condimentum imperdiet. Cras vehicula velit in erat semper,
                                        sed bibendum ligula vehicula. Fusce hendrerit orci arcu,
                                        ut posuere dui volutpat at. Vivamus condimentum porttitor
                                        ultricies. Quisque at metus sit amet ipsum convallis
                                        lacinia. Nulla elementum ligula eget velit viverra
                                        condimentum. Vestibulum pulvinar enim mattis pharetra
                                        tristique. Donec hendrerit vitae lorem at malesuada. Lorem
                                        ipsum dolor sit amet, consectetur adipiscing elit. Nulla a
                                        diam eu sem gravida ultrices.
</ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onClick={this.toggleLong}>
                                            Do Something
                                          </Button>
                                          {' '}
                                        <Button color="secondary" onClick={this.toggleLong}>
                                            Cancel
                                          </Button>
                                      </ModalFooter>
                                  </Modal>
                              </div>
                          </CardBody>
                      </Card>

                    <Card className="mb-4">
                        <CardBody>
                            <CardTitle>
                                <IntlMessages id="modal.backdrop" />
                              </CardTitle>
                            <div>
                                <FormGroup className="mr-2">
                                    <Label for="backdrop">
                                        <IntlMessages id="modal.backdrop-value" />
                                      </Label>
                                    <Input
                                        type="select"
                                        name="backdrop"
                                        id="backdrop"
                                        onChange={this.changeBackdrop}
                                      >
                                        <option value="true">true</option>
                                        <option value="false">false</option>
                                        <option value="static">"static"</option>
                                      </Input>
                                  </FormGroup>

                                <Button color="primary" outline onClick={this.toggleBack}>
                                    <IntlMessages id="modal.launch-demo-modal" />
                                  </Button>
                                <Modal
                                    isOpen={this.state.modalBack}
                                    toggle={this.toggleBack}
                                    backdrop={this.state.backdrop}
                                  >
                                    <ModalHeader toggle={this.toggleBack}>
                                        Modal title
                                      </ModalHeader>
                                    <ModalBody>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                        sed do eiusmod tempor incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit in voluptate velit
                                        esse cillum dolore eu fugiat nulla pariatur. Excepteur
                                        sint occaecat cupidatat non proident, sunt in culpa qui
                                        officia deserunt mollit anim id est laborum.
                                      </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onClick={this.toggleBack}>
                                            Do Something
                                          </Button>
                                          {' '}
                                        <Button color="secondary" onClick={this.toggleBack}>
                                            Cancel
                                          </Button>
                                      </ModalFooter>
                                  </Modal>
                              </div>
                          </CardBody>
                      </Card>

                    <Card className="mb-4">
                        <CardBody>
                            <CardTitle>
                                <IntlMessages id="modal.right-modal" />
                              </CardTitle>
                            <div>
                                <Button color="primary" outline onClick={this.toggleRight}>
                                    <IntlMessages id="modal.launch-right-modal" />
                                  </Button>
                                <Modal
                                    isOpen={this.state.modalRight}
                                    toggle={this.toggleRight}
                                    wrapClassName="modal-right"
                                  >
                                    <ModalHeader toggle={this.toggleRight}>
                                        Modal title
                                      </ModalHeader>
                                    <ModalBody>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                        sed do eiusmod tempor incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit in voluptate velit
                                        esse cillum dolore eu fugiat nulla pariatur. Excepteur
                                        sint occaecat cupidatat non proident, sunt in culpa qui
                                        officia deserunt mollit anim id est laborum.
                                      </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onClick={this.toggleRight}>
                                            Do Something
                                          </Button>
                                          {' '}
                                        <Button color="secondary" onClick={this.toggleRight}>
                                            Cancel
                                          </Button>
                                      </ModalFooter>
                                  </Modal>
                              </div>
                          </CardBody>
                      </Card>

                    <Card className="mb-4">
                        <CardBody>
                            <CardTitle>
                                <IntlMessages id="modal.nested-modal" />
                              </CardTitle>
                            <div>
                                <Button
                                    color="primary"
                                    outline
                                    onClick={this.toggleNestedContainer}
                                  >
                                    <IntlMessages id="modal.launch-demo-modal" />
                                  </Button>

                                <Modal
                                    isOpen={this.state.modalNestedContainer}
                                    toggle={this.toggleNestedContainer}
                                    className={this.props.className}
                                  >
                                    <ModalHeader toggle={this.toggleNestedContainer}>
                                        Modal title
                                      </ModalHeader>
                                    <ModalBody>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                        sed do eiusmod tempor incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit in voluptate velit
                                        esse cillum dolore eu fugiat nulla pariatur. Excepteur
                                        sint occaecat cupidatat non proident, sunt in culpa qui
                                        officia deserunt mollit anim id est laborum.
                                          <br />
                                        <div className="text-center m-2">
                                            <Button
                                                color="primary"
                                                outline
                                                onClick={this.toggleNested}
                                              >
                                                Show Nested Modal
                                              </Button>
                                          </div>
                                        <Modal
                                            isOpen={this.state.nestedModal}
                                            toggle={this.toggleNested}
                                            onClosed={
                                                  this.state.closeAll ?
                                                      this.toggleNestedContainer :
                                                      undefined
                                              }
                                          >
                                            <ModalHeader>Nested Modal title</ModalHeader>
                                            <ModalBody>Stuff and things</ModalBody>
                                            <ModalFooter>
                                                <Button color="primary" onClick={this.toggleNested}>
                                                    Done
                                                  </Button>
                                                  {' '}
                                                <Button color="secondary" onClick={this.toggleAll}>
                                                    All Done
                                                  </Button>
                                              </ModalFooter>
                                          </Modal>
                                      </ModalBody>
                                    <ModalFooter>
                                        <Button
                                            color="primary"
                                            onClick={this.toggleNestedContainer}
                                          >
                                            Do Something
                                          </Button>
                                          {' '}
                                        <Button
                                            color="secondary"
                                            onClick={this.toggleNestedContainer}
                                          >
                                            Cancel
                                          </Button>
                                      </ModalFooter>
                                  </Modal>
                              </div>
                          </CardBody>
                      </Card>

                    <Card className="mb-4">
                        <CardBody>
                            <CardTitle>
                                <IntlMessages id="modal.size" />
                              </CardTitle>
                            <div>
                                <Button
                                    className="mr-2 mb-2"
                                    color="primary"
                                    outline
                                    onClick={this.toggleLarge}
                                  >
                                    <IntlMessages id="modal.launch-large-modal" />
                                  </Button>

                                <Button
                                    className="mb-2"
                                    color="primary"
                                    outline
                                    onClick={this.toggleSmall}
                                  >
                                    <IntlMessages id="modal.launch-small-modal" />
                                  </Button>

                                <Modal
                                    isOpen={this.state.modalLarge}
                                    size="lg"
                                    toggle={this.toggleLarge}
                                  >
                                    <ModalHeader toggle={this.toggleLarge}>
                                        Modal title
                                      </ModalHeader>
                                    <ModalBody>---</ModalBody>
                                  </Modal>

                                <Modal
                                    isOpen={this.state.modalSmall}
                                    size="sm"
                                    toggle={this.toggleSmall}
                                  >
                                    <ModalHeader toggle={this.toggleSmall}>
                                        Modal title
                                      </ModalHeader>
                                    <ModalBody>---</ModalBody>
                                  </Modal>
                              </div>
                          </CardBody>
                      </Card>
                  </Colxx>
              </Row>
        </>
      );
  }
}
