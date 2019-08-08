import React, {useState} from 'react'
import ReactDataGrid from "react-data-grid"

export default function TablePreview(props){
   const {data, columns} = props
   const [rows,setRows] = useState(data)

   const sortRows = (initalRows,sortColumn, sortDirection)=> rows =>{
     const comp = (a,b)=>{
       if(sortDirection === "ASC"){
         return a[sortColumn] > b[sortColumn] ? 1 : -1;
       }
       else if (sortDirection === 'DESC'){
         return a[sortColumn] < b[sortColumn] ? 1 : -1;
       }
     };
     return sortDirection === "NONE" ? initalRows  : [...rows].sort(comp)
   }

   if (data.length ==0 ) {return <h1> No data to show</h1>}

   return(
         <ReactDataGrid 
             columns = {columns}
             rowGetter={i =>  rows[i] }
             rowsCount = {100}
             minHeight = {500}
             onGridSort={(sortColumn, sortDirection)=>
               setRows(sortRows(data, sortColumn, sortDirection))
             }/>
   )
}

TablePreview.defaultProps={
   data : [],
   columns: []
}

