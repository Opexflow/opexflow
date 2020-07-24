import React, { PureComponent } from 'react';
import { Row, Button } from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';

//Stockchart
import Chart from './Chart';
import  Data from "./data"
import { TypeChooser } from "react-stockcharts/lib/helper";

export default class Start extends PureComponent {  
    constructor(props){
        super(props);
        this.setState = {
            data: []
        }
    }

    componentDidMount() {
		this.getChartData().Chart(data => {
            this.setState({ data })
            console.log(data)
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
                    <TypeChooser>
                        {type => <Chart type={type} data={this.state.data} />}
                    </TypeChooser>
              </Colxx>
          </Row>
          </>
		)
	}
}
