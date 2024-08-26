import React, { useState, useEffect } from "react";
import Papa from 'papaparse';
import axios from 'axios';
import './Gallery.less';
import FilterDropdown from '../elements/FilterDropdown';
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
            .then(response => setSymbolOptions(response.data.result.map(item => item[0]))
                .sort((a, b) => a.localeCompare(b))
            )
            .catch(error => {
                console.error('There was an error fetching the text!', error);
            });
    }, []);

    return (
        <div className='controls'>
            <FilterDropdown
                optionsArr={symbolOptions}
                setSelectedSymbol={setSelectedSymbol}
            />
        </div>

    );
}

export default Gallery;
