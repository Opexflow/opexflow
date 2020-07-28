import React, { PureComponent } from 'react';
import { Row, Button } from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';

//parse
import { tsvParse, csvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";

//Stockchart
import Chart from './Chart';
import { TypeChooser } from "react-stockcharts/lib/helper";

export default class Start extends PureComponent {  
    constructor(props){
        super(props);
        this.state = {
            currentTicks: window.localStorage.getItem('ticks') || '5min',
            d:{
                data: [],
                open: '',
                high: '',
                low: '',
                close: '',
                volume: '',
            }
        }
    }

    componentDidMount() {
        this.getChartData(data => {
			this.setState({ data })
			console.log(data)
		})
    }

    getChartData() {
        this.loadedData || (this.loadedData = {});
        const current = this.loadedData[this.state.currentTicks];
        if (this.loadedData[this.state.currentTicks] === true) {
            return;
        } else if (current) {
/*             Chart('ticks_chart', 'updateSeries', [{
                data: this.loadedData[this.state.currentTicks].data,
            }]); */
            this.setState(this.loadedData[this.state.currentTicks]);
            return;
        } else {
            this.loadedData[this.state.currentTicks] = true;
        }

        // Костыль для локальной разработки, чтобы порты сервера и клиента разнести.
        // TODO: сделать в едином месте
        let host = `https://${window.location.host}/api/stocks/ticks/${this.state.currentTicks}`;
        if (host.indexOf('3000') !== -1) {
            // TODO: сделать в едином месте
            host = host.replace('3000', '3001').replace('https', 'http');
        }

        const x = new XMLHttpRequest();
        x.open('GET', host, true);
        x.onload = () => {
            const res = x.responseText && JSON.parse(x.responseText);

            let name;

            const data = !res || !Object.keys(res).length ? [] : res.map((t, i) => {
                // ticker, per, date, time, open, hight, low, close, vol (объём торгов)
                // SBER,5,08/07/20,12:30:00,210.6100000,210.6800000,210.4700000,210.6000000,73370
                const tick = t.split(',');

                if (!name) {
                    name = tick[0];
                }

                if (!tick[2] || !tick[3]) {
                    return;
                }

                // console.log(`${tick[2]} ${tick[3]}`, [parseFloat(tick[4]), parseFloat(tick[5]), parseFloat(tick[6]), parseFloat(tick[7])]);
                // [Timestamp, O, H, L, C]
                return {
                    date: `${tick[2]} ${tick[3]}`,
                    open: parseFloat(tick[4]), 
                    high: parseFloat(tick[5]),
                    low: parseFloat(tick[6]),
                    close: parseFloat(tick[7]),
                    volume: parseFloat(tick[8])
                };
            })
            .filter(Boolean);
            console.log(data)
            //this.setState(this.loadedData[this.state.currentTicks]);
            this.setState({ data });

/*             Chart('ticks_chart', 'updateSeries', [{
                data
            }]); */
        };
        x.withCredentials = true;
        x.send();
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