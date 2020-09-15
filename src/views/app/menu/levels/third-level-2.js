import React, { Component } from 'react';
import { Row } from 'reactstrap';
import IntlMessages from '../../../../helpers/IntlMessages';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';

export default class ThirdLevel2 extends Component {
    render() {
        return (
          <>
              <Row>
                  <Colxx xxs="12">
                      <Breadcrumb heading="menu.third-level-2" match={this.props.match} />
                      <Separator className="mb-5" />
                    </Colxx>
                </Row>
              <Row>
                  <Colxx xxs="12" className="mb-4">
                      <p><IntlMessages id="menu.third-level-2" /></p>
                    </Colxx>
                </Row>
            </>
        );
    }
}
