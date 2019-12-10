import React from 'react'
import EntryPill from './EntryPill'

export default function SelectedEntriesList({ selection, onRemoveSelection, onClearAll }) {
    return (
        <div className='selected-entry-list'>
            {selection.length === 0 ?
                <span>Click on entries to select them</span>
                :
                <span>Selections ({selection.length}):</span>
            }
            <ul >
                {selection.reverse().map(entry => <li><EntryPill onRemove={onRemoveSelection} entry={entry} /> </li>)}
            </ul>
            {(selection.length > 0) &&
                <button className='clear-all text-button' onClick={onClearAll}>Clear All</button>
            }
        </div>
    )
}

SelectedEntriesList.defaultProps = {
    selection: []
}

