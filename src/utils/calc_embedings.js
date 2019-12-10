const get_embedings_from_server = entries => {
  let unique_words = new Set();
  entries.forEach(entry => {
    entry.name.split(' ').forEach(word => {
      unique_words.add(word);
    });
  });

  return Promise.all(
    Array.from(unique_words).map(entry =>
      fetch(
        `${
        process.env.REACT_APP_API_URL
        }/embedding/${entry.toLowerCase().replace(/[\W_]+/g, '')}`,
      )
        .then(r => r.json())
        .then(r => r[0]),
    ),
  );
};

const vec_mag = vec => Math.sqrt(vec.reduce((mag, v) => mag + v * v, 0));

const norm_vec = vec => {
  const mag = vec_mag(vec);
  return vec.map(v => v / mag);
};

const category_mean = (entries, negativeEntries, embeddings) => {
  const entry_embeddings = entries
    .map(entry => embeddings.find(emb => entry === emb.entry))
    .filter(a => a)
    .map(embed => [embed.embed, 1]);

  const negative_embeddings = negativeEntries
    .map(entry => embeddings.find(emb => entry === emb.entry))
    .filter(a => a)
    .map(embed => [embed.embed, -1]);

  const all_entry_contributions = entry_embeddings.concat(negative_embeddings);

  const total_vec = all_entry_contributions.reduce((total, embed) => {
    const weight = embed[1];
    const vec = embed[0].map(v => v * weight);

    if (total.length === 0) {
      total = vec;
    } else {
      total = vec.map((v, i) => v + total[i]);
    }
    return total;
  }, []);

  return norm_vec(total_vec);
};

const vec_dist2 = (v1, v2) =>
  v1.reduce((total, v, index) => total + (v - v2[index]) * (v - v2[index]), 0);

export const most_similar_to_category_mean = (
  entries,
  negativeEntries,
  search_entries,
  embeddings,
) => {
  const mean = category_mean(entries, negativeEntries, embeddings);

  const distances = search_entries.map(entry => {
    const embeding = embeddings.find(e => e.entry === entry.name);
    if (embeding) {
      const dist = vec_dist2(norm_vec(embeding.embed), mean);
      return { suggestion: entry.name, dist: dist };
    } else {
      return { suggestion: entry.name, dist: 2000000 };
    }
  });
  return distances
    .filter(a => a.dist > 0)
    .filter(a => !entries.includes(a.suggestion))
    .filter(a => !negativeEntries.includes(a.suggestion))
    .sort((a, b) => (a.dist > b.dist ? 1 : -1))
    .slice(0, 8);
};

const combined_word_embedings_for_entry = (
  entry,
  word_embedings,
  norm = false,
) =>
  entry.name.split(' ').reduce((full_embed, word) => {
    const word_embed = word_embedings
      .filter(embed => embed)
      .find(we => we.key === word.toLocaleLowerCase());

    if (word_embed) {
      let rep = word_embed.embedding;
      if (norm) {
        rep = norm_vec(rep);
      }

      if (full_embed.length === 0) {
        full_embed = rep;
      } else {
        full_embed = full_embed.map((v, i) => v + rep[i]);
      }
    }
    return full_embed;
  }, []);

export const calc_embedings = entries =>
  get_embedings_from_server(entries).then(word_embedings =>
    entries.map(entry => ({
      entry: entry.name,
      embed: combined_word_embedings_for_entry(entry, word_embedings),
    })),
  );
