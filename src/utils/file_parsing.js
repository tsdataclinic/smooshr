import Papa from 'papaparse'
const uuidv1 = require('uuid/v1');

// Takes a file handle and returns the summary stats for that file
export function parse_file_for_preview(file, onProgress=null, report_progress_every= 200, sample_rows= 10 ){
    return new Promise( (resolve,reject)=>{
       let no_rows  = 0;
       let set_dict  = {}
       let sample = [] 
       console.log('file is ',file)
       Papa.parse(file, {
	      worker: true,
          header: true,
	      step: function(row) {

            if(no_rows < sample_rows){
               sample.push(row.data)
            }

            if(no_rows ==0){
               row.meta.fields.forEach(f=>{
                 set_dict[f] = {}
               })
            }

            no_rows = no_rows + 1 

            if(no_rows % report_progress_every ==0 && onProgress){
               onProgress(no_rows)
            }

            row.meta.fields.forEach(f=>{
              let val  = row.data[f]

              if(val ==f) { return } 
              if(val in set_dict[f]){
                set_dict[f][val] += 1
              }
              else{
                set_dict[f][val] = 1
              }
            })
         },
         complete:()=>{
           let columns = []
           let entries = []
           const dataset_id  = uuidv1()
           Object.keys(set_dict).forEach((field)=>{
              let column_id = uuidv1()

              columns.push({
                unique: Object.keys(set_dict[field]).length,
                id: column_id,
                name: field,
                key : field,
                dataset_id: dataset_id
              })

              Object.entries(set_dict[field]).forEach(([field,count])=> entries.push ({ column_id, name:field, count})
                
              )

           })

           resolve({
             dataset:{
                 id : dataset_id, 
                 name: file.name,
                 file: file,
                 row_count: no_rows,
                 sample: sample
            },
            columns: columns,
            entries: entries
           })
         }
       })
    })
}

