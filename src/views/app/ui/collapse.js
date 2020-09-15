import React, { Component } from 'react';
import {
    Collapse,
    Button,
    Row,
    Card,
    CardSubtitle,
    CardBody,
    CardTitle,
} from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';

export default class CollapseUi extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collapse: false,
            accordion: [true, false, false],
        };
    }

  toggleAccordion = tab => {
      const prevState = this.state.accordion;
      const state = prevState.map((x, index) => (tab === index ? !x : false));
      this.setState({
          accordion: state,
      });
  };

  toggle = () => {
      this.setState({ collapse: !this.state.collapse });
  };

  render() {
      return (
          <>
          <Row>
                <Colxx xxs="12">
                    <Breadcrumb heading="menu.collapse" match={this.props.match} />
                    <Separator className="mb-5" />
                  </Colxx>
              </Row>

          <Row className="mb-4">
                <Colxx xxs="12">
                    <Card>
                        <CardBody>
                            <CardTitle>
                                <IntlMessages id="collapse.basic" />
                              </CardTitle>
                            <CardSubtitle>
                                <IntlMessages id="collapse.controlled" />
                              </CardSubtitle>

                            <Button color="primary" onClick={this.toggle} className="mb-1">
                                <IntlMessages id="collapse.toggle" />
                              </Button>
                            <Collapse isOpen={this.state.collapse}>
                                <div className="p-4 border mt-4">
                                    <p className="mb-0">
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life
                                        accusamus terry richardson ad squid. Nihil anim keffiyeh
                                        helvetica, craft beer labore wes anderson cred nesciunt
                                        sapiente ea proident. Anim pariatur cliche reprehenderit,
                                        enim eiusmod high life accusamus terry richardson ad
                                        squid.
                                      </p>
                                  </div>
                              </Collapse>
                          </CardBody>
                      </Card>
                  </Colxx>
              </Row>

          <Row>
                <Colxx xxs="12" className="mb-4">
                    <Card>
                        <CardBody>
                            <CardTitle>
                                <IntlMessages id="collapse.accordion" />
                              </CardTitle>
                            <>
                                  <div className="border">
                                      <Button
                                          block
                                          color="link"
                                          className="text-left"
                                          onClick={() => this.toggleAccordion(0)}
                                          aria-expanded={this.state.accordion[0]}
                                    >
                                        Collapsible Group Item #1
                                    </Button>
                                      <Collapse isOpen={this.state.accordion[0]}>
                                          <div className="p-4">
                                          1. Anim pariatur cliche reprehenderit, enim eiusmod high
                                          life accusamus terry richardson ad squid. 3 wolf moon
                                          officia aute, non cupidatat skateboard dolor brunch.
                                          Food truck quinoa nesciunt laborum eiusmod. Brunch 3
                                          wolf moon tempor, sunt aliqua put a bird on it squid
                                          single-origin coffee nulla assumenda shoreditch et.
                                          Nihil anim keffiyeh helvetica, craft beer labore wes
                                          anderson cred nesciunt sapiente ea proident. Ad vegan
                                          excepteur butcher vice lomo. Leggings occaecat craft
                                          beer farm-to-table, raw denim aesthetic synth nesciunt
                                          you probably haven't heard of them accusamus labore
                                          sustainable VHS.
                                          </div>
                                    </Collapse>
                              </div>
                                  <div className="border">
                                      <Button
                                          block
                                          color="link"
                                          className="text-left"
                                          onClick={() => this.toggleAccordion(1)}
                                          aria-expanded={this.state.accordion[1]}
                                    >
                                        Collapsible Group Item #2
                                    </Button>
                                      <Collapse isOpen={this.state.accordion[1]}>
                                          <div className="p-4">
                                          2. Anim pariatur cliche reprehenderit, enim eiusmod high
                                          life accusamus terry richardson ad squid. 3 wolf moon
                                          officia aute, non cupidatat skateboard dolor brunch.
                                          Food truck quinoa nesciunt laborum eiusmod. Brunch 3
                                          wolf moon tempor, sunt aliqua put a bird on it squid
                                          single-origin coffee nulla assumenda shoreditch et.
                                          Nihil anim keffiyeh helvetica, craft beer labore wes
                                          anderson cred nesciunt sapiente ea proident. Ad vegan
                                          excepteur butcher vice lomo. Leggings occaecat craft
                                          beer farm-to-table, raw denim aesthetic synth nesciunt
                                          you probably haven't heard of them accusamus labore
                                          sustainable VHS.
                                          </div>
                                    </Collapse>
                              </div>
                                  <div className="border">
                                      <Button
                                          block
                                          color="link"
                                          className="text-left"
                                          onClick={() => this.toggleAccordion(2)}
                                          aria-expanded={this.state.accordion[2]}
                                    >
                                        Collapsible Group Item #3
                                    </Button>
                                      <Collapse isOpen={this.state.accordion[2]}>
                                          <div className="p-4">
                                          3. Anim pariatur cliche reprehenderit, enim eiusmod high
                                          life accusamus terry richardson ad squid. 3 wolf moon
                                          officia aute, non cupidatat skateboard dolor brunch.
                                          Food truck quinoa nesciunt laborum eiusmod. Brunch 3
                                          wolf moon tempor, sunt aliqua put a bird on it squid
                                          single-origin coffee nulla assumenda shoreditch et.
                                          Nihil anim keffiyeh helvetica, craft beer labore wes
                                          anderson cred nesciunt sapiente ea proident. Ad vegan
                                          excepteur butcher vice lomo. Leggings occaecat craft
                                          beer farm-to-table, raw denim aesthetic synth nesciunt
                                          you probably haven't heard of them accusamus labore
                                          sustainable VHS.
                                          </div>
                                    </Collapse>
                              </div>
                              </>
                          </CardBody>
                      </Card>
                  </Colxx>
              </Row>
        </>
      );
  }
}
