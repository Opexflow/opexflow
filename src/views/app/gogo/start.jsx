import React, { PureComponent } from 'react';
import { Row, Button } from 'reactstrap';
import Chart from 'react-apexcharts';
import ApexCharts from 'apexcharts';
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
                    id: 'ticks_chart',
                    type: 'candlestick',
                    height: 350,
                },
                title: {
                    text: 'CandleStick Chart',
                    align: 'left',
                },
                xaxis: {
                    // type: 'datetime',
                    type: 'numeric'
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
        if(!this.state.interactive) {
            this.getChartData();
            this.interval && window.clearInterval(this.interval);
        } else {
            if (!this.interval) {
                this.interval = window.setInterval(() => {
                    const dataBuff = this.state.dataBuff.slice(0);
                    const data = this.state.series[0].data.slice(0);
                    let nextData;

                    if (this.state.dataBuff.length) {
                        nextData = dataBuff.shift();
                        data.push(nextData);

                        this.setState({
                            dataBuff,
                            series: [{
                                data
                            }] 
                        });
                    } else {
                        window.clearInterval(this.interval);
                    }
                }, 250);
            }
        }

        if (this.state.series[0].data && this.state.series[0].data.length) {
            ApexCharts.exec('ticks_chart', 'render', [{
               data: this.state.series[0].data
            }])
        }
    }

    getHost(postfix) {
        // Костыль для локальной разработки, чтобы порты сервера и клиента разнести.
        // TODO: сделать в едином месте
        let host = `https://${window.location.host}/api/stocks/${postfix}`;
        if (host.indexOf('3000') !== -1) {
            // TODO: сделать в едином месте
            host = host.replace('3000', '3001').replace('https', 'http');
        }

        return host;
    }

    getChartData() {
        this.loadedData || (this.loadedData = {});
        const current = this.loadedData[this.state.currentTicks];
        if (this.loadedData[this.state.currentTicks] === true) {
            return;
        } else if (current) {
            ApexCharts.exec('ticks_chart', 'updateSeries', [{
                data: this.loadedData[this.state.currentTicks].series[0].data,
            }]);
            this.setState(this.loadedData[this.state.currentTicks]);
            return;
        } else {
            this.loadedData[this.state.currentTicks] = true;
        }

        /*
        {
            x: new Date(1538874000000),
            y: [6600.55, 6605, 6589.14, 6593.01],
        },
        */
        const x = new XMLHttpRequest();
        x.open('GET', this.getHost(`ticks/${this.state.currentTicks}`), true);
        x.onload = () => {
            const res = x.responseText && JSON.parse(x.responseText);

            const series = this.state.series.slice(0);
            let name;

            series[0].data = !res || !Object.keys(res).length ? [] : res.map((t, i) => {
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
                    x: `${tick[2]} ${tick[3]}`,
                    y: [parseFloat(tick[4]), parseFloat(tick[5]), parseFloat(tick[6]), parseFloat(tick[7])],
                    
                };
            })
            .filter(Boolean);

            this.loadedData[this.state.currentTicks] = {
                series,
                options: {
                    ...this.state.options,
                    title: {
                        ...this.state.options.title,
                        text: name,
                    },
                },
            };

            this.setState(this.loadedData[this.state.currentTicks]);

            ApexCharts.exec('ticks_chart', 'updateSeries', [{
                data: series[0].data,
            }]);
        };
        x.withCredentials = true;
        x.send();
    }

    render() {
        return (
            <>
                <Row>
                    <Colxx xxs="12">
                        {this.props.match && <Breadcrumb heading="menu.start" match={this.props.match} />}
                        <Separator className="mb-5" />
                  </Colxx>
              </Row>
                <Row>
                    <Colxx xxs="12" className="mb-4">
                        <p><IntlMessages id="menu.start" /></p>
                        {[
                          //  '1min',
                            '5min',
                            '10min',
                        ].map((t, i) => 
                            <Button
                                variant="secondary"
                                key={i}
                                onClick={() => {
                                    window.localStorage.setItem('ticks', t);
                                    this.interval && window.clearInterval(this.interval);
                                    this.setState({
                                        currentTicks: t,
                                        interactive: false,
                                        dataBuff: undefined,
                                    });
                                }}
                                size="lg"
                            >
                                {t}
                            </Button>
                        )}
                        <Button
                            variant="secondary"
                            onClick={() => {
                                if (!this.state.series[0].data.length || this.state.interactive) {
                                    return;
                                }

                                this.setState({
                                    interactive: true,
                                    dataBuff: this.state.series[0].data.slice(parseInt(this.state.series[0].data.length / 4, 10) + 1),
                                    series: [{
                                        data: this.state.series[0].data.slice(0, parseInt(this.state.series[0].data.length / 4, 10))
                                    }] 
                                });
                            }}
                            size="lg"
                        >
                            Interactive
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

              <Row>
              <Button
                    variant="secondary"
                    onClick={() => {
                        const price = this.state.series[0].data[this.state.series[0].data.length - 1].y[0];

                        const x = new XMLHttpRequest();
                        x.open('GET', this.getHost(`trades/buy/${price}`), true);
                        x.withCredentials = true;
                        x.send();

                        console.log('buy', price);
                    }}
                    size="lg"
                >
                    Купить
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => {
                        const price = this.state.series[0].data[this.state.series[0].data.length - 1].y[0];

                        const x = new XMLHttpRequest();
                        x.open('GET', this.getHost(`trades/sell/${price}`), true);
                        x.withCredentials = true;
                        x.send();
                    }}
                    size="lg"
                >
                    Продать
                </Button>
              </Row>
          </>
        );
    }
}
