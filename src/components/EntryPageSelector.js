import React from "react";

export default function EntryPageSelector({ pageNum, numPages, onChange }) {
  const buttons = [];

  console.log(onChange);

  for (let i = 0; i < numPages; i++) {
    buttons.push(
      <button onClick={() => onChange(i)} disabled={i === pageNum}>
        {i + 1}
      </button>
    );
  }

  return <div className="page-select-buttons">{buttons}</div>;
}
