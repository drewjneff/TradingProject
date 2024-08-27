import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Gallery.less';
import FilterDropdown from '../elements/FilterDropdown';
import CandlestickChart from "../elements/CandlestickChart";
import CandlestickSkeleton from "../elements/CandlestickSkeleton";
import { Button } from '@mantine/core';


function Gallery() {
    const [selectedSymbol, setSelectedSymbol] = useState("");
    const [symbolOptions, setSymbolOptions] = useState('');

    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const queryString = 'SELECT symbol FROM in_position';
        axios.get(`http://127.0.0.1:5001/api/query`, {
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
        axios.get(`http://127.0.0.1:5001/api/chart`, {
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
                <>
                    <CandlestickChart
                        chartData = {chartData}
                    />
                   
                </>
                    :  <CandlestickSkeleton/>}
            </div>
        </>

    );
}

export default Gallery;
