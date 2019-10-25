
export default function python_template(project_file,output_file){
    var template = `
import pandas as pd 
import json
import sys

with open('${project_file}', 'r') as f:
    project = json.load(f)
    datasets = project['datasets']

    all_data = pd.DataFrame()

for dataset in datasets:
    dataset_type = dataset['type']
    dataset_name = dataset['ref']['path']
    if(dataset_type=='file'):
        file_path = 'put_your_datasets_in_here/{}'.format(dataset_name)
        try:
           print('Raeding {}'.format(dataset_name))
           data = pd.read_csv(file_path)
        except:
           print("Place the file {} in the folder put_your_datasets_in_here".format(file_path))
           sys.exit()
    elif(dataset_type['type'] == 'url'):
        data = pd.read_csv(data['ref']['url'])
    elif(dataset_Type['type'] == 'open_data'):
        data = pd.read_csv(data['ref']['url'])
        
    print("Renaming columns")
    column_renames  = dataset['column_renames']
    data = data.rename(columns=column_renames)

    all_data = all_data.append(data, ignore_index=True)

print('Applying column mappings')
for column,mapping in project['mappings'].items():
    map_dict = {}
    for key, values in mapping.items():
        for value in values:
            map_dict[value] = key 
            
    all_data[column] = all_data[column].map(lambda x: map_dict[x] if x in mapping else 'unknown')

print('Writing out results')
all_data.to_csv('results/${output_file}')
print('Datasets have been smooshed')
    `
    return template
}
