import React from "react";

export default function EntryCard({ entry, selected = false, onToggleSelect }) {
  return (
    <div
      className={`entry-card card ${selected ? "selected" : ""}`}
      onClick={() => onToggleSelect(entry)}
    >
      <div class="entry-card-content" title={entry.name}>
        <h3>{entry.name}</h3>
      </div>
      <p>{entry.count} occurrences</p>
    </div>
  );
}
