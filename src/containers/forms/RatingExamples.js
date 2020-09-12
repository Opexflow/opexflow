import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../components/common/CustomBootstrap';
import IntlMessages from '../../helpers/IntlMessages';
import Rating from '../../components/common/Rating';

export default class RatingExamples extends Component {
    render() {
        return (
            <Row>
                <Colxx xxs="12" sm="6">
                    <label>
                        <IntlMessages id="form-components.interactive" />
                  </label>
                    <Rating total={5} rating={0} onRate={rating => {}} />
              </Colxx>
                <Colxx xxs="12" sm="6">
                    <label>
                        <IntlMessages id="form-components.readonly" />
                  </label>
                    <Rating total={5} rating={5} interactive={false} />
              </Colxx>
          </Row>
        );
    }
}
