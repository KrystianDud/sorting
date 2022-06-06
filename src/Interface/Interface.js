import React, { useState } from 'react'

export default function Interface({ updateColumns, columnsInt, updateRange, range, test, updateRepeat, canRepeat, sortingType, sortType, updateSortType, startSorting }) {
    const [selectedSort, setselectedSort] = useState(0)
    return (
        <div className='interface'>

            <div className="container">
                <p>Set number of columns:</p>
                <input type="range" min="1" max="100" value={columnsInt} onChange={(e) => updateColumns(e.target.value)} />
                <p>{columnsInt}</p>
            </div>

            <div className="container">
                <div className="minRange">
                    <p>minimum value</p>
                    <input type='number' min='1' value={range['min']} max='60' onChange={(e) => updateRange(e.target.value, 'min')} />
                </div>

                <div className="maxRange">
                    <p>maximal value</p>
                    <input type='number' min='1' value={range['max']} max='60' onChange={(e) => updateRange(e.target.value, 'max')} />
                </div>
            </div>

            <div className="container">
                <div className='containerRow'>
                    <label htmlFor="repeat"> Can repeat values ?</label>
                    <input type="checkbox" checked={canRepeat} name='repeat' onChange={(e) => updateRepeat(e.target.checked)} />
                </div>

                {(range.max - range.min) < columnsInt ?
                    <p style={{ fontSize: '12px', fontWeight: 400 }}>
                        Note: you have selected no repeat but the with the current settings the values will repeat.
                        <br /> Increase the range to at least match the number of columns.
                    </p>
                    : null
                }
            </div>

            <select className='sortSelect' value={sortingType} onChange={(e) => updateSortType(e.target.value)}>
                {sortType.map((item, index) => (
                    <option key={index} value={item} >{item}</option>
                ))}
            </select>

            <button onClick={() => startSorting()}>Sort</button>

        </div>
    )
}

// selected={index === selectedSort ? true : false}