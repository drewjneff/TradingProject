import React, { useRef } from 'react';
import { Skeleton } from '@mantine/core';
import './CandlestickSkeleton.less';
import CandleStickImage from '../../assets/images/candlestick.jpg';

function randomHeight(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function CandlestickSkeleton() {
    const pricesHeights = useRef(Array.from({ length: 8 }, () => randomHeight(35, 50)));

    return (
        <div className='skeleton'>
            <img className='overlay-image' src={CandleStickImage} />
            <div className='dates-overlay'>
                {Array.from({ length: 15 }).map((_, index) => (
                    <Skeleton key={index} animate height={20} width={95} />
                ))}
            </div>
            <div className='prices-overlay'>
                {pricesHeights.current.map((height, index) => (
                    <Skeleton key={index} animate height={25} width={height} />
                ))}
            </div>
        </div>
    );
}

export default CandlestickSkeleton;
