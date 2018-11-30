import React from 'react';
import Plot from 'react-plotly.js';
import PropTypes from 'prop-types';

const Plotly = ({ data }) => (
  <Plot
    data={data}
    style={{ width: '100%', height: 400 }}
    layout={{
      width: undefined,
      height: undefined,
      autosize: true,
    }}
    useResizeHandler
  />
);

Plotly.propTypes = {
  data: PropTypes.array.isRequired,
};
export default Plotly;
