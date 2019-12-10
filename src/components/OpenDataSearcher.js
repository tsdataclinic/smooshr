import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import { faExternalLinkAlt, faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function OpneDataSearcher({ onDataset }) {

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const domain = 'data.cityofnewyork.us';
  const onSelect = dataset => {
    onDataset({
      type: 'opendata',
      ref: `https://data.cityofnewyork.us/api/views/${dataset.resource.id}/rows.csv?accessType=DOWNLOAD`,
    });
  };

  useEffect(() => {
    const base = 'https://api.us.socrata.com/api/catalog/v1?';
    fetch(
      `${base}domains=${domain}&search_context=${domain}&limit=20&only=datasets&q=${searchTerm}`,
    )
      .then(res => res.json())
      .then(res => {
        setSearchResults(res.results);
      })
      .catch(err => console.log(err));
  }, [searchTerm]);

  return (
    <div className="open-data-search">
      <SearchBar
        style={{ marginBottom: '30px' }}
        text={searchTerm}
        onChange={setSearchTerm}
      />
      {searchResults.map(dataset => (
        <p>
          {dataset.resource.name}{' '}
          <span className="open-data-result-controls">
            {' '}
            <a href={dataset.permalink} target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>{' '}
            <FontAwesomeIcon
              onClick={() => onSelect(dataset)}
              icon={faDownload}
            />
          </span>{' '}
        </p>
      ))}
    </div>
  );
}
