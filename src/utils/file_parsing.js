import Papa from 'papaparse';
import {saveAs} from 'file-saver';
import slugify from 'slugify';
import python_template from './python_file';
import JSZip from 'jszip';

const uuidv1 = require('uuid/v1');

// Takes a file handle and returns the summary stats for that file
export function parse_file_for_preview(
  file,
  onProgress = null,
  report_progress_every = 200,
  sample_rows = 10,
) {
  return new Promise((resolve, reject) => {
    let no_rows = 0;
    let set_dict = {};
    let sample = [];

    let ref = file.ref;
    if (file.type !== 'file') {
      ref = `${process.env.REACT_APP_API_URL}/proxy?url=${ref}`;
    }
    console.log('getting ref as ', ref, ' for file ', file);

    Papa.parse(ref, {
      worker: true,
      header: true,
      download: file.type !== 'file',
      step: function(row) {
        if (no_rows < sample_rows) {
          sample.push(row.data);
        }

        if (no_rows == 0) {
          row.meta.fields.forEach(f => {
            set_dict[f] = {};
          });
        }

        no_rows = no_rows + 1;

        if (no_rows % report_progress_every == 0 && onProgress) {
          onProgress(no_rows);
        }

        row.meta.fields.forEach(f => {
          let val = row.data[f];

          if (val == f) {
            return;
          }
          if (val in set_dict[f]) {
            set_dict[f][val] += 1;
          } else {
            set_dict[f][val] = 1;
          }
        });
      },
      error: error => {
        console.log('something bad happened');
      },
      complete: () => {
        let columns = [];
        let entries = [];
        const dataset_id = uuidv1();
        Object.keys(set_dict).forEach(field => {
          let column_id = uuidv1();

          columns.push({
            unique: Object.keys(set_dict[field]).length,
            id: column_id,
            name: field,
            key: field,
            dataset_id: dataset_id,
            type: 'text',
          });

          Object.entries(set_dict[field]).forEach(([field, count]) =>
            entries.push({column_id, name: field, count}),
          );
        });

        resolve({
          dataset: {
            id: dataset_id,
            name: file.type === 'url' ? file.ref : file.ref.name,
            file: file,
            row_count: no_rows,
            sample: sample,
          },
          columns: columns,
          entries: entries,
        });
      },
    });
  });
}

export const applyAndSave = (
  project,
  datasets,
  meta_columns,
  columns,
  mappings,
) => {
  console.log('datasets ', datasets);
  datasets.forEach(d => {
    console.log();
  });
};

export const exportPythonCode = (
  project,
  datasets,
  meta_columns,
  columns,
  mappings,
  settings,
) => {
  var mapping = createJSONMapping(
    project,
    datasets,
    meta_columns,
    columns,
    mappings,
  );
  const recipe_name = slugify(project.name) + '.json';
  const output_data_name = slugify(project.name) + 'csv';

  const recipy = createJSONMapping(
    project,
    datasets,
    meta_columns,
    columns,
    mappings,
    settings,
  );
  const python_code = python_template(recipe_name, output_data_name);

  let zip = new JSZip();
  let folder = zip.folder(project.name)
  zip.folder(`${project.name}/put_your_datasets_in_here`)
  zip.folder(`${project.name}/results`)
  folder.file(recipe_name,JSON.stringify(recipy));
  folder.file('process.py', python_code);
  zip.generateAsync({type: 'blob'}).then(content => {
    saveAs(content, slugify(project.name) + 'zip');
  });
};

export const createJSONMapping = (
  project,
  datasets,
  meta_columns,
  columns,
  mappings,
  settings,
) => {
  let projectJSON = {
    name: project.name,
    description: project.description,
    id: project.id,
  };

  const make_col_mappings = d => {
    const col_renames = {};
    meta_columns.forEach(mc => {
      const resolved_columns = mc.columns
        .map(cID => columns.find(c => c.id === cID))
        .filter(c => c.dataset_id === d.id);
      resolved_columns.forEach(rc => {
        col_renames[rc.name] = mc.name;
      });
    });
    return col_renames;
  };

  let datasetsJSON = datasets.map(d => ({
    type: d.file.type,
    ref: d.file.ref,
    rows: d.rows,
    column_renames: make_col_mappings(d),
  }));

  const mappingsJSON = {};
  meta_columns.forEach(mc => {
    const applicableMappings = mappings.filter(m => m.column_id === mc.id);
    mappingsJSON[mc.name] = {};
    applicableMappings.forEach(mapping => {
      mappingsJSON[mc.name][mapping.name] = mapping.entries;
    });
  });

  const jsonOutput = {
    project: projectJSON,
    datasets: datasetsJSON,
    mappings: mappingsJSON,
    settings: settings ? settings : {},
  };
  return jsonOutput;
};

export const saveMappingsJSON = (
  project,
  datasets,
  meta_columns,
  columns,
  mappings,
) => {
  const output_name = slugify(project.name) + '.json';
  var jsonOutput = createJSONMapping(
    project,
    datasets,
    meta_columns,
    columns,
    mappings,
  );

  var blob = new Blob([JSON.stringify(jsonOutput)], {
    type: 'text/plain;charset=utf-8',
  });

  saveAs(blob, output_name);
};

export const saveMappingsCSV = (columns, mappings, output_name) => {
  const csvMapping = columns.reduce((result, column) => {
    const column_mappings = mappings.filter(m => m.column_id == column.id);
    if (column_mappings.length > 0) {
      column_mappings.forEach(mapping => {
        mapping.entries.forEach(entry => {
          result = result + [column.name, mapping.name, entry].join(',') + '\n';
        });
      });
    }
    return result;
  }, 'column,entry,mapped_entry\n');
  var blob = new Blob([csvMapping], {type: 'text/plain;charset=utf-8'});
  saveAs(blob, `mappings_for_${output_name}.csv`);
};

export const exportData = (project, outfile) => {
  //   project.datasets.first.file
};

export const applyMappingToFile = (columns, mappings, file) => {};
