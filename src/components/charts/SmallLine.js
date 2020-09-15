import React from 'react';
import ChartComponent, { Chart } from 'react-chartjs-2';

import { smallLineChartOptions } from './config';

const addCommas = nStr => {
    nStr = String(nStr);
    const x = nStr.split('.');
    let x1 = x[0];
    const x2 = x.length > 1 ? `.${ x[1]}` : '';
    const rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1,$2');
    }
    return x1 + x2;
};

export default class SmallLine extends React.Component {
    constructor(props) {
        super(props);
        this.changeState = this.changeState.bind(this);
        this.state = {
            currentValue: '',
            currentLabel: '',
        };
    }

    componentWillMount() {
        Chart.defaults.lineWithLine = Chart.defaults.line;
        Chart.controllers.lineWithLine = Chart.controllers.line.extend({
            draw(ease) {
                Chart.controllers.line.prototype.draw.call(this, ease);

                if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
                    const activePoint = this.chart.tooltip._active[0];
                    const { ctx } = this.chart;
                    const { x } = activePoint.tooltipPosition();
                    const topY = this.chart.scales['y-axis-0'].top;
                    const bottomY = this.chart.scales['y-axis-0'].bottom;

                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(x, topY);
                    ctx.lineTo(x, bottomY);
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = 'rgba(0,0,0,0.1)';
                    ctx.stroke();
                    ctx.restore();
                }
            },
        });
    }

    changeState(yLabel, xLabel) {
        this.setState({ currentValue: yLabel, currentLabel: xLabel });
    }

    render() {
        const { changeState } = this;
        const { data } = this.props;

        return (
            <>
            <div>
                  <p className="lead color-theme-1 mb-1 value">
                      {this.state.currentValue}
                    </p>
                  <p className="mb-0 label text-small">{this.state.currentLabel}</p>
                </div>
            <div className="chart">
                  <ChartComponent
                      ref={ref => (this.chart_instance = ref && ref.chart_instance)}
                      type="lineWithLine"
                      options={{
                            ...smallLineChartOptions,
                            tooltips: {
                                intersect: false,
                                enabled: false,
                                custom(tooltipModel) {
                                    if (tooltipModel && tooltipModel.dataPoints) {
                                        const { yLabel } = tooltipModel.dataPoints[0];
                                        const { xLabel } = tooltipModel.dataPoints[0];
                                        const label = tooltipModel.body[0].lines[0].split(':')[0];
                                        changeState(`$${ addCommas(yLabel)}`, `${label }-${ xLabel}`);
                                    }
                                },
                            },
                        }}
                      plugins={[
                            {
                                afterInit(chart, options) {
                                    const yLabel = chart.data.datasets[0].data[0];
                                    const xLabel = chart.data.labels[0];
                                    const { label } = chart.data.datasets[0];
                                    changeState(`$${ addCommas(yLabel)}`, `${label }-${ xLabel}`);
                                },
                            },
                        ]}
                      data={data}
                    />
                </div>
          </>
        );
    }
}
