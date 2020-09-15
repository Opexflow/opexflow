import React, { Component } from 'react';
import {
    Row, Card, CardBody, CardTitle,
} from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';

import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import { iconsmind, simplelineicons } from '../../../data/icons';

const IconGroup = ({ iconSet, setIndex }) => (
  <div className="mb-5">
      <h6 className="mb-4">{iconSet.title}</h6>
      {iconSet.icons.map((icon, index) => (
            <div className="glyph" key={setIndex + index}>
                <div className={`glyph-icon ${ icon}`} />
                <div className="class-name">{icon}</div>
        </div>
        ))}
      <div className="clearfix" />
    </div>
);

export default class IconsUi extends Component {
    render() {
        return (
            <>
            <Row>
                  <Colxx xxs="12">
                      <Breadcrumb heading="menu.icons" match={this.props.match} />
                      <Separator className="mb-5" />
                    </Colxx>
                </Row>

            <Row>
                  <Colxx xxs="12">
                      <Card className="mb-4">
                          <CardBody>
                              <CardTitle>
                                  <IntlMessages id="icons.simplelineicons" />
                                    {' '}
                                  (
{simplelineicons.length}
                                    {' '}
                                  icons)
</CardTitle>
                              <div className="simple-line-icons">
                                  {simplelineicons.map((icon, index) => (
                                        <div className="glyph" key={index}>
                                            <div className={`glyph-icon ${ icon}`} />
                                            <div className="class-name">{icon}</div>
                                    </div>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>

                      <Card className="mb-4">
                          <CardBody>
                              <CardTitle>
                                  <IntlMessages id="icons.iconsmind" />
                                </CardTitle>
                              <div className="mind-icons">
                                  {iconsmind.map((iconSet, setIndex) => (
                                        <IconGroup iconSet={iconSet} setIndex={setIndex} key={setIndex} />
                                    ))}
                                </div>
                            </CardBody>
                        </Card>
                    </Colxx>
                </Row>

          </>
        );
    }
}
