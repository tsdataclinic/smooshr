import React from 'react'
import ReactModal from 'react-modal'
import FileLoader from './FileLoader'

export default function UploadModal({visible, onClose, onDatasets, onGotDatasets}){

  const addDatasetsToStore = (datasets)=>{
    console.log('datasets', datasets)
  }

  return(
     <ReactModal
         isOpen={visible}
         onRequestClose= {onClose}
     >
         <FileLoader 
            onSubmit={fileDeffs=>{
                console.log('File deffs are ',fileDeffs)
                onClose();
                onGotDatasets(addDatasetsToStore);
         }} 
            onCancel ={onClose}
         />

     </ReactModal>
  )
}
