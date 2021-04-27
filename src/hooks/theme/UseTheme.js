/*
 * Jira Ticket:
 * Created Date: Thu, 29th Oct 2020, 11:51:47 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';

import ThemeContext from './ThemeContext';

export default function useTheme() {
  const context = React.useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('Please use a `ThemeProvider` in your App.js file');
  }
  return context;
}
