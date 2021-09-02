import React, { Component } from 'react';
import {
    Row, Card, CardTitle, Button,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Colxx } from '../../components/common/CustomBootstrap';
import IntlMessages from '../../helpers/IntlMessages';

class MPChatError extends Component {
    componentDidMount() {
        document.body.classList.add('background');
    }

    componentWillUnmount() {
        document.body.classList.remove('background');
    }

    render() {
        return (
            <>
              <div style={{margin: '130px'}}>
                <div className="fixed-background" />
                <main>
                      <div className="container">
                          <Row className="h-100">
                              <Colxx xxs="12" md="10" className="mx-auto my-auto">
                                  <Card className="auth-card">
                                      <div className="position-relative image-side ">

                                          <p className="lead text-white">
                                              <IntlMessages id="dashboards.magic-is-in-the-details" />
                                            </p>

                                          <p className="white mb-0">
                                              <IntlMessages id="dashboards.yes-it-is-indeed" />
                                            </p>

                                        </div>
                                      <div className="form-side">
                                          <NavLink to="/" className="white">
                                              <span className="logo-single" />
                                            </NavLink>
                                          <CardTitle className="mb-4">
                                              <IntlMessages id="marketplace.no-chat-error-title" />
                                            </CardTitle>
                                          <p className="mb-0 text-muted text-small mb-0">
                                              <IntlMessages id="marketplace.error-code" />
                                            </p>
                                          <p className="display-1 font-weight-bold mb-5">404</p>
                                          <Button
                                              href="/app/applications/marketplace"
                                              color="primary"
                                              className="btn-shadow"
                                              size="lg"
                                            >
                                              <IntlMessages id="pages.go-back-home" />
                                            </Button>
                                        </div>
                                    </Card>
                                </Colxx>
                            </Row>
                        </div>
                    </main>
              </div>
          </>
        );
    }
}
export default MPChatError;
