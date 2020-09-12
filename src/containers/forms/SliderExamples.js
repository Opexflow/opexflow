import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../components/common/CustomBootstrap';
import IntlMessages from '../../helpers/IntlMessages';

import { SliderTooltip, RangeTooltip } from '../../components/common/SliderTooltips';

export default class SliderExamples extends Component {
    render() {
        return (
            <Row>
                <Colxx xxs="12" sm="6">
                    <label>
                        <IntlMessages id="form-components.double-slider" />
                  </label>
                    <RangeTooltip
                        min={500}
                        max={1500}
                        className="mb-5"
                        defaultValue={[800, 1200]}
                        allowCross={false}
                        pushable={100}
                  />
              </Colxx>

                <Colxx xxs="12" sm="6">
                    <label>
                        <IntlMessages id="form-components.single-slider" />
                  </label>
                    <SliderTooltip
                        min={500}
                        max={1500}
                        defaultValue={1000}
                        className="mb-5"
                  />
              </Colxx>
          </Row>
        );
    }
}
