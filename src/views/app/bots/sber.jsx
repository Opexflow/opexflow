import React, { Component } from 'react';
import { Row, Button } from 'reactstrap';
import Chart from 'react-apexcharts';
import ApexCharts from 'apexcharts';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import IconCard from '../../../components/cards/IconCard';
import Logs from '../../../containers/dashboards/Logs'
import { main, args } from './sber/train'
import * as tf from '@tensorflow/tfjs';

import { TradeGameAgent } from './sber/trade_agent';
import { TradeGame, NUM_ACTIONS, ALL_ACTIONS, getStateTensor } from './sber/trade_game';

let game;
let qNet;

let currentQValues;
let bestAction;
let cumulativeReward = 0;
let cumulativeFruits = 0;
let autoPlaying = false;
let autoPlayIntervalJob;

/** Reset the game state. */
async function reset() {
    // if (game == null) {
    //     return;
    // }
    game.reset();
    await calcQValuesAndBestAction();

    // renderSnakeGame(gameCanvas, game,
    //     showQValuesCheckbox.checked ? currentQValues : null);
    // gameStatusSpan.textContent = 'Game started.';
    // stepButton.disabled = false;
    // autoPlayStopButton.disabled = false;
}

/** Calculate the current Q-values and the best action. */
async function calcQValuesAndBestAction() {
    // console.log('currentQValues', currentQValues);
    if (currentQValues != null) {
        return;
    }

    tf.tidy(() => {
        const stateTensor = getStateTensor(game.getState(), game.height, game.width);
        const predictOut = qNet.predict(stateTensor);
        currentQValues = predictOut.dataSync();
        bestAction = ALL_ACTIONS[predictOut.argMax(-1).dataSync()[0]];
        console.log('bestAction', bestAction, game.getState()); //bestAction, game.getState(), stateTensor, qNet, predictOut);
    });
}

function invalidateQValuesAndBestAction() {
    currentQValues = null;
    bestAction = null;
}



/**
 * Play a game for one step.
 *
 * - Use the current best action to forward one step in the game.
 * - Accumulate to the cumulative reward.
 * - Determine if the game is over and update the UI accordingly.
 * - If the game has not ended, calculate the current Q-values and best action.
 * - Render the game in the canvas.
 */
async function step() {
    // console.log('bestAction', bestAction, game);
    const {reward, done, fruitEaten} = game.step(bestAction);
    invalidateQValuesAndBestAction();
    cumulativeReward += reward;
    if (fruitEaten) {
      cumulativeFruits++;
    }
    console.log(`Reward=${cumulativeReward.toFixed(1)}; Fruits=${cumulativeFruits}`);
    if (done) {
      console.log('. Game Over!');
      cumulativeReward = 0;
      cumulativeFruits = 0;
    //   if (autoPlayIntervalJob) {
    //     clearInterval(autoPlayIntervalJob);
    //     autoPlayStopButton.click();
    //   }
    //   autoPlayStopButton.disabled = true;
    //   stepButton.disabled = true;
    }
    await calcQValuesAndBestAction();
    // renderSnakeGame(gameCanvas, game,
    //     showQValuesCheckbox.checked ? currentQValues : null);
  }


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
                stocksData: res.map(r => {
                    const tick = r.split(',');
                    if (!tick[2] || !tick[3]) {
                        return false;
                    }
    
                    // SBER,5,08/07/20,12:30:00,210.6100000,210.6800000,210.4700000,210.6000000,73370
                    // Для упрощения наблюдений увеличиваем стоимость акций, чтобы следить за целыми числами
                    return [tick[2] + ' ' + tick[3], parseInt(tick[5] * 10, 10), tick[8]];
                }).filter(Boolean)
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
              <Row>{!this.state.randomBotTraining ? <Button
                    variant="secondary"
                    onClick={() => {
                       this.setState({
                            randomBotTraining: true,
                       });

                        const game = new TradeGame({
                            stocksData: this.state.stocksData,
                            balance: 10000,
                            commission: this.state.commission,
                        });
                    
                        const agent = new TradeGameAgent(game, {
                            replayBufferSize: args.replayBufferSize,
                            epsilonInit: args.epsilonInit,
                            epsilonFinal: args.epsilonFinal,
                            epsilonDecayFrames: args.epsilonDecayFrames,
                            learningRate: args.learningRate,
                        });

                        window.randomBotTrainingInProgress = true;

                        const logs = [];
                        for (let i = 0; i < this.state.stocksData.length; ++i) {
                            if (!window.randomBotTrainingInProgress) {
                                break;
                            }
                            const stat = agent.playStep();

                            if (stat) {
                                console.log(stat.stepNum);

                                logs.push({
                                    label: `Reward: ${stat.cumulativeReward}, Balance: ${stat.balance}, moneyEarned: ${stat.moneyEarned}, positive: ${stat.positiveTradesCount}, negative: ${stat.negativeTradesCount}`,
                                    time: stat.stepNum
                                });
                            }

                            this.setState({
                                logs
                            });
                        }
                    }}
                    size="lg"
                >
                    Start random game
                </Button> :
                <Button
                    variant="secondary"
                    onClick={() => {
                        this.setState({
                            randomBotTraining: false,
                        });

                        window.randomBotTrainingInProgress = false;
                    }}
                    size="lg"
                >
                    Stop random game
                </Button>}
              </Row>
              <Row><br/></Row>

              <Row>{!this.state.botTraining ? <Button
                    variant="secondary"
                    onClick={() => {
                       this.setState({
                           botTraining: true,
                       });

                       window.trainInProgress = true;
                    //    console.log(this.state.stocksData);
                       main(this.state.stocksData, 10000, this.state.commission);
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
                <Button
                    variant="secondary"
                    onClick={() => {
                        
                        const stocksData = this.state.stocksData;
                        const commission = this.state.commission;

                        async function initGame() {
                            game = new TradeGame({
                                balance: 10000,
                                stocksData,
                                commission,
                            });
                          
                            // Warm up qNet.
                            for (let i = 0; i < 3; ++i) {
                              qNet.predict(getStateTensor(game.getState(), game.height, game.width));
                            }
                          
                            await reset();
                          
                            autoPlayIntervalJob = setInterval(() => {
                                step(game, qNet);
                            }, 250);

                            setTimeout(() => {
                                clearInterval(autoPlayIntervalJob);
                            }, 15000);

                            // stepButton.addEventListener('click', step);
                          
                            // autoPlayStopButton.addEventListener('click', () => {
                            //   if (autoPlaying) {
                            //     autoPlayStopButton.textContent = 'Auto Play';
                            //     if (autoPlayIntervalJob) {
                            //       clearInterval(autoPlayIntervalJob);
                            //     }
                            //   } else {
                            //     autoPlayIntervalJob = setInterval(() => {
                            //       step(game, qNet);
                            //     }, 100);
                            //     autoPlayStopButton.textContent = 'Stop';
                            //   }
                            //   autoPlaying = !autoPlaying;
                            //   stepButton.disabled = autoPlaying;
                            // });
                          
                            // resetButton.addEventListener('click',  () => reset(game));
                        }

                        (async function() {
                            try {
                              qNet = await tf.loadLayersModel('indexeddb://snake-model-dqn');
                              console.log(`Loaded model from indexeddb://snake-model-dqn`);
                              initGame();
                              // enableGameButtons();
                            } catch (err) {
                              console.log('Loading local model failed.');
                            }
                        })();
                    }}
                    size="lg"
                >
                    Train test
                </Button>
              </Row>
              <Row><br/></Row>
              <Row>
                  <Button
                    variant="secondary"
                    onClick={() => {
                        step();
                    }}
                    size="lg"
                >
                    Train step
                </Button>
              </Row>
              <Row><br/></Row>
              <Row><br/></Row>
              <Row>
               <Logs logsData={this.state.logs} />
              </Row>
          </>
        );
    }
}
