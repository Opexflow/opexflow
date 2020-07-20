import React, { PureComponent } from 'react';
import { Row, Button } from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';

//Stockchart
import Chart from './Chart';
import { getData } from "./utils"

import { TypeChooser } from "react-stockcharts/lib/helper";

export default class Start extends PureComponent {  
    constructor(props) {
        super(props);
        this.state = {
            data,
            currentTicks: window.localStorage.getItem('ticks') || '5min',
        }
    }

    componentDidMount() {
        getData().then(data => {
            this.setState({ data })
        })
    }
    render() {
        if (this.state == null) {
            return <div>Loading...</div>
        }
        return (
            <>
            <Row>
                <Colxx xxs="12">
                    <Breadcrumb heading="menu.start" match={this.props.match} />
                    <Separator className="mb-5" />
              </Colxx>
          </Row>
          <Row>
                 <Colxx xxs="12" className="mb-4">
                 <p><IntlMessages id="menu.start" /></p>
                 </Colxx>
          </Row>
            <Row>
                <Colxx xxs="12" className="mb-34">
                    <Start />
              </Colxx>
          </Row>
            <TypeChooser>
                {type => <Chart type={type} data={this.state.data} />}
            </TypeChooser>
            </>
        )
    }
};
