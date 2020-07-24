import React from 'react';
import Chart from "./Chart"

let data;

export default class Data extends React.Component {
    constructor(props) {
        super(props);
        this.setState = {
            data: null,
            currentTicks: window.localStorage.getItem('ticks') || '5min'
        }
    }
    componentDidMount() {
        this.getChartData();
    }

   /*  componentDidUpdate() {
        if(!this.state.interactive) {
            this.getChartData();
            this.interval && window.clearInterval(this.interval);
        } else {
            if (!this.interval) {
                this.interval = window.setInterval(() => {
                    const dataBuff = this.state.dataBuff.slice(0);
                    const data = this.state.data.slice(0);
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

        if (this.state.data && this.state.data.length) {
            Chart('ticks_chart', 'render', [{
               data: this.state.data
            }])
        }
    } */

    getChartData() {
        this.loadedData || (this.loadedData = {});
        const current = this.loadedData[this.state.currentTicks];
        if (this.loadedData[this.state.currentTicks] === true) {
            return;
        } else if (current) {
            Chart('ticks_chart', 'updateSeries', [{
                data: this.loadedData[this.state.currentTicks].data,
            }]);
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

            const series = this.state.slice(0);
            let name;

            this.state.data = !res || !Object.keys(res).length ? [] : res.map((t, i) => {
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
                    y: [parseFloat(tick[4]), parseFloat(tick[5]), parseFloat(tick[6]), parseFloat(tick[7]), parseFloat(tick[8]) ],
                    
                };
            })
            .filter(Boolean);

            this.setState(this.loadedData[this.state.currentTicks]);

            Chart('ticks_chart', 'updateSeries', [{
                data: this.state.data,
            }]);
        };
        x.withCredentials = true;
        x.send();
        console.log(this.setState.data);
    }
}

