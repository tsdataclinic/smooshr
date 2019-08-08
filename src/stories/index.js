import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import TextEntry from "../components/TextEntry"
import GroupDescription from "../components/GroupDescription"
import EmbedingsViz from "../components/EmbedingsViz"
import TablePreview from "../components/TablePreview"
import ColumnEntrySummary from "../components/ColumnEntrySummary"
import FileLoader from "../components/FileLoader"
import DatasetPicker from "../components/DatasetPicker"
import {gen_sample, gen_selection} from './fixtures/example_points'
import {gen_datasets} from './fixtures/example_datasets'
import {example_datatable} from './fixtures/example_data'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import {Welcome } from '@storybook/react/demo';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);


storiesOf('TextEntry', module)
   .add('basic', ()=> <TextEntry name='NCF'></TextEntry>);

storiesOf('GroupDescription', module)
   .add('With entries', ()=> (
      <GroupDescription name='Violations' 
                        description='Basic validations in the data'
                        unique_entries={200}
                        no_rows={3000} />
    ))
    .add("With no entries", ()=>(
      <GroupDescription name='Violations' 
                        description='Basic validations in the data'
                        unique_entries={0}
                        no_rows={0} />
    ));

storiesOf("EmbedingsViz", module)
   .addDecorator(withKnobs)
   .add('empty', ()=> <EmbedingsViz point_radius={3} />)
   .add('with a few points', ()=> <EmbedingsViz points={gen_sample(200)} point_radius={3} />)
   .add('with a fixed size', ()=> <EmbedingsViz style={{width:'500px',height:'500px'}} points={gen_sample(200)} pointRadius={1} />)
   .add('with a selection', ()=> <EmbedingsViz style={{width:'500px',height:'500px'}} points={gen_sample(200)} pointRadius={1}  selection= {gen_selection(20,200) }/>)
   .add('with a lots of points', ()=> <EmbedingsViz style={{width:'500px',height:'500px'}} points={gen_sample(2000)} pointRadius={1}  selection= {gen_selection(20,2000) }/>)
   .add('with Knobs on', ()=>{

       const no_points= number("No Points", 200, {range:true, max:2000, min:1, step:1 },'g1');
       const pc_selected = number("No Selected", 20, {range:true, max:100, min:0, step:1 },'g1');
       const radius= number("Radius", 2, {range:true, max:20, min:1, step:1 },'g1');

       return (
          <EmbedingsViz style={{width:'500px',height:'500px'}} points={gen_sample(no_points)} pointRadius={radius}  selection= {gen_selection(pc_selected,no_points) }/> 
       )
    })



storiesOf('TablePreview', module)
   .add('with some simple data', ()=>{
        const {data, columns} = example_datatable()
        return <TablePreview data={data} columns={columns} />
   })


storiesOf('DataSetPicker', module)
  .add("Short list", ()=>(
     <DatasetPicker datasets = {gen_datasets(20)} />
  ))
  .add('Selected', ()=>
    <DatasetPicker datasets={gen_datasets(20)} selected_dataset_id={12} />
  )

storiesOf('ColumnEntrySummary',module)
   .add("Few entries", ()=>
     <ColumnEntrySummary name={'Bob'} frequency={25} percent={2.5} /> 
   )


storiesOf('DropZone', module)
   .add("File Loader", ()=>
   <FileLoader onFiles={(f)=>console.log("We got some files ",f)} />
   )
