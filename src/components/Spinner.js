import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const Spinner = ({ height = '300px', ...otherProps }) => (
  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: height}} {...otherProps}>
    <CircularProgress />
  </div>
)

export default Spinner
