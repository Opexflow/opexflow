import React, { Component } from 'react';
import {
    Row, Card, CardBody, CardTitle,
} from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import PopoverItem from '../../../components/common/PopoverItem';
import TooltipItem from '../../../components/common/TooltipItem';

export default class PopoverTooltipUi extends Component {
    constructor(props) {
        super(props);

        this.state = {
            popovers: [
                {
                    placement: 'top',
                    text: 'Popover on top',
                    body: 'Augue laoreet rutrum faucibus vivamus sagittis lacus vel .',
                },
                {
                    placement: 'bottom',
                    text: 'Popover on bottom',
                    body: 'Vel augue laoreet rutrum Vivamus sagittis lacus faucibus.',
                },
                {
                    placement: 'left',
                    text: 'Popover on left',
                    body: 'Lacus vel augue Vivamus sagittis laoreet rutrum faucibus.',
                },
                {
                    placement: 'right',
                    text: 'Popover on right',
                    body: 'Laoreet rutrum faucibus vivamus sagittis lacus vel augue.',
                },
            ],

            tooltips: [
                {
                    placement: 'top',
                    text: 'Tooltip on top',
                    body: 'Vivamus sagittis lacus',
                },
                {
                    placement: 'bottom',
                    text: 'Tooltip on bottom',
                    body: 'Lacus vel augue',
                },
                {
                    placement: 'left',
                    text: 'Tooltip on left',
                    body: 'Laoreet rutrum faucibus',
                },
                {
                    placement: 'right',
                    text: 'Tooltip on right',
                    body: 'Augue rutrum vel',
                },
            ],
        };
    }

    render() {
        return (
            <>
            <Row>
                  <Colxx xxs="12">
                      <Breadcrumb
                          heading="menu.popover-tooltip"
                          match={this.props.match}
                        />
                      <Separator className="mb-5" />
                    </Colxx>
                </Row>
            <Row>
                  <Colxx xxs="12">
                      <Card className="mb-4">
                          <CardBody>
                              <CardTitle>
                                  <IntlMessages id="popover-tooltip.popover" />
                                </CardTitle>

                              {this.state.popovers.map((popover, i) => <PopoverItem key={i} item={popover} id={i} />)}
                            </CardBody>
                        </Card>
                    </Colxx>
                </Row>

            <Row>
                  <Colxx xxs="12">
                      <Card className="mb-4">
                          <CardBody>
                              <CardTitle>
                                  <IntlMessages id="popover-tooltip.tooltip" />
                                </CardTitle>

                              {this.state.tooltips.map((tooltip, i) => <TooltipItem key={i} item={tooltip} id={i} />)}
                            </CardBody>
                        </Card>
                    </Colxx>
                </Row>
          </>
        );
    }
}
