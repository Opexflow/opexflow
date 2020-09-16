import React, { Component } from 'react';
import { Row, Button } from 'reactstrap';
import Chart from 'react-apexcharts';
import ApexCharts from 'apexcharts';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import IconCard from '../../../components/cards/IconCard';
import Logs from '../../../containers/dashboards/Logs'
import { main } from './sber/train'

export default class Sber extends Component {    
    constructor(props) {
        super(props);

        this.state = {
            balance: 10000,
            stocks: 0,
            maxBuyStocks: 40,
            lastStockPrice: 0,
            commission: 0.05,
            logs: [],

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

    resetState() {
        this.setState({
            balance: 10000,
            stocks: 0,
            maxBuyStocks: 40,
            lastStockPrice: 0,
            commission: 0.05,
            logs: [],
        });
    }

    // lastDate = 1538884800000
    // [Timestamp, O, H, L, C]
    // lastTick = [6604.98, 6606, 6604.07, 6606]

    componentDidMount() {
        this.getChartData();
        this.resetState();
    }

    componentDidUpdate() {
        if(!this.state.interactive) {
            // this.getChartData();
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
                    return false;
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

            // ApexCharts.exec('ticks_chart', 'updateSeries', [{
            //     data: series[0].data,
            // }]);
        };
        x.withCredentials = true;
        x.send();
    }

    render() {
        const stockPrice = this.state.series[0].data.length && this.state.series[0].data[this.state.series[0].data.length-1].y[1];
        const time = this.state.series[0].data.length && this.state.series[0].data[this.state.series[0].data.length-1].x;

        return (
            <>
                <Row>
                    <Colxx xxs="12">
                        {this.props.match && <Breadcrumb heading="menu.start" match={this.props.match} />}
                        <Separator className="mb-5" />
                  </Colxx>
              </Row>
                <Row>
                    {/* <Colxx xxs="12" className="mb-4">
                        <p><IntlMessages id="menu.start" /></p>
                        {[
                            '5min',
                        ].map((t, i) => 
                            <Button
                                variant="secondary"
                                key={i}
                                onClick={() => {
                                    window.localStorage.setItem('ticks', t);
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
                  </Colxx> */}
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
              <IconCard
                    title="Balance"
                    icon=""
                    value={this.state.balance.toFixed(2)}
                  />
              <IconCard
                    title="Balance with stocks"
                    icon=""
                    value={(this.state.balance + this.state.stocks * stockPrice).toFixed(2)}
                  />
              <IconCard
                    title="Stocks delta"
                    icon=""
                    value={(this.state.stocks * stockPrice - this.state.stocks * this.state.lastStockPrice).toFixed(2)}
                  />
              <IconCard
                    title="Current price"
                    icon=""
                    value={stockPrice}
                  />
                <IconCard
                    title="Stocks count"
                    icon=""
                    value={this.state.stocks}
                  />
                <IconCard
                    title="Commission"
                    icon=""
                    value={this.state.commission}
                  />
                </Row>
                <Row><br/></Row>
                <Row>
              {!this.state.inProgress && <Button
                    variant="secondary"
                    onClick={() => {
                        let data;

                        this._savedData = data = this.state.series[0].data.slice(0);
                        let i = 1;
                        this._interval = window.setInterval(() => {
                            let slicedData = data.slice(0, i);
                            let inProgress = slicedData.length !== data.length;

                            if (!inProgress) {
                                window.clearInterval(this._interval);
                            }

                            this.setState({
                                series: [
                                    {
                                        data: slicedData
                                    }
                                ],
                                inProgress
                            })
                            ++i;
                        }, 500);
                    }}
                    size="lg"
                >
                    Start
                </Button>}
                {this.state.inProgress && <Button
                    variant="secondary"
                    onClick={() => {
                        window.clearInterval(this._interval);
                        this.setState({
                            series: [
                                {
                                    data: this._savedData
                                }
                            ],
                            inProgress: false
                        })
                        // ApexCharts.exec('ticks_chart', 'updateSeries', [{
                        //     data: this.state.series[0].data
                        // }]);
                    }}
                    size="lg"
                >
                    Stop
                </Button>}
               
                {(this.state.balance >= stockPrice + this.state.commission || this.state.stocks) && (!this.state.stocks ? <Button
                    variant="secondary"
                    onClick={() => {
                       const buyStocks = parseInt(Math.min(this.state.maxBuyStocks, this.state.balance / stockPrice), 10);

                       const balance = this.state.balance - buyStocks * (stockPrice - this.state.commission);
                       const log = {
                            label: `Buy ${this.state.stocks} stock, price: ${stockPrice}`,
                            time: time
                       };

                       this.setState({
                            balance,
                            stocks: buyStocks,
                            lastStockPrice: stockPrice,
                            logs: [].concat(this.state.logs, log)
                       });
                    }}
                    size="lg"
                >
                    Buy
                </Button> :
                <Button
                    variant="secondary"
                    onClick={() => {
                        const balance = this.state.balance + this.state.stocks * (stockPrice - this.state.commission);
                        const log = {
                             label: `Sell ${this.state.stocks} stock, price: ${stockPrice}`,
                             time: time
                        };
 
                        this.setState({
                             balance,
                             stocks: 0,
                             lastStockPrice: stockPrice,
                             logs: [].concat(this.state.logs, log)
                        });
                    }}
                    size="lg"
                >
                    Sell
                </Button>)}
              </Row>
              <Row><br/></Row>
              <Row>{!this.state.botTraining ? <Button
                    variant="secondary"
                    onClick={() => {
                       this.setState({
                           botTraining: true,
                       });

                       window.trainInProgress = true;
                       main();
                    }}
                    size="lg"
                >
                    Train start
                </Button> :
                <Button
                    variant="secondary"
                    onClick={() => {
                        this.setState({
                            botTraining: false,
                        });

                        window.trainInProgress = false;
                    }}
                    size="lg"
                >
                    Train stop
                </Button>}
              </Row>
              <Row><br/></Row>
              <Row>
               <Logs logsData={this.state.logs} />
              </Row>
          </>
        );
    }
}
