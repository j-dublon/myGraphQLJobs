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
    actualBlack: 'rgba(0, 0, 0, 1)',
    black: 'rgba(20, 20, 20, 1)',
    darkPink70: 'rgba(35, 0, 0, 0.7)',
    darkPink: 'rgba(35, 0, 0, 0.9)',
    darkPink100: 'rgba(35, 0, 0, 1)',
    midPink: 'rgba(152, 0, 94, 1)',
    pink: 'rgba(228, 52, 170, 1)',
    limeGreen: 'rgba(0, 200, 0, 1)',
    white50: 'rgba(255, 255, 255, 0.5)',
    white: 'rgba(255, 255, 255, 1)',
  };

  const fonts = {
    bold: 'SpaceMono-Bold',
    boldItalic: 'SpaceMono-BoldItalic',
    italic: 'SpaceMono-Italic',
    regular: 'SpaceMono-Regular',
  };

  const textStyles = {
    bold12_black: {
      fontFamily: fonts.bold,
      fontSize: fontSize(12),
      color: colors.black,
    },
    bold12_noColor: {
      fontFamily: fonts.bold,
      fontSize: fontSize(12),
    },
    bold16_limeGreen: {
      fontFamily: fonts.bold,
      fontSize: fontSize(16),
      color: colors.limeGreen,
    },
    bold16_white: {
      fontFamily: fonts.bold,
      fontSize: fontSize(16),
      color: colors.white,
    },
    bold20_limeGreen: {
      fontFamily: fonts.bold,
      fontSize: fontSize(20),
      color: colors.limeGreen,
    },
    bold20_pink: {
      fontFamily: fonts.bold,
      fontSize: fontSize(20),
      color: colors.pink,
    },
    bold20_white: {
      fontFamily: fonts.bold,
      fontSize: fontSize(20),
      color: colors.white,
    },
    bold24_white: {
      fontFamily: fonts.bold,
      fontSize: fontSize(24),
      color: colors.white,
    },
    bold30_white: {
      fontFamily: fonts.bold,
      fontSize: fontSize(30),
      color: colors.white,
    },
    regular10_limeGreen: {
      fontFamily: fonts.regular,
      fontSize: fontSize(9.5),
      color: colors.limeGreen,
    },
    regular16_limeGreen: {
      fontFamily: fonts.regular,
      fontSize: fontSize(16),
      color: colors.limeGreen,
    },
    regular16_midPink: {
      fontFamily: fonts.regular,
      fontSize: fontSize(16),
      color: colors.midPink,
    },
    regular16_pink: {
      fontFamily: fonts.regular,
      fontSize: fontSize(16),
      color: colors.pink,
    },
    regular16_white: {
      fontFamily: fonts.regular,
      fontSize: fontSize(16),
      color: colors.white,
    },
  };

  const methods = React.useMemo(
    () => ({
      colors,
      textStyles,
    }),
    [colors, textStyles],
  );

  return (
    <ThemeContext.Provider value={{...methods}}>
      {children}
    </ThemeContext.Provider>
  );
}
