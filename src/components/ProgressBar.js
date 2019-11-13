import React from 'react'

export default function ProgressBar({ total, value, style }) {
    return (
        <div className='progress-bar' style={style}>
            <div className='progress-bar-outer'>
                <div className={'progress-bar-inner'} style={{ width: `${value * 100.0 / total}%` }}>
                </div>
            </div>
            <p className='progress-bar-pc'>{value ? (value * 100 / total).toPrecision(3) : 0} %</p>
        </div>
    )
}