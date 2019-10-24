
export default function python_template(project_file,output_file){
    var template = `
    import pandas as pd 
    import json

    with open('${project_file}', 'r') as f:
        project = json.load(f)
        datasets = project['datasets']

        all_data = pd.DataFrame()

    for dataset in datasets:
        dataset_type = dataset['type']
        if(dataset_type=='file'):
            data = pd.read_csv('example_datasets/{}'.format(dataset['ref']['path']))
        elif(dataset_type['type'] == 'url'):
            data = pd.read_csv(data['ref']['url'])
        elif(dataset_Type['type'] == 'open_data'):
            data = pd.read_csv(data['ref']['url'])
            
        column_renames  = dataset['column_renames']
        data = data.rename(columns=column_renames)

        all_data = all_data.append(data, ignore_index=True)

    for column,mapping in project['mappings'].items():
        map_dict = {}
        for key, values in mapping.items():
            for value in values:
                map_dict[value] = key 
                
        all_data[column] = all_data[column].map(lambda x: map_dict[x] if x in mapping else 'unknown')
     
    all_data.to_csv('${output_file}')
    `
    return template
}
