import React from 'react'
import TablePreview from '../components/TablePreview'
import EmbedingsViz from '../components/EmbedingsViz'
import ColumnInfo from '../components/ColumnInfo'
import {useStateValue} from '../contexts/app_context'

export default function DatasetPage({match}){
    const datasetID  = match.params.datasetID

    const [{datasets,columns}, dispatch] = useStateValue()
    const dataset = datasets.find(d => d.id ==datasetID)

    console.log('columns ', columns)
    const columnsForDataset = columns.filter(c=> c.dataset_id === datasetID)
    return(
         dataset ? 
             <React.Fragment>
                 <div className='datatable full_card'>
                     <TablePreview data={dataset.sample} columns={columnsForDataset} />
                 </div>
            </React.Fragment>
        :
        <h2>Could not find dataset</h2>
    )
}
