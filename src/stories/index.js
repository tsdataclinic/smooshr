import React from 'react';

import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';
import TextEntry from '../components/TextEntry';
import GroupDescription from '../components/GroupDescription';
import EmbedingsViz from '../components/EmbedingsViz';
import TablePreview from '../components/TablePreview';
import SearchBar from '../components/SearchBar';
import ColumnEntrySummary from '../components/ColumnEntrySummary';
import FileLoader from '../components/FileLoader';
import EntryCard from '../components/EntryCard';
import EntryTable from '../components/EntryTable';
import MappingsMenu from '../components/MappingsMenu';
import MappingFocus from '../components/MappingFocus';
import MappingsArea from '../components/MappingsArea';
import OrderBySelector from '../components/OrderBySelector';
import DatasetPicker from '../components/DatasetPicker';
import ColumnPage from '../pages/ColumnPageNew'
import {gen_sample, gen_selection} from './fixtures/example_points';
import {gen_datasets} from './fixtures/example_datasets';
import {
  example_datatable,
  generate_entries,
  generate_mappings,
} from './fixtures/example_data';
import {withKnobs, text, boolean, number} from '@storybook/addon-knobs';
import {Welcome} from '@storybook/react/demo';
import 'typeface-lato';

import '../App.scss';

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
));

storiesOf('TextEntry', module).add('basic', () => (
  <TextEntry name="NCF"></TextEntry>
));

storiesOf('GroupDescription', module)
  .add('With entries', () => (
    <GroupDescription
      name="Violations"
      description="Basic validations in the data"
      unique_entries={200}
      no_rows={3000}
    />
  ))
  .add('With no entries', () => (
    <GroupDescription
      name="Violations"
      description="Basic validations in the data"
      unique_entries={0}
      no_rows={0}
    />
  ));

storiesOf('EmbedingsViz', module)
  .addDecorator(withKnobs)
  .add('empty', () => <EmbedingsViz point_radius={3} />)
  .add('with a few points', () => (
    <EmbedingsViz points={gen_sample(200)} point_radius={3} />
  ))
  .add('with a fixed size', () => (
    <EmbedingsViz
      style={{width: '500px', height: '500px'}}
      points={gen_sample(200)}
      pointRadius={1}
    />
  ))
  .add('with a selection', () => (
    <EmbedingsViz
      style={{width: '500px', height: '500px'}}
      points={gen_sample(200)}
      pointRadius={1}
      selection={gen_selection(20, 200)}
    />
  ))
  .add('with a lots of points', () => (
    <EmbedingsViz
      style={{width: '500px', height: '500px'}}
      points={gen_sample(2000)}
      pointRadius={1}
      selection={gen_selection(20, 2000)}
    />
  ))
  .add('with Knobs on', () => {
    const no_points = number(
      'No Points',
      200,
      {range: true, max: 2000, min: 1, step: 1},
      'g1',
    );
    const pc_selected = number(
      'No Selected',
      20,
      {range: true, max: 100, min: 0, step: 1},
      'g1',
    );
    const radius = number(
      'Radius',
      2,
      {range: true, max: 20, min: 1, step: 1},
      'g1',
    );

    return (
      <EmbedingsViz
        style={{width: '500px', height: '500px'}}
        points={gen_sample(no_points)}
        pointRadius={radius}
        selection={gen_selection(pc_selected, no_points)}
      />
    );
  });

storiesOf('TablePreview', module).add('with some simple data', () => {
  const {data, columns} = example_datatable();
  return <TablePreview data={data} columns={columns} />;
});

storiesOf('DataSetPicker', module)
  .add('Short list', () => <DatasetPicker datasets={gen_datasets(20)} />)
  .add('Selected', () => (
    <DatasetPicker datasets={gen_datasets(20)} selected_dataset_id={12} />
  ));

storiesOf('ColumnEntrySummary', module).add('Few entries', () => (
  <ColumnEntrySummary name={'Bob'} frequency={25} percent={2.5} />
));

storiesOf('EntryCard', module)
  .add('Simple Entry Card', () => (
    <EntryCard entry={{name: 'Some entry', count: 200}} />
  ))
  .add('Simple Entry Card selected', () => (
    <EntryCard
      entry={{name: 'Some selected entry', count: 200}}
      selected={true}
    />
  ));

storiesOf('EntryTable', module).add('Simple Entry Table', () => (
  <div style={{width:"1000px",height:"500px"}}>
      <EntryTable style={{width:'100%', height:'100%'}} entries={generate_entries(50)} />
   </div>
));

storiesOf('MappingMenu', module)
  .add('Simple Mapping Menu', () => (
    <MappingsMenu style={{width: '250px', height: '600px'}} />
  ))
  .add('With entries', () => {
    const {mappings, entries} = generate_mappings(3, 20);
    return (
      <MappingsMenu
        style={{width: '250px', height: '600px'}}
        mappings={mappings}
      />
    );
  })
  .add('With entries selected', () => {
    const {mappings, entries} = generate_mappings(20, 200);
    return (
      <MappingsMenu
        style={{width: '250px', height: '600px'}}
        mappings={mappings}
        selected={mappings[1]}
      />
    );
  });

storiesOf('MappingFocus', module).add('Mapping Focus', () => {
  const {mappings, entries} = generate_mappings(1, 15);
  return (
    <MappingFocus
      mapping={mappings[0]}
      textSuggestions={[
        {name: 'other entry', count: 40},
        {name: 'other other entry', count: 44},
      ]}
      style={{width: '90%', height: '460px'}}
    />
  );
});
storiesOf('SearchBar', module).add('simple search', () => (
  <SearchBar prompt="Search For Entries" />
));

storiesOf('MappingsArea', module).add('Mapping Area', () => {
  const {mappings, entries} = generate_mappings(4, 40);
  return <MappingsArea mappings={mappings} selection={mappings[0]} />;
});


storiesOf('ColumnPage', module).add('ColumnPage', ()=>{
   const {mappings,entries} = generate_mappings(5,50)
   console.log("story entries ", entries )
   return <div style={{width:'100%', height:'1000px'}}> 
       <ColumnPage mappings={mappings} entries={entries} />
   </div>
})

storiesOf('OrderBy', module).add('Order by menu', () => <OrderBySelector />);
storiesOf('DropZone', module).add('File Loader', () => (
  <FileLoader onFiles={f => console.log('We got some files ', f)} />
));
