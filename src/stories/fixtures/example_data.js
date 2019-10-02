import faker from 'faker';

export function example_datatable(rows = 20) {
  const data = [...Array(rows).keys()].map(id => ({
    id,
    contact: faker.name.findName(),
    company: faker.company.companyName(),
    damage_ammount: Math.random() * 20,
    total_ammount: Math.random() * 100,
  }));

  const columns = [
    {
      name: 'id',
      key: 'id',
    },
    {
      name: 'Contact',
      key: 'contact',
    },
    {name: 'Company', key: 'company'},
    {name: 'Damage ammount', key: 'damage_ammount'},
    {name: 'Total ammount', key: 'total_ammount'},
  ];

  return {data, columns};
}

export function generate_mappings(no_mappings, no_entries) {
  const entries_per_mapping = Math.floor(no_entries / no_mappings);

  const entries = generate_entries(no_entries);
  const entriesList = entries.slice(0)
  const mappings = [...Array(no_mappings)].map(()=> ({
    name: faker.hacker.verb(),
    entries: [...Array(entries_per_mapping)].map(() => entriesList.pop()),
    suggestionsText: generate_entries(4),
    suggestionsMeaning: generate_entries(6),
    negative_examples: []
  }));

  return {
    entries,
    mappings,
  };
}

export function generate_entries(no) {
  return [...Array(no)].map(() => ({
    name: faker.hacker.noun(),
    count: faker.random.number(),
  }));
}
