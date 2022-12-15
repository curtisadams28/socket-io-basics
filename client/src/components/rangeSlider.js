import React, { useState } from 'react';

function RangeSlider({ min, max, className, updateState, leftLabel, rightLabel, title }) {
    const [value, setValue] = useState(min);

    function handleChange(event) {
        setValue(event.target.value);
    }

    function handleMouseUp(e) {
        updateState(parseInt(e.target.value));
    }

    return (
        <div className={className}>
            <div className='range-slider-title'>
                <h2>{title}</h2>
                <p>{value}</p>
            </div>
            <input
                type="range"
                className='range-slider'
                min={min}
                max={max}
                value={value}
                onChange={handleChange}
                onMouseUp={handleMouseUp}
            />
            <div className='range-labels'>
                <p className='left-label'>{leftLabel}</p>
                <p className='right-label'>{rightLabel}</p>
            </div>
        </div>
    );
}

export default RangeSlider;