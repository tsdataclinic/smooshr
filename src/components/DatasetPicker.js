import React from 'react'
import { Link } from 'react-router-dom'

const itemStyle = {
   fontWeight: 'light'
}

export default function DatasetPicker(props) {
   const { datasets, selected_dataset_id, onSelect } = props

   return (
      <div className='dataset-picker sidebarlist'>
         <h3>Projects</h3>

         <ul>
            {datasets.map((dataset) =>
               <Link key={dataset.name} to={`/dataset/${dataset.id}`}>
                  <li >
                     {dataset.name}
                  </li>
               </Link>
            )}
         </ul>
         <a style={{ flex: 1 }} href='#'
            onClick={props.onShowUploadModal}
         > Upload Dataset</a>
      </div>
   )
}

DatasetPicker.defaultProps = {
   datasets: [],
   selected_dataset_id: null
}
