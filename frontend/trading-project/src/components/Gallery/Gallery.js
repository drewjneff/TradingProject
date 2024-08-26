import React, { useState, useEffect } from "react";
import Papa from 'papaparse';
import axios from 'axios';
import './Gallery.less';
import FilterDropdown from '../elements/FilterDropdown';
import { Button } from '@mantine/core';


function Gallery() {
    const [selectedSymbol, setSelectedSymbol] = useState("");

    const [symbolOptions, setSymbolOptions] = useState('');

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
                console.error('There was an error fetching the text!', error);
            });
    }, []);
    

    const fetchChartData = () => {
        axios.get(`http://127.0.0.1:5000/api/chart`, {
            params: {
                symbol: selectedSymbol
            }
        })
            .then( response =>
                console.log(response.data)
            )
            .catch(error => {
                console.error('There was an error fetching the text!', error);
            });
    }

    return (
        <div className='controls'>
            <FilterDropdown
                optionsArr={symbolOptions}
                setSelectedSymbol={setSelectedSymbol}
            />
            <Button variant="filled" classNames={{root: 'buttonss'}} onClick={()=>{fetchChartData()}}>Fetch Chart</Button>
        </div>

    );
}

export default Gallery;
