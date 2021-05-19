import React from 'react';

import DataContext from './DataContext';

export default () => {
  const context = React.useContext(DataContext);

  if (context === undefined) {
    throw new Error('Please wrap the data hook with a data provider');
  }
  return context;
};
