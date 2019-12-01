import React, {useState} from 'react';
import ReactDataGrid from 'react-data-grid';

export default function TablePreview(props) {
  const {data} = props;

  const columns = Object.keys(data[0]).map(k => ({key: k, name: k}));
  const [rows, setRows] = useState(data);

  const sortRows = (initalRows, sortColumn, sortDirection) => rows => {
    const comp = (a, b) => {
      if (sortDirection === 'ASC') {
        return a[sortColumn] > b[sortColumn] ? 1 : -1;
      } else if (sortDirection === 'DESC') {
        return a[sortColumn] < b[sortColumn] ? 1 : -1;
      }
    };
    return sortDirection === 'NONE' ? initalRows : [...rows].sort(comp);
  };

  if (data.length == 0) {
    return <h1> No data to show</h1>;
  }

  return (
    <ReactDataGrid
      columns={columns}
      rowGetter={i => rows[i]}
      rowsCount={data.length}
      onGridSort={(sortColumn, sortDirection) =>
        setRows(sortRows(data, sortColumn, sortDirection))
      }
    />
  );
}

TablePreview.defaultProps = {
  data: [],
  columns: [],
};
