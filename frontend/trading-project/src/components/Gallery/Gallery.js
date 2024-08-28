import React, { useState, useEffect } from "react";
import axios from 'axios';
import './Gallery.less';
import dayjs from 'dayjs';
import FilterDropdown from '../elements/FilterDropdown';
import CandlestickChart from "../elements/CandlestickChart";
import CandlestickSkeleton from "../elements/CandlestickSkeleton";
import { FloatingIndicator, UnstyledButton, Button, Popover, ActionIcon } from "@mantine/core";
import { IconAdjustments } from '@tabler/icons-react';
import DatePicker from "../elements/DatePicker";


function Gallery() {
    const [selectedSymbol, setSelectedSymbol] = useState("");
    const [symbolOptions, setSymbolOptions] = useState('');
    const [chartData, setChartData] = useState(null);
    const [selectedStartDate, setSelectedStartDate] = useState('2024-01-02');
    const [selectedEndDate, setSelectedEndDate] = useState(dayjs().format('YYYY-MM-DD'));

    useEffect(() => {
        console.log('start date is:', selectedStartDate);
    }, [selectedStartDate]);

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
                console.error('There was an error fetching the tickers:', error);
            });
    }, []);


    const fetchChartData = () => {
        axios.get(`http://127.0.0.1:5001/api/chart`, {
            params: {
                symbol: selectedSymbol,
                start_date: selectedStartDate,
                end_date: selectedEndDate
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
                
                <div className='pickers'>
                    <DatePicker
                        selectedDate={selectedStartDate}
                        setSelectedDate={setSelectedStartDate}
                    />
                    <span className='text-between-pickers'>to</span>
                    <DatePicker
                        selectedDate={selectedEndDate}
                        setSelectedDate={setSelectedEndDate}
                    />
                </div>
                <Popover width={200} position="bottom" shadow="md">
                    <Popover.Target>
                        <div className='range-target-button'>
                            <ActionIcon variant="filled" aria-label="Settings" style={{ width: '40px', height: '40px' }} color="#414141">
                                <IconAdjustments style={{ width: '75%', height: '75%' }} stroke={1.5} color='white'/>
                            </ActionIcon>
                        </div>
                    </Popover.Target>
                    <Popover.Dropdown>
                        This is uncontrolled popover, it is opened when button is clicked
                    </Popover.Dropdown>
                </Popover>
                <Button variant="filled" onClick={() => { fetchChartData() }}>Fetch Chart</Button>

            </div>
            <div className='chart-container'>
                {chartData != null ?
                    <>
                        <CandlestickChart
                            chartData={chartData}
                        />

                    </>
                    : <CandlestickSkeleton />}
            </div>
        </>

    );
}

export default Gallery;
