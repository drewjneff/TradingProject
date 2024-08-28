import React from 'react';
import Plot from 'react-plotly.js';

function CandlestickChart({ chartData }) {
    return (
        <Plot
            data={[
                {
                    x: chartData.timestamps,
                    open: chartData.openPrices,
                    high: chartData.highPrices,
                    low: chartData.lowPrices,
                    close: chartData.closePrices,
                    type: 'candlestick',
                    xaxis: 'x',
                    yaxis: 'y',
                }
            ]}
            layout={{
                xaxis: {
                    title: {
                        text: 'Date',
                        font: {
                            color: 'white',
                            size: 18,
                        },
                    },
                    type: 'category',
                    showgrid: false,
                    color: 'white',
                    tickangle: 0,
                    nticks: Math.min(14, chartData.timestamps.length),
                    tickfont: {
                        size: 14,
                    },
                },
                yaxis: {
                    title: {
                        text: 'Price',
                        font: {
                            color: 'white',
                            size: 18,
                        },
                    },
                    showgrid: false,
                    color: 'white',
                    tickfont: {
                        size: 18,
                    },
                    autorange: true,  // Ensures the y-axis rescales automatically
                    fixedrange: false,  // Allows dynamic resizing
                },
                plot_bgcolor: 'rgba(0, 0, 0, 0)',
                paper_bgcolor: 'rgba(0, 0, 0, 0)',
                autosize: true,
                margin: {
                    t: 10,  // Top margin
                    b: 10,  // Bottom margin
                    l: 60,  // Left margin
                    r: 20,  // Right margin
                },
            }}
            useResizeHandler={true}
            style={{ width: '100%', height: '600px' }}
            config={{
                displayModeBar: false,  // Enable mode bar for more interaction options
            }}
        />
    );
}

export default CandlestickChart;