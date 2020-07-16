import React, { Component, Fragment } from 'react';
import { Row } from 'reactstrap';
import Chart from 'react-apexcharts';
/* import ApexCharts from 'apexcharts'; */
import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import Button from "react-bootstrap/Button";

export default class Start extends Component {
    constructor(props) {
        super(props);

        this.state = {
            host:``,
            series: [{
                data: [
                ],
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

        };
    }

    // lastDate = 1538884800000
    // [Timestamp, O, H, L, C]
    // lastTick = [6604.98, 6606, 6604.07, 6606]
    


    componentDidMount() {
        // Костыль для локальной разработки, чтобы порты сервера и клиента разнести.
        // TODO: сделать в едином месте
        let host = `https://${window.location.host}/api/stocks/ticks`;
        let ActionLink = () => {
            host = `https://${window.location.host}/api/stocks/ticks_10min`;
        }
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

            if (res) {
                const series = this.state.series.slice(0);
                let name;

                series[0].data = res.map(t => {
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
            }
            console.log(res);
        };
        x.withCredentials = true;
        x.send();
    }
        componentDidUpdate() {
            if (this.componentDidMount.host===`https://${window.location.host}/api/stocks/ticks_10min`) {
                console.log("update")
            }
        }
        

        /*

        setInterval(() => {
            this.lastDate += 1000000;
            var h = this.lastTick[3] + 2;
            var l = this.lastTick[3] - 2;
            var c = this.lastTick[3] + 1;
            this.lastTick = [this.lastTick[3], h, l, c];

            var series = this.state.series.slice(0);
            var data = this.state.series[0].data.splice(1, 0);

            data.push({
                x: new Date(this.lastDate),
                y: this.lastTick.slice(0),
            });

            series[0].data = data;

            this.setState({ series });
        }, 5000);
        */
    

    render() {
        // console.log(this.state.series[0].data[this.state.series[0].data.length - 1]);

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
                        <Button variant="secondary" onClick={this.componentDidMount.ActionLink} size="lg">
                            1min
                        </Button>
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
