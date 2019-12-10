import React, { useState } from 'react';
import EntryCard from './EntryCard';
import OrderBySelector from './OrderBySelector';
import { faGlassCheers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SelectedEntriesList from './SelectedEntriesList'

export default function EntryTable({
  entries,
  style,
  onToggleSelection,
  onClearSelection,
  selection,
}) {
  const [order, setOrder] = useState('Occurances');

  const toggleSelection = entry => {
    if (onToggleSelection) {
      onToggleSelection(entry);
    }
  };

  const orderKey = { Alphabetically: 'name', Occurances: 'count' }[order];

  let orderedEntries = entries.sort((a, b) =>
    a[orderKey] > b[orderKey] ? 1 : -1,
  );

  if (orderKey === 'count') {
    orderedEntries.reverse();
  }

  return (
    <div style={style} className="entry-table">
      <div className="entry-table-filters">
        <SelectedEntriesList selection={selection} onRemoveSelection={toggleSelection} onClearAll={onClearSelection} />
        <OrderBySelector onChange={order => setOrder(order)} />

      </div>
      <div className="entry-table-entries">
        {orderedEntries.length > 0 ? (
          orderedEntries.map(entry => (
            <EntryCard
              key={entry.name}
              entry={entry}
              selected={selection.includes(entry.name)}
              onToggleSelect={toggleSelection}
            />
          ))
        ) : (
            <div className="all-done">
              <h1>You really smooshed that crap out of that column.</h1>
              <h1>
                {[...Array(5)].map(() => (
                  <FontAwesomeIcon icon={faGlassCheers} />
                ))}
              </h1>
            </div>
          )}
      </div>
    </div>
  );
}

EntryTable.defaultProps = {
  style: {},
};
