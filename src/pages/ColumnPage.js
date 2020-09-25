import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import EntryTable from "../components/EntryTable";
import MappingsArea from "../components/MappingsArea";
import useFuse from "react-use-fuse";
import { suggestForMapping } from "../utils/text_clustering";
import { most_similar_to_category_mean } from "../utils/calc_embedings";

import {
  createMapping,
  renameMapping,
  addEntriesToMapping,
  addNegativeExampleToMapping,
  removeEntryFromMapping,
  deleteMapping,
  clearMapping,
  requestEmbedingsForEntries,
} from "../contexts/actions";
import { useStateValue, useMetaColumn } from "../contexts/app_context";
import EntryPageSelector from "../components/EntryPageSelector";

const PAGE_LENGTH = 100;

export default function ColumnPage({ match }) {
  const [searchTerm, setSearchTerm] = useState(null);
  const [selectedMappingID, setSelectedMappingID] = useState(null);
  const [entrySelection, setEntrySelection] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const { columnID } = match.params;

  const { entries, mappings, embeddings, dispatch } = useMetaColumn(columnID);
  const selectedMapping = mappings.find((m) => m.id === selectedMappingID);

  useEffect(() => {
    if (entries) {
      requestEmbedingsForEntries(entries, dispatch);
    }
  }, [JSON.stringify(entries)]);

  const non_mapped_entries = entries.filter(
    (entry) => !mappings.some((m) => m.entries.includes(entry.name))
  );

  const { result, search } = useFuse({
    data: non_mapped_entries,
    options: {
      shouldSort: true,
      findAllMatches: true,
      keys: ["name"],
      caseSensitive: false,
    },
  });

  let filteredEntries = result;
  if (result[0] && result[0].item) {
    filteredEntries = result.map((r) => r.item);
  }

  let numPages = Math.ceil(filteredEntries.length / PAGE_LENGTH);

  const setPage = (newPageNum) => {
    setPageNum(newPageNum);
  };

  const toggleEnrtySelection = (entry) => {
    const entryName = typeof entry == "string" ? entry : entry.name;

    if (entrySelection.includes(entryName)) {
      setEntrySelection(entrySelection.filter((s) => s !== entryName));
    } else {
      setEntrySelection([...entrySelection, entryName]);
    }
  };

  const onCreateMapping = () => {
    const id = createMapping(
      entrySelection,
      columnID,
      entrySelection[0],
      dispatch
    );
    setEntrySelection([]);
    setSelectedMappingID(id);
  };

  const onRenameMapping = (mapping, name) => {
    renameMapping(mapping, name, dispatch);
  };

  const onRemoveEntryFromMapping = (entry, mapping) => {
    removeEntryFromMapping(mapping, entry, dispatch);
  };

  const onClearMapping = (mapping) => {
    clearMapping(mapping, dispatch);
  };

  const onDeleteMapping = (mapping) => {
    deleteMapping(mapping, dispatch);
  };

  const clearSelection = () => {
    setEntrySelection([]);
  };

  const onAddEntriesToMapping = (
    entriesToAdd,
    shouldClearSelection = false
  ) => {
    addEntriesToMapping(selectedMapping, entriesToAdd, dispatch);
    if (shouldClearSelection) {
      clearSelection();
    }
  };

  const onAddNegativeExampleToMapping = (entry) => {
    addNegativeExampleToMapping(selectedMapping, entry, dispatch);
  };

  //Remove any entries that are already in a mapping

  const updateSearch = (text) => {
    setSearchTerm(text);
    search(text);
  };

  const suggestionsAvaliable = embeddings && selectedMapping;

  const meaningSuggestions = suggestionsAvaliable
    ? most_similar_to_category_mean(
        selectedMapping.entries,
        selectedMapping.negative_examples,
        non_mapped_entries,
        embeddings
      )
    : [];

  const textSuggestions = suggestionsAvaliable
    ? suggestForMapping(selectedMapping.entries, non_mapped_entries)
    : [];

  const suggestions = { text: textSuggestions, meaning: meaningSuggestions };

  const { cache_loaded } = useStateValue();

  const stats = {
    mappings: mappings.length,
    total_rows: entries.reduce((total, e) => total + e.count, 0),
    total_mapped_rows: mappings
      .map((m) =>
        m.entries.reduce(
          (total, entry) => total + entries.find((e) => e.name === entry).count,
          0
        )
      )
      .reduce((total, map) => total + map, 0),
    total_entries_in_mappings: mappings.reduce(
      (total, m) => total + m.entries.length,
      0
    ),
  };

  if (!cache_loaded) {
    return (
      <div className="column-page">
        <SearchBar
          style={{ gridArea: "header", width: "50%", justifySelf: "center" }}
          onChange={updateSearch}
          onClear={() => updateSearch("")}
          value={searchTerm}
          prompt="Search for entries by typing here..."
        />
        <EntryTable
          entries={filteredEntries.slice(
            PAGE_LENGTH * pageNum,
            PAGE_LENGTH * pageNum + PAGE_LENGTH
          )}
          style={{
            gridArea: "table",
            overflowY: "hidden",
            width: "100%",
            height: "100%",
          }}
          onToggleSelection={toggleEnrtySelection}
          selection={entrySelection}
          onClearSelection={clearSelection}
          {...entries}
        />

        <EntryPageSelector
          pageNum={pageNum}
          numPages={numPages}
          onChange={setPage}
        />

        <div className="stats-and-actions">
          <div className="stats">
            <p>
              <span>{stats.total_entries_in_mappings}</span> /{" "}
              <span>{entries.length}</span> entries |{" "}
              <span>{stats.total_mapped_rows}</span> /{" "}
              <span>{stats.total_rows}</span> rows
            </p>
          </div>

          <div className="entry-action-buttons">
            <button
              disabled={entrySelection.length === 0}
              onClick={onCreateMapping}
            >
              New Mapping {entrySelection.length}
            </button>
            <button
              disabled={!(entrySelection.length > 0 && selectedMappingID)}
              onClick={() => onAddEntriesToMapping(entrySelection, true)}
            >
              Add to Mapping
            </button>
            <button
              onClick={() =>
                createMapping(non_mapped_entries, columnID, "Other", dispatch)
              }
            >
              Map Remaining To Other
            </button>
          </div>
        </div>
        <MappingsArea
          mappings={mappings}
          selection={mappings.find((m) => m.id === selectedMappingID)}
          style={{ gridArea: "mappings" }}
          onMappingSelected={(s) => setSelectedMappingID(s.id)}
          onRenameMapping={onRenameMapping}
          onRemoveEntryFromMapping={onRemoveEntryFromMapping}
          onDeleteMapping={onDeleteMapping}
          onClearMapping={onClearMapping}
          suggestions={suggestions}
          onAddSuggestionToMapping={(suggestion) =>
            onAddEntriesToMapping([suggestion])
          }
          onAddNegativeExampleToMapping={onAddNegativeExampleToMapping}
          {...mappings}
          syle={{ height: "300px" }}
        />
      </div>
    );
  } else {
    return <h1>Loading</h1>;
  }
}
