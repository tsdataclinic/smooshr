import * as lev from 'fast-levenshtein';


const cacheSimilarities = {};

export const suggestForMapping = (mapping, entries) => {
  const res = [];
  mapping.forEach(mapping_entry => {
    entries.forEach(entry => {
      const cacheKey = [mapping_entry, entry.name].join('_');

      if (!mapping.includes(entry)) {
        if (cacheSimilarities[cacheKey]) {
          res.push({
            suggestion: entry.name,
            score: cacheSimilarities[cacheKey],
          });
        } else {
          const dist = lev.get(mapping_entry, entry.name);
          cacheSimilarities[cacheKey] = dist;
          res.push({ suggestion: entry.name, score: dist });
        }
      }
    });
  });
  return res.sort((a, b) => (a.score > b.score ? 1 : -1)).slice(0, 5);
};
