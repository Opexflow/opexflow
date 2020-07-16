import React, { PureComponent } from 'react';
import { Row, Button } from 'reactstrap';
import Chart from 'react-apexcharts';
/* import ApexCharts from 'apexcharts'; */
import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';

export default class Start extends PureComponent {    
    constructor(props) {
        super(props);

        this.state = {
            series: [{
                data: [],
            }],
            options: {
                chart: {
                    /* id: 'realtime', */
                    type: 'candlestick',
                    height: 350,
                },
                title: {
                    text: 'CandleStick Chart',
                    align: 'left',
                },
                xaxis: {
                    type: 'datetime',
                },
                yaxis: {
                    tooltip: {
                        enabled: true,
                    },
                },
            },
            // Берём данные из LS, чтобы при возврате рисовался интересующий график.
            currentTicks: window.localStorage.getItem('ticks') || '5min',
        };
    }

    // lastDate = 1538884800000
    // [Timestamp, O, H, L, C]
    // lastTick = [6604.98, 6606, 6604.07, 6606]

    componentDidMount() {
        this.getChartData();
    }

    componentDidUpdate() {
        this.getChartData();
    }

    getChartData() {
        this.loadedData || (this.loadedData = {});
        const current = this.loadedData[this.state.currentTicks];
        if (current) {
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

        /*
        {
            x: new Date(1538874000000),
            y: [6600.55, 6605, 6589.14, 6593.01],
        },
        */
        const x = new XMLHttpRequest();
        x.open('GET', host, true);
        x.onload = () => {
            const res = x.responseText && JSON.parse(x.responseText);

            const series = this.state.series.slice(0);
            let name;

            series[0].data = !res || !Object.keys(res).length ? [] : res.map(t => {
                // ticker, per, date, time, open, hight, low, close, vol (объём торгов)
                // SBER,5,08/07/20,12:30:00,210.6100000,210.6800000,210.4700000,210.6000000,73370
                const tick = t.split(',');

                if (!name) {
                    name = tick[0];
                }

                // [Timestamp, O, H, L, C]
                return {
                    x: `${tick[2] } ${ tick[3]}`,
                    y: [tick[4], tick[5], tick[6], tick[7]],
                    
                };
            });

            this.setState({
                series,
                options: {
                    ...this.state.options,
                    title: {
                        ...this.state.options.title,
                        text: name,
                    },
                },
            });

            console.log(res);
        };
        x.withCredentials = true;
        x.send();
    }

    render() {
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
                        {[
                            '1min',
                            '5min',
                            '10min',
                        ].map((t, i) => 
                            <Button
                                variant="secondary"
                                key={i}
                                onClick={() => {
                                    window.localStorage.setItem('ticks', t);
                                    this.setState({ currentTicks: t });
                                }}
                                size="lg"
                            >
                                {t}
                            </Button>
                        )}
                  </Colxx>
              </Row>
                <Row>
                    <Colxx xxs="12" className="mb-34">
                        {Boolean(this.state.series[0].data.length) && (
                      <Chart
                                options={this.state.options}
                                series={this.state.series}
                                type="candlestick"
                                height={350}
                            />
                        )}
                  </Colxx>
              </Row>
          </>
        );
    }
}
