import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { Comments, FacebookProvider } from 'react-facebook';
import { Colxx, Separator } from '../../components/common/CustomBootstrap';
import Breadcrumb from '../../containers/navs/Breadcrumb';

export default class BlankPage extends Component {
    render() {
        return (
          <>
              <Row>
                  <Colxx xxs="12">
                      <Breadcrumb heading="menu.blank-page" match={this.props.match} />
                      <Separator className="mb-5" />
                    </Colxx>
                </Row>
              <Row>
                  <Colxx xxs="12" className="mb-4">
                      <FacebookProvider appId="2969806906408505">
                          <Comments href="https://opexflow.com" />
                        </FacebookProvider>
                    </Colxx>
                </Row>
            </>
        );
    }
}
