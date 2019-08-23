import React from 'react';

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  MarkSeries
} from 'react-vis';

export default function TSNEPlot({data}) {
  return (
    <XYPlot width={300} height={300}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis />
      <YAxis />
      <MarkSeries
        className="mark-series-example"
        strokeWidth={2}
        opacity="0.8"
        data={data.map(d=>({x:d[0],y:d[1]}))}
      />
    </XYPlot>
  );
}
