import React, { useState, useEffect } from "react";
import Plot from 'react-plotly.js';
import axios from 'axios';
import './Gallery.less';
import FilterDropdown from '../elements/FilterDropdown';
import { Button } from '@mantine/core';


function Gallery() {
    const [selectedSymbol, setSelectedSymbol] = useState("");
    const [symbolOptions, setSymbolOptions] = useState('');

    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const queryString = 'SELECT symbol FROM in_position';
        axios.get(`http://127.0.0.1:5000/api/query`, {
            params: {
                query: queryString
            }
        })
            .then(response => {
                if (response.data && Array.isArray(response.data.result)) {
                    const symbols = response.data.result.map(item => item[0]);
                    setSymbolOptions(symbols.sort((a, b) => a.localeCompare(b)));
                } else {
                    console.error('Unexpected response structure:', response.data);
                }
            })
            .catch(error => {
                console.error('There was an error fetching the tickers:',error);
            });
    }, []);


    const fetchChartData = () => {
        axios.get(`http://127.0.0.1:5000/api/chart`, {
            params: {
                symbol: selectedSymbol,
                start_date: '2024-01-02',
                end_date: '2024-08-26'
            }
        })
            .then(response => {
                console.log(response.data.result);
                const timestamps = Object.keys(response.data.result);
                setChartData({
                    'timestamps': timestamps,
                    'openPrices': timestamps.map(date => response.data.result[date].open),
                    'highPrices': timestamps.map(date => response.data.result[date].high),
                    'lowPrices': timestamps.map(date => response.data.result[date].low),
                    'closePrices': timestamps.map(date => response.data.result[date].close)
                });
            })
            .catch(error => {
                console.error('There was an error fetching the chart data', error);
            });
    }

    return (
        <>
            <div className='controls'>
                <FilterDropdown
                    optionsArr={symbolOptions}
                    setSelectedSymbol={setSelectedSymbol}
                />
                <Button variant="filled" classNames={{ root: 'buttonss' }} onClick={() => { fetchChartData() }}>Fetch Chart</Button>
            </div>
            <div className='chart-container'>
                {chartData != null ?
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
                            nticks: Math.min(15, chartData.timestamps.length),
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
                    : null}
            </div>
        </>

    );
}

export default Gallery;
