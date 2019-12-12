import React, { useState } from 'react'


export default function Toggle({ entries, onChange, prompt }) {
    const [selectedEntry, setSelectedEntry] = useState(entries[0])
    const updateSelected = (entry) => {
        setSelectedEntry(entry)
        if (onChange) {
            onChange(entry)
        }
    }
    return (
        <div className='toggle'>
            {prompt &&
                <p className='toggle-prompt'>
                    {prompt}
                </p>
            }
            <div className='toggle-inner'>

                {entries.map(entry =>
                    <div
                        className={`toggle-entry ${selectedEntry === entry ? 'toggle-selected' : ''}`}
                        onClick={() => updateSelected(entry)}
                        key='entry'>{entry}
                    </div>
                )}
            </div>
        </div>

    )
}