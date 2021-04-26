/* eslint-disable react-hooks/exhaustive-deps */
/*
 * Jira Ticket:
 * Created Date: Thu, 29th Oct 2020, 11:51:42 am
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import ThemeContext from './ThemeContext';
import {ScaleHook} from 'react-native-design-to-component';

export default function ThemeProvider({children}) {
  const {getHeight, getWidth, fontSize, radius} = ScaleHook();

  const colors = {
    black: 'rgba(20, 20, 20, 1)',
    darkPink: 'rgba(35, 0, 0, 0.9)',
    graphQLPink: 'rgba(228, 52, 170, 1)',
    limeGreen: 'rgba(0, 200, 0)',
    white: 'rgba(255, 255, 255, 1)',
  };

  const fonts = {
    bold: 'SpaceMono-Bold',
    boldItalic: 'SpaceMono-BoldItalic',
    italic: 'SpaceMono-Italic',
    regular: 'SpaceMono-Regular',
  };

  const textStyles = {
    bold30_white: {
      fontFamily: fonts.bold,
      fontSize: fontSize(30),
      color: colors.white,
    },
  };

  const publicMethods = React.useMemo(
    () => ({
      colors,
      textStyles,
    }),
    [colors, textStyles],
  );

  return (
    <ThemeContext.Provider value={{...publicMethods}}>
      {children}
    </ThemeContext.Provider>
  );
}
